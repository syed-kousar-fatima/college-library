
const user = {
  id: "student-001",
  name: "Aarav Sharma",
  firstName: "Aarav",
  email: "aarav.sharma@example.edu",
  studentId: "STU2026001",
  department: "Computer Science",
  course: "B.Tech Computer Science",
  year: "3rd Year",
  semester: 5,
  avatar: "https://i.pravatar.cc/160?img=12",
  membership: {
    type: "Student",
    status: "Active",
    joinedDate: "2025-07-15",
    expiryDate: "2027-06-30"
  },
  statistics: {
    booksBorrowed: 12,
    currentlyBorrowed: 3,
    booksReturned: 9,
    overdueBooks: 0
  },
  preferences: {
    favoriteCategories: [
      "Computer Science",
      "Self Development",
      "Science"
    ],
    notificationsEnabled: true,
    preferredLanguage: "English"
  }
};

export default user;
