import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { getContactDelivery, getServerEnv, type ContactDelivery } from "./env";

/** Narrows to the unconfigured branch so the reason string can be asserted. */
function unconfiguredReason(delivery: ContactDelivery): string {
  if (delivery.configured) {
    throw new Error("expected an unconfigured delivery result");
  }
  return delivery.reason;
}

const KEYS = [
  "CONTACT_PROVIDER",
  "RESEND_API_KEY",
  "CONTACT_TO_EMAIL",
  "CONTACT_FROM_EMAIL",
] as const;

type Key = (typeof KEYS)[number];

const saved = new Map<Key, string | undefined>();

beforeEach(() => {
  for (const key of KEYS) {
    saved.set(key, process.env[key]);
    delete process.env[key];
  }
});

afterEach(() => {
  for (const key of KEYS) {
    const value = saved.get(key);
    if (value === undefined) {
      delete process.env[key];
    } else {
      process.env[key] = value;
    }
  }
});

describe("getServerEnv", () => {
  it("falls back to provider none when nothing is set", () => {
    expect(getServerEnv().CONTACT_PROVIDER).toBe("none");
  });

  it("treats the empty strings left in .env.example as absent", () => {
    process.env.RESEND_API_KEY = "";
    process.env.CONTACT_TO_EMAIL = "  ";

    const env = getServerEnv();
    expect(env.RESEND_API_KEY).toBeUndefined();
    expect(env.CONTACT_TO_EMAIL).toBeUndefined();
  });

  it("throws on a malformed email rather than silently accepting it", () => {
    process.env.CONTACT_TO_EMAIL = "not-an-email";
    expect(() => getServerEnv()).toThrow();
  });

  it("throws on an unknown provider value", () => {
    process.env.CONTACT_PROVIDER = "sendgrid";
    expect(() => getServerEnv()).toThrow();
  });
});

describe("getContactDelivery", () => {
  it("reports unconfigured by default and never throws", () => {
    expect(getContactDelivery()).toEqual({
      configured: false,
      provider: "none",
      reason: "No delivery provider is configured",
    });
  });

  it("returns a usable config when every resend value is present", () => {
    process.env.CONTACT_PROVIDER = "resend";
    process.env.RESEND_API_KEY = "re_test_key";
    process.env.CONTACT_TO_EMAIL = "inbox@example.com";
    process.env.CONTACT_FROM_EMAIL = "site@example.com";

    expect(getContactDelivery()).toEqual({
      configured: true,
      provider: "resend",
      apiKey: "re_test_key",
      to: "inbox@example.com",
      from: "site@example.com",
    });
  });

  it("names the missing keys so the 503 message can be honest", () => {
    process.env.CONTACT_PROVIDER = "resend";

    const result = getContactDelivery();
    expect(result.configured).toBe(false);
    expect(unconfiguredReason(result)).toBe(
      "Missing RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL",
    );
  });

  it("does not leak secret values in the reason", () => {
    process.env.CONTACT_PROVIDER = "resend";
    process.env.RESEND_API_KEY = "re_super_secret";

    expect(unconfiguredReason(getContactDelivery())).not.toContain("re_super_secret");
  });

  it("maps a malformed environment to an unconfigured result instead of a 500", () => {
    process.env.CONTACT_PROVIDER = "resend";
    process.env.CONTACT_TO_EMAIL = "nope";

    const result = getContactDelivery();
    expect(result.configured).toBe(false);
    expect(unconfiguredReason(result)).toContain("Invalid server environment");
  });
});
