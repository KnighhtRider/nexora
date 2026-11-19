import { Container } from "@/components/ui/Container";
import { Link } from "@/components/ui/Link";
import { footerGroups, siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <Container className="grid gap-12 py-12 md:grid-cols-3 md:gap-10 md:py-16">
        <div className="space-y-3">
          <Link href="/" variant="nav" className="font-semibold text-fg">
            {siteConfig.name}
          </Link>
          <p className="text-small text-fg-muted">{siteConfig.tagline}</p>
        </div>
        <nav aria-label="Footer" className="md:col-span-2">
          <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3">
            {footerGroups.map((group) => (
              <section key={group.title} aria-labelledby={`footer-${group.title.toLowerCase()}`}>
                <h2
                  id={`footer-${group.title.toLowerCase()}`}
                  className="mb-3 font-mono text-label text-fg-faint uppercase"
                >
                  {group.title}
                </h2>
                <ul className="space-y-1">
                  {group.links.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} variant="nav" className="flex min-h-11 items-center">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </nav>
      </Container>
    </footer>
  );
}
