import skincare from "@/assets/project-skincare.jpg";
import coffee from "@/assets/project-coffee.jpg";
import motion from "@/assets/project-motion.jpg";
import magazine from "@/assets/project-magazine.jpg";
import brand from "@/assets/project-brand.jpg";
import social from "@/assets/project-social.jpg";
import app from "@/assets/project-app.jpg";

export type Project = {
  slug: string;
  title: string;
  category: string;
  description: string;
  image: string;
  year: string;
  client: string;
  size?: "large" | "tall" | "wide" | "square";
};

export const projects: Project[] = [
  { slug: "aura-skincare", title: "Aura Botanical Series", category: "Packaging", description: "A luxury skincare line reimagined through warm minimalism.", image: skincare, year: "2024", client: "Aura Wellness", size: "large" },
  { slug: "verve-coffee", title: "Verve Coffee App", category: "UI Design", description: "A mobile ordering experience for a third-wave coffee brand.", image: coffee, year: "2024", client: "Verve Coffee", size: "tall" },
  { slug: "flow-motion", title: "Flow — Motion Study", category: "Motion Graphics", description: "An exploration in fluid abstract animation systems.", image: motion, year: "2023", client: "Personal", size: "square" },
  { slug: "epoch-magazine", title: "Epoch Magazine Vol. 4", category: "Branding", description: "Editorial design for a quarterly culture publication.", image: magazine, year: "2024", client: "Epoch Press", size: "wide" },
  { slug: "form-identity", title: "Form Studio Identity", category: "Logo Design", description: "A complete brand system for an architecture studio.", image: brand, year: "2023", client: "Form Studio", size: "square" },
  { slug: "lumen-social", title: "Lumen Social Campaign", category: "Social Media Posts", description: "An evergreen template system for a wellness brand.", image: social, year: "2024", client: "Lumen Co.", size: "square" },
  { slug: "pulse-app", title: "Pulse Fitness Tracker", category: "UI Design", description: "A focused dark-mode fitness app with a strong identity.", image: app, year: "2024", client: "Pulse Health", size: "tall" },
];

export const categories = ["All", "Logo Design", "Branding", "Social Media Posts", "Packaging", "UI Design", "Motion Graphics"];

export const services = [
  { name: "Logo Design", price: "$650", time: "5 days", features: ["3 concept directions", "Unlimited revisions", "Vector source files", "Brand guidelines mini"] },
  { name: "Brand Identity", price: "$2,400", time: "3 weeks", features: ["Full visual system", "Logo + typography", "Color palette + textures", "60-page brand book"], featured: true },
  { name: "Social Media Design", price: "$890/mo", time: "Ongoing", features: ["20 post templates/mo", "Story templates", "Highlight covers", "Brand-aligned grid"] },
  { name: "UI / UX Design", price: "$3,200", time: "4 weeks", features: ["User research", "Wireframes + prototypes", "Hi-fi mockups", "Design system handoff"] },
  { name: "Packaging Design", price: "$1,800", time: "3 weeks", features: ["Structural + surface design", "Print-ready files", "Mockup gallery", "Vendor coordination"] },
  { name: "Motion Graphics", price: "$1,200", time: "2 weeks", features: ["Logo animation", "Social motion assets", "Source files", "4K export"] },
];

export const skills = [
  { name: "Adobe Photoshop", level: 96 },
  { name: "Adobe Illustrator", level: 94 },
  { name: "Figma", level: 90 },
  { name: "Canva", level: 92 },
  { name: "Logo Design", level: 95 },
  { name: "Brand Identity", level: 93 },
  { name: "Social Media Graphics", level: 91 },
  { name: "Print Design", level: 88 },
];

export const testimonials = [
  { name: "Rahul Sharma", title: "Founder, TechStart India", quote: "Jayshuman has a rare ability to translate complex business values into simple, beautiful visual systems. Our brand has never felt more cohesive.", rating: 5 },
  { name: "Ananya Patel", title: "CEO, Glow Wellness", quote: "Working with Jayshuman was effortless. Strategic, detail-obsessed, and on-time. Our packaging and social creatives now truly stand out.", rating: 5 },
  { name: "Vikram Mehta", title: "Director, Mehta Enterprises", quote: "He doesn't just design — he builds future-proof brand ecosystems. The clarity and craft he brought to our identity is unmatched.", rating: 5 },
  { name: "Priya Singh", title: "Marketing Head, Urban Style", quote: "Our social media engagement increased by 60% after Jayshuman redesigned our content. His understanding of modern trends is incredible.", rating: 5 },
  { name: "Amit Kumar", title: "Founder, BuildRight Construction", quote: "A masterclass in logo and brand design. Every element feels intentional, every detail considered. Highly recommended.", rating: 5 },
  { name: "Sneha Gupta", title: "Owner, The Coffee House", quote: "He understood our vision within the first call. The brand identity he crafted is timeless and perfectly represents us.", rating: 5 },
];

export const timeline = [
  { year: "2024", title: "Independent Graphic Designer", subtitle: "Serving clients across India and globally with branding, social media, and print design." },
  { year: "2022", title: "Freelance Brand Designer", subtitle: "Started full-time freelance journey focusing on logo design and brand identity for startups and SMEs." },
  { year: "2020", title: "Digital Design Specialist", subtitle: "Expanded into social media graphics, marketing creatives, and modern digital experiences." },
  { year: "2018", title: "Began Design Journey", subtitle: "Discovered passion for visual storytelling and started honing skills in Adobe Creative Suite." },
];

export const posts = [
  { slug: "branding-2024", title: "The State of Branding in 2024", category: "Trends", date: "Mar 12, 2024", excerpt: "Why restraint and craft are quietly winning the brand war." },
  { slug: "type-pairings", title: "Five Type Pairings That Always Work", category: "Tutorials", date: "Feb 28, 2024", excerpt: "The combos I keep coming back to in client work — and why." },
  { slug: "ai-design", title: "Designing With AI Without Losing Your Voice", category: "Inspiration", date: "Feb 14, 2024", excerpt: "Tools should sharpen taste, not replace it. A working framework." },
  { slug: "packaging-print", title: "The Quiet Power of Print Finishes", category: "Tutorials", date: "Jan 30, 2024", excerpt: "Spot UV, foil, deboss — when each one earns its place." },
  { slug: "client-onboarding", title: "How I Onboard New Branding Clients", category: "Process", date: "Jan 12, 2024", excerpt: "The questions, the docs, and the rituals behind every project." },
  { slug: "color-systems", title: "Building Color Systems That Scale", category: "Tutorials", date: "Dec 22, 2023", excerpt: "From naming to tokens — color systems that survive contact with real product." },
];
