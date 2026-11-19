import { z } from "zod";

/**
 * Server-only environment access. Never import this from a Client Component.
 *
 * Nothing is parsed at module scope on purpose: `next build` runs in CI without
 * secrets, so a top-level `parse(process.env)` would break the build. Parse at
 * request time only.
 */

/** Treats an empty string the way `.env.example` leaves it: absent, not invalid. */
const optionalString = z.preprocess(
  (value) => (typeof value === "string" && value.trim() === "" ? undefined : value),
  z.string().min(1).optional(),
);

const optionalEmail = z.preprocess(
  (value) => (typeof value === "string" && value.trim() === "" ? undefined : value),
  z.email().optional(),
);

const serverEnvSchema = z.object({
  CONTACT_PROVIDER: z.enum(["none", "resend"]).default("none"),
  RESEND_API_KEY: optionalString,
  CONTACT_TO_EMAIL: optionalEmail,
  CONTACT_FROM_EMAIL: optionalEmail,
});

export type ServerEnv = z.infer<typeof serverEnvSchema>;

/** The internal design gallery is available on local and Vercel preview builds only. */
export function isProductionVercel(): boolean {
  return process.env.VERCEL_ENV === "production";
}

/**
 * Validated environment. Throws on malformed values — that is a deployment bug
 * and should be loud. A missing provider is *not* malformed; see
 * `getContactDelivery`.
 */
export function getServerEnv(): ServerEnv {
  return serverEnvSchema.parse(process.env);
}

export type ContactDelivery =
  | {
      configured: true;
      provider: "resend";
      apiKey: string;
      to: string;
      from: string;
    }
  | {
      configured: false;
      provider: "none" | "resend";
      /** Safe to log: never contains a secret value. */
      reason: string;
    };

/**
 * Resolves how (or whether) a form submission can be delivered. Never throws,
 * so the route handlers can map the unconfigured case to a 503 instead of a 500.
 */
export function getContactDelivery(): ContactDelivery {
  const parsed = serverEnvSchema.safeParse(process.env);

  if (!parsed.success) {
    return {
      configured: false,
      provider: "none",
      reason: "Invalid server environment (see .env.example)",
    };
  }

  const { CONTACT_PROVIDER, RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = parsed.data;

  if (CONTACT_PROVIDER === "none") {
    return { configured: false, provider: "none", reason: "No delivery provider is configured" };
  }

  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
    const missing = [
      !RESEND_API_KEY ? "RESEND_API_KEY" : null,
      !CONTACT_TO_EMAIL ? "CONTACT_TO_EMAIL" : null,
      !CONTACT_FROM_EMAIL ? "CONTACT_FROM_EMAIL" : null,
    ].filter((name): name is string => name !== null);

    return { configured: false, provider: "resend", reason: `Missing ${missing.join(", ")}` };
  }

  return {
    configured: true,
    provider: "resend",
    apiKey: RESEND_API_KEY,
    to: CONTACT_TO_EMAIL,
    from: CONTACT_FROM_EMAIL,
  };
}
