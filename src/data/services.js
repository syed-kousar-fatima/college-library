
import {
  BookMarked,
  Clock3,
  GraduationCap,
  Headphones,
  Laptop,
  LibraryBig,
  Search,
  Users
} from "lucide-react";

const services = [
  {
    id: "book-borrowing",
    title: "Book Borrowing",
    description:
      "Borrow academic textbooks, research materials, and your favorite reads with a simple checkout process.",
    icon: BookMarked,
    color: "#315C4B",
    background: "#E5EEE7",
    actionLabel: "Explore Books",
    actionLink: "/books"
  },
  {
    id: "digital-library",
    title: "Digital Resources",
    description:
      "Explore online learning resources, e-books, reference materials, and digital study collections.",
    icon: Laptop,
    color: "#47758B",
    background: "#E4F0F4",
    actionLabel: "Browse Collection",
    actionLink: "/books"
  },
  {
    id: "research-support",
    title: "Research Assistance",
    description:
      "Find useful reference materials and discover resources that support your academic research.",
    icon: Search,
    color: "#8063A3",
    background: "#EEE7F5",
    actionLabel: "Find Resources",
    actionLink: "/books"
  },
  {
    id: "study-spaces",
    title: "Quiet Study Spaces",
    description:
      "Enjoy a calm, focused environment designed to support independent learning and productive study.",
    icon: GraduationCap,
    color: "#9A773B",
    background: "#F5EEDC",
    actionLabel: "Library Guidelines",
    actionLink: "/rules"
  },
  {
    id: "reading-community",
    title: "Reading Community",
    description:
      "Discover new interests, exchange reading recommendations, and make learning part of everyday life.",
    icon: Users,
    color: "#A05E7D",
    background: "#F5E6EE",
    actionLabel: "Explore Categories",
    actionLink: "/categories"
  },
  {
    id: "library-hours",
    title: "Convenient Library Hours",
    description:
      "Plan your visits around the library schedule and make time for learning throughout the week.",
    icon: Clock3,
    color: "#526B92",
    background: "#E7ECF5",
    actionLabel: "View Guidelines",
    actionLink: "/rules"
  },
  {
    id: "reference-collection",
    title: "Reference Collection",
    description:
      "Consult selected reference books and academic materials to strengthen your understanding of complex topics.",
    icon: LibraryBig,
    color: "#4C7B78",
    background: "#E4F0EE",
    actionLabel: "View Collection",
    actionLink: "/books"
  },
  {
    id: "reading-guidance",
    title: "Reading Guidance",
    description:
      "Explore different genres and find reading material that aligns with your interests and learning goals.",
    icon: Headphones,
    color: "#9B6347",
    background: "#F5E8DF",
    actionLabel: "Find Your Next Read",
    actionLink: "/categories"
  }
];

export default services;
