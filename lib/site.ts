export interface NavItem {
  label: string;
  href: string;
}

export const NAV_LINKS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Collection", href: "/collection" },
  { label: "Antique AI", href: "/antique-ai" },
  { label: "Contact", href: "/contact" },
];

export interface SocialLink {
  label: string;
  href: string;
  icon: string;
}

export const SOCIAL_LINKS: SocialLink[] = [
  { label: "Facebook", href: "https://facebook.com", icon: "fab fa-facebook-f" },
  { label: "Instagram", href: "https://instagram.com", icon: "fab fa-instagram" },
  { label: "Pinterest", href: "https://pinterest.com", icon: "fab fa-pinterest-p" },
  { label: "YouTube", href: "https://youtube.com", icon: "fab fa-youtube" },
];

export const SITE = {
  name: "Master Antique",
  tagline: "Curators of Fine Antiques Since 1892",
  address: "42 Heritage Lane, Karachi",
  phone: "+92 300 123 4567",
  phoneAlt: "+92 21 3456 7890",
  email: "hello@masterantique.com",
  emailAlt: "appraisals@masterantique.com",
  adminHref: "/admin/login",
};
