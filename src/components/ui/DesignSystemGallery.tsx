import { ArrowRight, Check, CircleAlert } from "lucide-react";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Checkbox } from "@/components/ui/Checkbox";
import { Container } from "@/components/ui/Container";
import { Input } from "@/components/ui/Input";
import { Link } from "@/components/ui/Link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";

const colorTokens = [
  { name: "page", className: "bg-page" },
  { name: "surface", className: "bg-surface" },
  { name: "elevated", className: "bg-elevated" },
  { name: "surface-hover", className: "bg-surface-hover" },
  { name: "fg", className: "bg-fg" },
  { name: "fg-muted", className: "bg-fg-muted" },
  { name: "fg-faint", className: "bg-fg-faint" },
  { name: "line", className: "bg-line" },
  { name: "line-strong", className: "bg-line-strong" },
  { name: "brand", className: "bg-brand" },
  { name: "brand-solid", className: "bg-brand-solid" },
  { name: "cyan", className: "bg-cyan" },
  { name: "focus", className: "bg-focus" },
  { name: "success", className: "bg-success" },
  { name: "warning", className: "bg-warning" },
  { name: "danger", className: "bg-danger" },
];

const typeSamples = [
  { name: "Display XL", className: "text-display-xl", colorClassName: "text-fg" },
  { name: "Display L", className: "text-display-l", colorClassName: "text-fg" },
  { name: "Heading 2", className: "text-h2", colorClassName: "text-fg" },
  { name: "Heading 3", className: "text-h3", colorClassName: "text-fg" },
  { name: "Lead", className: "text-lead", colorClassName: "text-fg-muted" },
  { name: "Body", className: "text-base leading-relaxed", colorClassName: "text-fg" },
  { name: "Small", className: "text-small", colorClassName: "text-fg" },
  { name: "Mono label", className: "font-mono text-label uppercase", colorClassName: "text-fg" },
];

