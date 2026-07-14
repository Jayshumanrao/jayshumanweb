import skincare from "@/assets/project-skincare.jpg";
import coffee from "@/assets/project-coffee.jpg";
import motion from "@/assets/project-motion.jpg";
import magazine from "@/assets/project-magazine.jpg";
import brand from "@/assets/project-brand.jpg";
import social from "@/assets/project-social.jpg";
import app from "@/assets/project-app.jpg";
import anshuman from "@/assets/anshuman-rao.png";

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

export type Testimonial = {
  name: string;
  title: string;
  quote: string;
  rating: number;
  image?: string;
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
  { name: "Logo Design", price: "₹2,500", time: "3–5 days", features: ["3 concept directions", "Unlimited revisions", "Vector source files", "Brand guidelines mini", "Full ownership rights"] },
  { name: "Brand Identity", price: "₹12,000", time: "1–2 weeks", features: ["Full visual system", "Logo + typography", "Color palette + textures", "Brand guidelines", "Social media kit"], featured: true },
  { name: "Social Media Design", price: "₹4,500/mo", time: "Ongoing", features: ["15 post templates/mo", "Story templates", "Highlight covers", "Brand-aligned grid", "Reels/shorts covers"] },
  { name: "Website Design", price: "₹15,000", time: "2–3 weeks", features: ["Responsive design", "Modern UI/UX", "SEO-friendly structure", "Source files handoff", "1 month support"] },
  { name: "Print Design", price: "₹3,500", time: "5–7 days", features: ["Business cards", "Brochures / Flyers", "Posters & Banners", "Print-ready files", "Vendor coordination"] },
  { name: "Marketing Creatives", price: "₹2,000", time: "3–5 days", features: ["Ad creatives", "Email headers", "Presentation decks", "Promotional banners", "Multiple formats"] },
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

export const testimonials: Testimonial[] = [
  { name: "Anshuman Rao", title: "Business Owner", quote: "Working with Jayshuman was a great experience. The website exceeded my expectations with its modern design, fast performance, and responsive layout. Communication was smooth throughout the project, and every requirement was implemented professionally. I highly recommend his web development services to anyone looking for a high-quality business website.", rating: 5, image: anshuman },
  { name: "Priya Sharma", title: "Founder, UrbanThread", quote: "Jayshuman transformed our online store into a sleek, high-converting website. The attention to detail, fast load times, and mobile-first design directly boosted our sales. He understood our brand vision and delivered beyond what we imagined. Truly a professional developer you can trust.", rating: 5 },
  { name: "Vikram Mehta", title: "Marketing Director, NexGen Labs", quote: "Our company needed a corporate website that looked premium and performed flawlessly. Jayshuman delivered exactly that — clean code, elegant UI, and smooth animations. The project was completed on time, and the feedback from our clients has been outstanding. Highly recommended.", rating: 5 },
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
