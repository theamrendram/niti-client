import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IoPersonAddSharp } from "react-icons/io5";
import { MdViewKanban } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";
import { FaTimeline } from "react-icons/fa6";
import KanbanBoard from "@/components/kanban/kanban-board";
import type { kanbanBoardProps } from "@/types/kanban.types";
const ProjectDetail = () => {
  const { projectId } = useParams();

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
          description:
            "Document all authentication and user APIs using Swagger.",
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
          description:
            "Implement JWT-based authentication with refresh tokens.",
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

  return (
    <div>
      <div className="header flex flex-col gap-6 p-8">
        {/* Header Top */}
        <div className="flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <div
              className="h-12 w-12 rounded-md border border-pink-200"
              style={{
                backgroundImage:
                  "radial-gradient(circle at center, #d8b4fe, white)",
              }}></div>
            <div>
              <p className="text-xl font-semibold text-gray-800">{projectId}</p>
              <div className="flex flex-wrap gap-x-4 text-sm text-gray-600 mt-1">
                <p>
                  <span className="text-gray-400">Timeline:</span> May 20, 2025
                  - June 20, 2025
                </p>
                <p>
                  <span className="text-gray-400">Client:</span> Google Singh
                </p>
                <p>
                  <span className="text-gray-400">Status:</span>{" "}
                  <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded text-xs font-medium">
                    In Progress
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Avatars + Invite Button */}
          <div className="flex items-center gap-3">
            <div className="flex -space-x-1">
              {["Batman", "Robin", "Superman", "Ironman"].map((name) => (
                <img
                  key={name}
                  src={`https://ui-avatars.com/api/?name=${name}&background=random&color=fff`}
                  alt={name}
                  className="rounded-full h-8 w-8 ring-2 ring-white"
                />
              ))}
            </div>
            <Button className="flex items-center gap-2 w-fit px-3 py-1">
              <IoPersonAddSharp />
              Invite
            </Button>
          </div>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="kanban" className="w-full">
          <TabsList className="bg-white border rounded-md px-2 py-1 gap-4 shadow-sm">
            <TabsTrigger
              value="kanban"
              className="data-[state=active]:shadow-md flex items-center gap-1">
              <MdViewKanban />
              Kanban
            </TabsTrigger>
            <TabsTrigger
              value="calender"
              className="data-[state=active]:shadow-md flex items-center gap-1">
              <FaCalendarAlt />
              Calendar
            </TabsTrigger>
            <TabsTrigger
              value="timeline"
              className="data-[state=active]:shadow-md flex items-center gap-1">
              <FaTimeline />
              Timeline
            </TabsTrigger>
          </TabsList>

          <TabsContent value="kanban">
            <div className="flex gap-4 mt-4 overflow-x-auto pb-4">
              {kanbanData.map((item) => (
                <KanbanBoard
                  key={item.title}
                  title={item.title}
                  cardData={item.cardData}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="calender">
            <div className="text-gray-600 p-4">Calendar view coming soon.</div>
          </TabsContent>

          <TabsContent value="timeline">
            <div className="text-gray-600 p-4">Timeline view coming soon.</div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProjectDetail;
