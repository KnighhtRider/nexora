import type { Metadata } from "next";

import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `In preparation — ${siteConfig.name}`,
  robots: { index: false },
};

export default function PlaceholderPage() {
  return (
    <main id="main" className="flex min-h-[60vh] items-center py-16">
      <Container size="reading" className="space-y-6">
        <SectionHeader
          eyebrow="In preparation"
          title="This page is being prepared"
          lead="NEXORA AI is in active development. The full content for this section will be published ahead of launch."
        />
      </Container>
    </main>
  );
}
