
import {
  BookOpen,
  CalendarClock,
  ClipboardCheck,
  Headphones,
  Laptop,
  ShieldCheck,
  Sparkles,
  VolumeX
} from "lucide-react";

const libraryRules = [
  {
    id: "borrowing",
    title: "Borrowing Books",
    description:
      "Follow the library's borrowing procedures and return books by their due dates.",
    icon: BookOpen,
    color: "#315C4B",
    background: "#E5EEE7",
    guidelines: [
      "Carry your valid college ID when borrowing books.",
      "Confirm the return date before leaving the library.",
      "Do not lend your library account or issued books to others.",
      "Check books for damage before borrowing them."
    ]
  },
  {
    id: "returns",
    title: "Returns and Renewals",
    description:
      "Return borrowed materials on time and check renewal eligibility before the due date.",
    icon: CalendarClock,
    color: "#47758B",
    background: "#E4F0F4",
    guidelines: [
      "Return books at the designated circulation counter.",
      "Renewals depend on library policy and reservation status.",
      "Report lost or damaged books to library staff promptly.",
      "Check your account for outstanding items and due dates."
    ]
  },
  {
    id: "reading-room",
    title: "Reading Room Etiquette",
    description:
      "Help maintain a calm and welcoming environment for everyone.",
    icon: VolumeX,
    color: "#8063A3",
    background: "#EEE7F5",
    guidelines: [
      "Keep conversations quiet and brief.",
      "Silence mobile phones and electronic devices.",
      "Avoid disturbing students who are studying.",
      "Leave study tables clean and ready for the next reader."
    ]
  },
  {
    id: "book-care",
    title: "Care for Library Books",
    description:
      "Protect shared learning resources so other students can enjoy them too.",
    icon: ShieldCheck,
    color: "#9A773B",
    background: "#F5EEDC",
    guidelines: [
      "Do not write, highlight, fold, or tear book pages.",
      "Keep books away from food, drinks, and moisture.",
      "Use bookmarks instead of folding page corners.",
      "Report damaged pages or covers to library staff."
    ]
  },
  {
    id: "digital-resources",
    title: "Digital Resources",
    description:
      "Use library computers and digital materials responsibly and respectfully.",
    icon: Laptop,
    color: "#526B92",
    background: "#E7ECF5",
    guidelines: [
      "Use library technology for permitted academic activities.",
      "Respect copyright and the usage terms of digital resources.",
      "Never share personal passwords or account credentials.",
      "Sign out of accounts after using shared computers."
    ]
  },
  {
    id: "student-responsibility",
    title: "Student Responsibilities",
    description:
      "Help keep the library safe, organized, and accessible to the campus community.",
    icon: ClipboardCheck,
    color: "#4C7B78",
    background: "#E4F0EE",
    guidelines: [
      "Follow instructions provided by authorized library staff.",
      "Keep personal belongings in designated areas when required.",
      "Report lost library cards or account access concerns.",
      "Follow the official college policy for fines and replacements."
    ]
  },
  {
    id: "study-spaces",
    title: "Study Space Guidelines",
    description:
      "Use reading areas thoughtfully and share facilities fairly with other students.",
    icon: Sparkles,
    color: "#A05E7D",
    background: "#F5E6EE",
    guidelines: [
      "Use available seats responsibly during busy periods.",
      "Do not reserve seats for long periods when absent.",
      "Keep walkways and emergency exits clear.",
      "Return chairs and shared materials to their proper places."
    ]
  },
  {
    id: "library-access",
    title: "Library Access",
    description:
      "Follow entry procedures and observe the official library schedule.",
    icon: Headphones,
    color: "#9B6347",
    background: "#F5E8DF",
    guidelines: [
      "Follow the college library's published opening hours.",
      "Present identification when requested by library staff.",
      "Observe any restricted-area or special-collection rules.",
      "Follow official instructions during emergencies."
    ]
  }
];

export default libraryRules;
