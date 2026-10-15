
import {
  BookOpen,
  Brain,
  BriefcaseBusiness,
  Code2,
  FlaskConical,
  Globe2,
  Landmark,
  Microscope,
  Palette,
  Wallet
} from "lucide-react";

const categories = [
  {
    id: "computer-science",
    name: "Computer Science",
    slug: "computer-science",
    description: "Explore programming, software engineering, algorithms, and emerging technologies.",
    icon: Code2,
    color: "#315C4B",
    background: "#E5EEE7",
    bookCount: 120
  },
  {
    id: "fiction",
    name: "Fiction",
    slug: "fiction",
    description: "Discover captivating novels, imaginative worlds, and unforgettable stories.",
    icon: BookOpen,
    color: "#9B6347",
    background: "#F5E8DF",
    bookCount: 96
  },
  {
    id: "science",
    name: "Science",
    slug: "science",
    description: "Understand the natural world through physics, chemistry, biology, and discovery.",
    icon: FlaskConical,
    color: "#47758B",
    background: "#E4F0F4",
    bookCount: 84
  },
  {
    id: "self-development",
    name: "Self Development",
    slug: "self-development",
    description: "Build better habits, sharpen your focus, and develop your potential.",
    icon: Brain,
    color: "#8063A3",
    background: "#EEE7F5",
    bookCount: 72
  },
  {
    id: "finance",
    name: "Finance",
    slug: "finance",
    description: "Learn about money management, investing, economics, and financial literacy.",
    icon: Wallet,
    color: "#9A773B",
    background: "#F5EEDC",
    bookCount: 58
  },
  {
    id: "biography",
    name: "Biography",
    slug: "biography",
    description: "Read the inspiring life stories of innovators, leaders, and remarkable people.",
    icon: Landmark,
    color: "#526C8C",
    background: "#E8EDF5",
    bookCount: 46
  },
  {
    id: "history",
    name: "History",
    slug: "history",
    description: "Explore civilizations, historical events, cultures, and the people who shaped them.",
    icon: Globe2,
    color: "#9A654D",
    background: "#F4E8E0",
    bookCount: 64
  },
  {
    id: "philosophy",
    name: "Philosophy",
    slug: "philosophy",
    description: "Reflect on ethics, meaning, knowledge, and the questions behind human existence.",
    icon: Brain,
    color: "#557C70",
    background: "#E5F0EB",
    bookCount: 38
  },
  {
    id: "business",
    name: "Business",
    slug: "business",
    description: "Discover entrepreneurship, leadership, management, and organizational strategy.",
    icon: BriefcaseBusiness,
    color: "#526B92",
    background: "#E7ECF5",
    bookCount: 52
  },
  {
    id: "engineering",
    name: "Engineering",
    slug: "engineering",
    description: "Study practical engineering principles, systems, design, and technical innovation.",
    icon: Microscope,
    color: "#4C7B78",
    background: "#E4F0EE",
    bookCount: 88
  },
  {
    id: "arts",
    name: "Arts & Design",
    slug: "arts",
    description: "Find inspiration in visual arts, creative practice, design, and aesthetics.",
    icon: Palette,
    color: "#A05E7D",
    background: "#F5E6EE",
    bookCount: 42
  }
];

export default categories;
