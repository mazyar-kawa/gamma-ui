export type ShowcaseWebsiteType =
  | "studio"
  | "agency"
  | "personal"
  | "portfolio"
  | "product"
  | "documentation"

export const SHOWCASE_TYPE_LABELS: Record<ShowcaseWebsiteType, string> = {
  studio: "Studio",
  agency: "Agency",
  personal: "Personal",
  portfolio: "Portfolio",
  product: "Product",
  documentation: "Documentation",
}

export interface ShowcaseProject {
  id: string
  name: string
  type: ShowcaseWebsiteType
  href: string
  image: string
  imageAlt: string
}

export const SHOWCASE_MARQUEE = [
  "Design",
  "Development",
  "Strategy",
  "Branding",
  "Product",
  "Launch",
  "Motion",
  "Components",
] as const

export const SHOWCASE_PROJECTS: ShowcaseProject[] = [
  {
    id: "biroke",
    name: "Biroke",
    type: "studio",
    href: "https://www.biroke.tech/",
    image: "/showcase/biroke.png",
    imageAlt: "Biroke digital product studio website",
  },
  {
    id: "gamma-ui",
    name: "Gamma UI",
    type: "documentation",
    href: "https://gammaui.com",
    image: "/showcase/gamma-ui.png",
    imageAlt: "Gamma UI component library website",
  },
  {
    id: "mazyar",
    name: "Mazyar",
    type: "personal",
    href: "https://mazyar.com",
    image: "/showcase/mazyar.png",
    imageAlt: "Mazyar's personal website",
  },
]
