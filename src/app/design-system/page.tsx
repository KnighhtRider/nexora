import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { DesignSystemGallery } from "@/components/ui/DesignSystemGallery";
import { isProductionVercel } from "@/lib/env";

export const metadata: Metadata = {
  title: "Design System",
  robots: { index: false, follow: false },
};

export default function DesignSystemPage() {
  if (isProductionVercel()) notFound();

  return <DesignSystemGallery />;
}
