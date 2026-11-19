export const siteConfig = {
  name: "NEXORA AI",
  tagline: "The Intelligence Behind Business.",
  description:
    "NEXORA AI is designed to connect business systems, intelligent agents and automated workflows.",
} as const;

export const navItems = [
  { label: "Platform", href: "/platform" },
  { label: "Solutions", href: "/solutions" },
  { label: "Industries", href: "/industries" },
  { label: "Technology", href: "/technology" },
  { label: "Resources", href: "/resources" },
  { label: "About", href: "/about" },
] as const;

const productFooterItems = navItems.filter((item) => item.href !== "/about");

export const footerGroups = [
  {
    title: "Product",
    links: productFooterItems,
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Cookies", href: "/cookies" },
    ],
  },
] as const;

export const siteMetadata = {
  title: siteConfig.name,
  titleSuffix: siteConfig.tagline,
  description: siteConfig.description,
  // Concrete CSS color for the theme-color meta tag; mirrors --color-page in globals.css.
  themeColor: "rgb(8 11 18)",
} as const;
