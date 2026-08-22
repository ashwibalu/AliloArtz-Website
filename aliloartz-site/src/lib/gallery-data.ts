export type Board = {
  slug: string;
  title: string;
  description: string;
  mood: string;
  coverImage: string;
};

export type Artwork = {
  slug: string;
  boardSlug: string;
  title: string;
  price: number;
  medium: string;
  size: string;
  availability: "Original" | "Prints" | "Limited";
  story: string;
  location?: string;
  date?: string;
  image: string;
  aspect: "portrait" | "landscape";
};

export const boards: Board[] = [
  {
    slug: "travel-pages",
    title: "Travel Pages",
    description:
      "On-site sketchbook pages from temples, streets, and transit.",
    mood: "Observational · location-drawn",
    coverImage: "/art/IMG_6857.jpg",
  },
  {
    slug: "ink-stories",
    title: "Ink Stories",
    description:
      "Surreal figures and framed narratives built from line and wash.",
    mood: "Whimsical · high contrast",
    coverImage: "/art/IMG_6897.jpg",
  },
  {
    slug: "faces",
    title: "Faces",
    description: "Intimate graphite portraits and quiet human moments.",
    mood: "Personal · soft graphite",
    coverImage: "/art/IMG_7467.jpg",
  },
  {
    slug: "sacred-forms",
    title: "Sacred Forms",
    description: "Statues, guardians, and spiritual architecture in ink.",
    mood: "Atmospheric · reverent",
    coverImage: "/art/IMG_7968.jpg",
  },
];