export function DesignSystemGallery() {
  return (
    <main id="main">
      <Container className="space-y-20 py-16 md:py-24">
        <header className="max-w-reading space-y-5">
          <p className="font-mono text-label text-fg-faint uppercase">Internal preview</p>
          <h1 className="text-display-l text-fg">Design system</h1>
          <p className="text-lead text-fg-muted">
            Tokens and interface primitives used across the NEXORA AI website.
          </p>
        </header>

        <section aria-label="Color tokens" className="space-y-8">
          <SectionHeader title="Color tokens" eyebrow="01 / Color" />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {colorTokens.map((token) => (
              <Card key={token.name} className="flex items-center gap-3 p-3">
                <span
                  aria-hidden="true"
                  className={`size-8 shrink-0 rounded-sm border border-line-strong ${token.className}`}
                />
                <code className="font-mono text-label text-fg-muted">{token.name}</code>
              </Card>
            ))}
          </div>
        </section>

        <section aria-label="Type scale" className="space-y-8">
          <SectionHeader title="Type scale" eyebrow="02 / Typography" />
          <div className="space-y-5">
            {typeSamples.map((sample) => (
              <div
                key={sample.name}
                className="grid gap-2 border-b border-line pb-4 md:grid-cols-4"
              >
                <p className="font-mono text-label text-fg-faint uppercase">{sample.name}</p>
                <p
                  className={`${sample.className} ${sample.colorClassName ?? "text-fg"} md:col-span-3`}
                >
                  Intelligence in practice
                </p>
              </div>
            ))}
          </div>
        </section>

        <section aria-label="Radii and motion tokens" className="space-y-8">
          <SectionHeader title="Radii and motion" eyebrow="03 / Shape and motion" />
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { name: "Small · 8px", className: "rounded-sm" },
              { name: "Medium · 12px", className: "rounded-md" },
              { name: "Large · 20px", className: "rounded-lg" },
            ].map((radius) => (
              <Card key={radius.name} className="space-y-3">
                <div className={`h-16 border border-line-strong bg-elevated ${radius.className}`} />
                <p className="font-mono text-label text-fg-muted">{radius.name}</p>
              </Card>
            ))}
          </div>
          <Card className="grid gap-4 sm:grid-cols-2">
            <p className="font-mono text-small text-fg-muted">Fast · 120ms · ease-out-expo</p>
            <p className="font-mono text-small text-fg-muted">Base · 200ms · ease-smooth</p>
            <p className="font-mono text-small text-fg-muted">Slow · 320ms</p>
            <p className="font-mono text-small text-fg-muted">Scene · 600ms</p>
          </Card>
        </section>

        <section aria-label="Buttons" className="space-y-8">
          <SectionHeader title="Buttons" eyebrow="04 / Actions" />
          <Card className="space-y-5">
            <div className="flex flex-wrap items-center gap-3">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link style</Button>
              <Button size="lg" trailingIcon={<ArrowRight aria-hidden="true" className="size-4" />}>
                Large with icon
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button disabled>Disabled</Button>
              <Button loading>Loading</Button>
              <Button leadingIcon={<Check aria-hidden="true" className="size-4" />}>
                Leading icon
              </Button>
            </div>
            <p className="text-small text-fg-muted">
              Use pointer and keyboard focus to inspect hover, active, and focus-visible states.
            </p>
          </Card>
        </section>

        <section aria-label="Links, cards and badges" className="space-y-8">
          <SectionHeader title="Links, cards and badges" eyebrow="05 / Surfaces" />
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="space-y-5">
              <h3 className="text-h3 text-fg">Links</h3>
              <div className="flex flex-wrap items-center gap-5">
                <Link href="/platform">Inline link</Link>
                <Link href="/platform" variant="nav" active>
                  Active navigation
                </Link>
                <Link href="/platform" variant="nav">
                  Navigation link
                </Link>
              </div>
            </Card>
            <Card hoverable className="space-y-5">
              <h3 className="text-h3 text-fg">Hoverable card</h3>
              <p className="text-small text-fg-muted">
                Move the pointer over this surface to inspect its border and background state.
              </p>
              <div className="flex flex-wrap gap-3">
                <Badge>Default</Badge>
                <Badge variant="concept">Concept</Badge>
                <Badge variant="inDesign">In design</Badge>
              </div>
            </Card>
          </div>
        </section>

        <section aria-label="Form controls" className="space-y-8">
          <SectionHeader title="Form controls" eyebrow="06 / Forms" />
          <div className="grid gap-4 lg:grid-cols-2">
            <Card className="space-y-5">
              <h3 className="text-h3 text-fg">Default and helper states</h3>
              <Input label="Name" placeholder="Enter a name" helperText="Visible helper text" />
              <Select label="Workflow" defaultValue="invoice" helperText="Select a workflow type.">
                <option value="invoice">Invoice review</option>
                <option value="approval">Approval routing</option>
              </Select>
              <Textarea label="Notes" placeholder="Add context" helperText="Optional details" />
              <Checkbox label="Send me product updates" helperText="You can change this later." />
              <Checkbox label="Enabled selection" defaultChecked />
            </Card>
            <Card className="space-y-5">
              <h3 className="text-h3 text-fg">Error and disabled states</h3>
              <Input
                label="Email"
                error="Enter a valid email address."
                defaultValue="not-an-email"
              />
              <Select label="Category" error="Choose a category." defaultValue="">
                <option value="">Select one</option>
                <option value="operations">Operations</option>
              </Select>
              <Textarea label="Message" error="Add a short message." />
              <Checkbox label="Consent" error="Consent is required." />
              <Checkbox label="Disabled selection" disabled />
              <Input label="Read-only example" disabled value="Disabled field" readOnly />
              <Select label="Disabled select" disabled defaultValue="unavailable">
                <option value="unavailable">Unavailable</option>
              </Select>
              <Textarea label="Disabled notes" disabled value="Unavailable" readOnly />
              <Button disabled>
                <CircleAlert aria-hidden="true" className="size-4" />
                Disabled action
              </Button>
            </Card>
          </div>
        </section>

        <section aria-label="Layout primitives" className="space-y-8">
          <SectionHeader title="Layout primitives" eyebrow="07 / Layout" />
          <Card className="space-y-5">
            <SectionHeader
              eyebrow="Section header"
              title="A clear section introduction"
              lead="The reusable header pairs a small label with a direct headline and supporting copy."
            />
            <div className="space-y-3 border-t border-line pt-5">
              <p className="font-mono text-label text-fg-faint uppercase">Container sizes</p>
              <Container
                size="content"
                className="rounded-sm border border-line-strong bg-elevated py-3"
              >
                Content width · 1280px
              </Container>
              <Container
                size="reading"
                className="rounded-sm border border-line-strong bg-elevated py-3"
              >
                Reading width · 1080px
              </Container>
              <Container
                size="article"
                className="rounded-sm border border-line-strong bg-elevated py-3"
              >
                Article width · 720px
              </Container>
            </div>
          </Card>
        </section>
      </Container>
    </main>
  );
}
