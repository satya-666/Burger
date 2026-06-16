export const COLORS = {
  beige: "#E8DCCB",
  red: "#FF2B1D",
  yellow: "#FFD93D",
  charcoal: "#1A1410",
} as const;

export const BURGERS = [
  {
    id: "classic",
    name: "The Classic Flame",
    description: "Angus beef, aged cheddar, caramelized onions, secret sauce",
    price: "$14",
    tag: "Best Seller",
    image:
      "https://images.unsplash.com/photo-1568901347635-c89a5c4a0a42?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "truffle",
    name: "Truffle Royale",
    description: "Wagyu patty, truffle aioli, arugula, gruyère",
    price: "$22",
    tag: "Chef's Pick",
    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "smoke",
    name: "Smoked Stack",
    description: "Double patty, smoked gouda, bourbon glaze, crispy bacon",
    price: "$18",
    tag: "Limited",
    image:
      "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "garden",
    name: "Garden Fire",
    description: "Plant-based patty, roasted peppers, herb mayo, brioche",
    price: "$16",
    tag: "Vegan",
    image:
      "https://images.unsplash.com/photo-1520072959219-a044e8c04785?w=800&q=80&auto=format&fit=crop",
  },
] as const;

export const NAV_LINKS = [
  { label: "Menu", href: "#showcase" },
  { label: "Story", href: "#story" },
  { label: "Burgers", href: "#featured" },
  { label: "Experience", href: "#experience" },
] as const;

export const MARQUEE_ITEMS = [
  "FLAME GRILLED",
  "PREMIUM INGREDIENTS",
  "HANDCRAFTED",
  "SINCE 2019",
  "AWARD WINNING",
  "FRESH DAILY",
] as const;
