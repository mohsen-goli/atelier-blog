export type Post = {
  slug: string;
  title: string;
  description: string;
  content: string;
  image: string;
  category: string;
  date: string;
  author: string;
};

export const posts: Post[] = [
  {
    slug: "architecture-of-tomorrow",
    title: "The Architecture of Tomorrow",
    description:
      "Discover how modern architecture is reshaping the way we live.",
    content:
      "Architecture is more than designing buildings. It is about creating meaningful spaces that connect people, nature and everyday life.",
    image: "/images/modern-architecture.jpg",
    category: "Architecture",
    date: "2026-11-24",
    author: "Alex Morgan",
  },
  {
    slug: "art-of-minimal-living",
    title: "The Art of Minimal Living",
    description:
      "A thoughtful approach to living with less and experiencing more.",
    content:
      "Minimal living is not about owning nothing. It is about making room for the things that truly matter.",
    image: "/images/interior-design.jpg",
    category: "Lifestyle",
    date: "2026-11-23",
    author: "Emma Wilson",
  },
  {
    slug: "modern-fashion-stories",
    title: "Modern Fashion Stories",
    description: "Exploring timeless style and the beauty of simplicity.",
    content:
      "True style is not about following every trend. It is about discovering what feels authentic to you.",
    image: "/images/fashion-editorial.jpg",
    category: "Fashion",
    date: "2026-11-22",
    author: "Sophia Blake",
  },
  {
    slug: "finding-beauty-in-nature",
    title: "Finding Beauty in Nature",
    description: "Why reconnecting with nature matters more than ever.",
    content:
      "Nature reminds us to slow down, observe and appreciate the small details around us.",
    image: "/images/nature-story.jpg",
    category: "Nature",
    date: "2026-11-21",
    author: "Daniel Reed",
  },
  {
    slug: "the-new-way-of-working",
    title: "The New Way of Working",
    description: "How technology is changing our everyday work experience.",
    content:
      "Technology continues to reshape the way people collaborate, create and communicate.",
    image: "/images/technology.jpg",
    category: "Technology",
    date: "2026-11-20",
    author: "Alex Morgan",
  },
  {
    slug: "slow-travel-guide",
    title: "The Art of Slow Travel",
    description: "Experience destinations beyond the typical tourist journey.",
    content:
      "Slow travel invites us to explore places with curiosity and connect with local culture.",
    image: "/images/travel.jpg",
    category: "Travel",
    date: "2026-11-19",
    author: "Emma Wilson",
  },
];
