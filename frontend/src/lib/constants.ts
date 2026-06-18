export const COLORS = {
  beige: "#E8DCCB",
  red: "#FF2B1D",
  yellow: "#FFD93D",
  charcoal: "#1A1410",
} as const;

export const BURGERS = [
  {
    id: "classic",
    name: "Juicy Cheesy Fully Loaded",
    description: "Smashed chicken, melty cheddar, shredded lettuce, house pickles",
    price: "₹249",
    tag: "Top Classic",
    image: "/assets/crav-burger.png",
  },
  {
    id: "truffle",
    name: "NCR Hot Crunch",
    description: "Pepper jack, fried onions, red chili mayo, toasted potato bun",
    price: "₹399",
    tag: "Take Away",
    image: "/assets/crav-bite.png",
  },
  {
    id: "smoke",
    name: "Double Sauce Drip",
    description: "Two patties, smoked gouda, comeback sauce, crisp bacon",
    price: "₹329",
    tag: "Saucy",
    image: "/assets/crav-counter.png",
  },
  {
    id: "garden",
    name: "Garden Smash",
    description: "Crispy plant patty, herb mayo, roasted peppers, toasted bun",
    price: "₹299",
    tag: "Fresh",
    image: "/assets/crav-burger.png",
  },
] as const;

export const NAV_LINKS = [
  { label: "Home", href: "#" },
  { label: "Burgers", href: "#featured" },
  { label: "Spices", href: "#showcase" },
  { label: "Contact", href: "#cta" },
] as const;

export const MARQUEE_ITEMS = [
  "SMASHED PATTIES",
  "TOASTED BUNS",
  "DRIPPY SAUCE",
  "EST. 2010",
  "ORDER HOT",
  "FULLY LOADED",
] as const;