export const artworks: Artwork[] = [
  {
    slug: "senso-ji-pagoda",
    boardSlug: "travel-pages",
    title: "Senso-ji Pagoda",
    price: 180,
    medium: "Ink + marker on sketchbook",
    size: "A5 page",
    availability: "Prints",
    story:
      "A vertical study of the five-story pagoda — quick line, warm wash on the roofs, and room to breathe on the page.",
    location: "Senso-ji, Taito City",
    date: "9 July 2024",
    image: "/art/IMG_6845.jpg",
    aspect: "portrait",
  },
  {
    slug: "senso-ji-on-site",
    boardSlug: "travel-pages",
    title: "Senso-ji, Drawn on Site",
    price: 220,
    medium: "Ink + marker, photographed in place",
    size: "A5 page",
    availability: "Prints",
    story:
      "The sketch held up against the real pagoda — a travel-page moment where the drawing and the city meet.",
    location: "Senso-ji, Taito City",
    date: "8 July",
    image: "/art/IMG_6857.jpg",
    aspect: "portrait",
  },
  {
    slug: "senso-ji-gray-wash",
    boardSlug: "travel-pages",
    title: "Senso-ji, Gray Wash",
    price: 180,
    medium: "Ink + gray wash",
    size: "A5 page",
    availability: "Prints",
    story:
      "A quieter take on the same tower — soft washes under each roof and a spare handwritten caption.",
    location: "Senso-ji, Taito City",
    date: "5 July",
    image: "/art/IMG_6898.jpg",
    aspect: "portrait",
  },
  {
    slug: "ruins-of-st-pauls",
    boardSlug: "travel-pages",
    title: "Ruins of St. Paul's",
    price: 240,
    medium: "Sepia marker on sketchbook",
    size: "A5 page",
    availability: "Original",
    story:
      "Macau’s stone façade in warm monochrome — columns, niches, and tiny figures for scale at the base.",
    location: "Macau",
    date: "19 June 2024",
    image: "/art/IMG_6894.jpg",
    aspect: "portrait",
  },
  {
    slug: "st-pauls-ink",
    boardSlug: "travel-pages",
    title: "St. Paul's in Black Ink",
    price: 210,
    medium: "Black ink on sketchbook",
    size: "A5 page",
    availability: "Prints",
    story:
      "The same façade pushed harder in black — bold structure, hatching for depth, people for scale.",
    location: "Macau",
    date: "19 June",
    image: "/art/IMG_6895.jpg",
    aspect: "portrait",
  },
  {
    slug: "commute-car",
    boardSlug: "travel-pages",
    title: "Commute Car",
    price: 140,
    medium: "Ink on sketchbook",
    size: "A5 page",
    availability: "Prints",
    story:
      "Drawn from a seat on the train — poles, straps, and passengers dissolving down the aisle.",
    date: "25 July 2024",
    image: "/art/IMG_7472.jpg",
    aspect: "portrait",
  },
  {
    slug: "aisle-view",
    boardSlug: "travel-pages",
    title: "Aisle View",
    price: 140,
    medium: "Ink on sketchbook",
    size: "A5 page",
    availability: "Prints",
    story:
      "Another pass at transit life — denser figures, phones, and the long vanishing line of the car.",
    date: "25 July",
    image: "/art/IMG_7473.jpg",
    aspect: "portrait",
  },
  {
    slug: "ringbearer",
    boardSlug: "ink-stories",
    title: "Ringbearer",
    price: 260,
    medium: "Ink + terracotta wash",
    size: "Framed sketch page",
    availability: "Original",
    story:
      "A lanky figure in a pinstripe suit lifts an ornate ring overhead — surreal, framed, and slightly gothic.",
    image: "/art/IMG_6875.jpg",
    aspect: "portrait",
  },
  {
    slug: "ringbearer-sky",
    boardSlug: "ink-stories",
    title: "Ringbearer Against Sky",
    price: 200,
    medium: "Ink + marker",
    size: "A5 page",
    availability: "Prints",
    story:
      "The same character held up to open sky — line, rust wash, and a thin hand-drawn border.",
    image: "/art/IMG_6888.jpg",
    aspect: "portrait",
  },
  {
    slug: "ringbearer-city",
    boardSlug: "ink-stories",
    title: "Ringbearer, City Fence",
    price: 200,
    medium: "Ink + marker",
    size: "A5 page",
    availability: "Prints",
    story:
      "Sketchbook page against chain-link and skyline — character study with urban air behind it.",
    image: "/art/IMG_6892.jpg",
    aspect: "portrait",
  },
  {
    slug: "ringbearer-ink",
    boardSlug: "ink-stories",
    title: "Ringbearer in Pure Ink",
    price: 250,
    medium: "Black ink on paper",
    size: "Framed sketch page",
    availability: "Limited",
    story:
      "No wash this time — only hatching, border, and the tall figure lifting the ring.",
    image: "/art/IMG_6897.jpg",
    aspect: "portrait",
  },
  {
    slug: "smoke-and-rest",
    boardSlug: "faces",
    title: "Smoke and Rest",
    price: 190,
    medium: "Graphite on paper",
    size: "Storyboard frame",
    availability: "Prints",
    story:
      "A cinematic close-up — one figure smoking, another resting against them inside a drawn frame.",
    date: "3 July",
    image: "/art/IMG_6896.jpg",
    aspect: "landscape",
  },
  {
    slug: "happy-birthday-amma",
    boardSlug: "faces",
    title: "Happy Birthday Amma",
    price: 320,
    medium: "Graphite portrait",
    size: "Landscape sheet",
    availability: "Original",
    story:
      "A family portrait drawn with care — soft shading, warm expressions, and a handwritten birthday note.",
    image: "/art/IMG_7467.jpg",
    aspect: "landscape",
  },
  {
    slug: "monk-on-rock",
    boardSlug: "sacred-forms",
    title: "Monk on Rock",
    price: 230,
    medium: "Ink on paper",
    size: "A5 page",
    availability: "Prints",
    story:
      "A statue of a monk on a rugged pedestal — deep shadows, staff, and kanji carved into the stone.",
    image: "/art/IMG_7451.jpg",
    aspect: "portrait",
  },
  {
    slug: "monk-at-night",
    boardSlug: "sacred-forms",
    title: "Monk at Night",
    price: 210,
    medium: "Ink on sketchbook",
    size: "A5 page",
    availability: "Prints",
    story:
      "The same sacred figure photographed in low light — sketchbook glow against a dark field.",
    image: "/art/IMG_7626.jpg",
    aspect: "portrait",
  },
  {
    slug: "guardian",
    boardSlug: "sacred-forms",
    title: "Guardian",
    price: 280,
    medium: "Charcoal / graphite",
    size: "Vertical sheet",
    availability: "Original",
    story:
      "A fierce armored deity with spear and flaming halo — high-contrast power and mythic detail.",
    image: "/art/IMG_7968.jpg",
    aspect: "portrait",
  },
];

export const heroArtwork = artworks.find((a) => a.slug === "guardian")!;

export const getBoardBySlug = (slug: string) =>
  boards.find((board) => board.slug === slug);

export const getArtworkBySlug = (slug: string) =>
  artworks.find((artwork) => artwork.slug === slug);

export const getArtworksForBoard = (boardSlug: string) =>
  artworks.filter((artwork) => artwork.boardSlug === boardSlug);
