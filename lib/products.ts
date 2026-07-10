import type { Product } from "./types";

/**
 * Default curated collection. Seeded into localStorage on first visit and used
 * as the source of truth for the knowledge base when no stored data exists.
 * Mirrors the original `defaults` array used across product.html and rag.js.
 */
export const DEFAULT_PRODUCTS: Product[] = [
  {
    name: "Velvet Armchair",
    era: "mid-century",
    label: "Mid-Century Modern, Circa 1954",
    origin: "Attributed to Finn Juhl — Copenhagen, Denmark",
    description:
      "Mid-Century Modern armchair attributed to Finn Juhl. Olive velvet upholstery with teak armrests.",
    provenance: "Copenhagen, Denmark",
    price: 2800,
    badge: "One of One",
    image:
      "https://images.pexels.com/photos/18448275/pexels-photo-18448275.jpeg?auto=compress&cs=tinysrgb&w=600",
    status: "available",
  },
  {
    name: "Porcelain & Gold Vase",
    era: "victorian",
    label: "Victorian Era, Circa 1885",
    origin: "Royal Worcester — Worcester, England",
    description:
      "Hand-painted porcelain vase with intricate 24k gold leaf detailing. Royal Worcester manufacture.",
    provenance: "Worcester, England",
    price: 1950,
    badge: "Rare",
    image:
      "https://images.pexels.com/photos/18424382/pexels-photo-18424382.jpeg?auto=compress&cs=tinysrgb&w=600",
    status: "available",
  },
  {
    name: "Stained Glass Lamp",
    era: "art-deco",
    label: "Art Deco, Circa 1927",
    origin: "Attributed to Edgar Brandt — Paris, France",
    description:
      "Art Deco figural table lamp with handcrafted stained glass shade. Attributed to Edgar Brandt.",
    provenance: "Paris, France",
    price: 3200,
    badge: "One of One",
    image:
      "https://images.pexels.com/photos/18160202/pexels-photo-18160202.jpeg?auto=compress&cs=tinysrgb&w=600",
    status: "available",
  },
  {
    name: "Brass Carriage Clock",
    era: "georgian",
    label: "Georgian, Circa 1795",
    origin: "John Grant & Son — London, England",
    description:
      "Fine brass carriage clock with 8-day French movement. White porcelain dial with Roman numerals.",
    provenance: "John Grant & Son, London",
    price: 4500,
    badge: "Recently Acquired",
    image:
      "https://images.pexels.com/photos/18602910/pexels-photo-18602910.jpeg?auto=compress&cs=tinysrgb&w=600",
    status: "available",
  },
  {
    name: "Mahogany Writing Desk",
    era: "georgian",
    label: "Georgian, Circa 1780",
    origin: "Thomas Chippendale school — London, England",
    description:
      "Georgian mahogany pedestal writing desk with leather insert top and brass handles.",
    provenance: "Thomas Chippendale school, London",
    price: 5600,
    badge: "One of One",
    image:
      "https://images.pexels.com/photos/5490303/pexels-photo-5490303.jpeg?auto=compress&cs=tinysrgb&w=600",
    status: "available",
  },
  {
    name: "Studio Pottery Bowl",
    era: "mid-century",
    label: "Mid-Century, Circa 1958",
    origin: "Lucie Rie studio — London, England",
    description: "Mid-century studio pottery bowl with organic glazes. Lucie Rie studio.",
    provenance: "London, England",
    price: 1200,
    badge: "Rare",
    image:
      "https://images.pexels.com/photos/15211802/pexels-photo-15211802.jpeg?auto=compress&cs=tinysrgb&w=600",
    status: "available",
  },
  {
    name: "Crystal & Bronze Chandelier",
    era: "art-deco",
    label: "Art Deco, Circa 1930",
    origin: "Atelier of Jacques-Émile Ruhlmann — Paris, France",
    description: "Art Deco crystal and bronze chandelier with six lights. Atelier Ruhlmann.",
    provenance: "Paris, France",
    price: 12500,
    badge: "Recently Acquired",
    image:
      "https://images.pexels.com/photos/11418721/pexels-photo-11418721.jpeg?auto=compress&cs=tinysrgb&w=600",
    status: "available",
  },
  {
    name: "Silver Tea Service",
    era: "victorian",
    label: "Victorian Era, Circa 1875",
    origin: "Garrard & Co. — London, England",
    description: "Victorian silver tea service with ornate repoussé detailing. Garrard & Co.",
    provenance: "London, England",
    price: 8900,
    badge: "One of One",
    image:
      "https://images.pexels.com/photos/7303847/pexels-photo-7303847.jpeg?auto=compress&cs=tinysrgb&w=600",
    status: "available",
  },
];
