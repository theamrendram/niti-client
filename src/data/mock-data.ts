import type { kanbanBoardProps } from "@/types/kanban.types";
const kanbanData: kanbanBoardProps[] = [
  {
    title: "To Do",
    cardData: [
      {
        id: "1",
        title: "Design Login Page",
        priority: "high",
        description:
          "Create the UI/UX design for the login and registration screens.",
        members: ["Alice", "Bob"],
        category: "UI/UX",
      },
      {
        id: "2",
        title: "Write API Docs",
        priority: "medium",
        description: "Document all authentication and user APIs using Swagger.",
        members: ["Charlie"],
        category: "Documentation",
      },
      {
        id: "3",
        title: "Create Test Plan",
        priority: "low",
        description: "Draft the initial test cases for the user module.",
        members: ["Eli"],
        category: "QA",
      },
    ],
  },
  {
    title: "In Progress",
    cardData: [
      {
        id: "4",
        title: "Implement Auth Flow",
        priority: "medium",
        description: "Implement JWT-based authentication with refresh tokens.",
        members: ["Charlie"],
        category: "Back-End",
      },
      {
        id: "5",
        title: "Style Dashboard Page",
        priority: "low",
        description:
          "Apply Tailwind styling and responsive design to the dashboard.",
        members: ["Bob", "Alice"],
        category: "Front-End",
      },
    ],
  },
  {
    title: "Review",
    cardData: [
      {
        id: "6",
        title: "Fix Navigation Bugs",
        priority: "low",
        description: "Resolve minor issues with mobile nav responsiveness.",
        members: ["Dana", "Eli"],
        category: "Front-End",
      },
      {
        id: "7",
        title: "Review Database Schema",
        priority: "high",
        description:
          "Ensure schema meets normalization and indexing standards.",
        members: ["Charlie"],
        category: "Database",
      },
    ],
  },
];

export { kanbanData };
