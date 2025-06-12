import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IoPersonAddSharp } from "react-icons/io5";
import { MdViewKanban } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";
import { FaTimeline } from "react-icons/fa6";
import KanbanBoard from "@/components/kanban/kanban-board";
import { initialKanbanData } from "@/data/mock-data";
import InviteModal from "@/components/invite-modal";
import DotBackground from "@/components/ui/dot-background";
import {
  closestCorners,
  DndContext,
  DragOverlay,
  type DragStartEvent,
  type DragEndEvent,
} from "@dnd-kit/core";
import KanbanCard from "@/components/kanban/kanban-card";
import { type kanbanCardProps } from "@/types/kanban.types";
const ProjectDetail = () => {
  const { projectId } = useParams();
  const [openInvite, setOpenInvite] = useState(false);
  const [activeCard, setActiveCard] = useState<kanbanCardProps | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    const card = event.active.data.current?.card;
    if (card) setActiveCard(card);
  };

  const [kanbanData, setKanbanData] = useState(initialKanbanData);

  const saveKanbanState = async (data: typeof kanbanData) => {
    try {
      await fetch("/api/save-kanban", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error("Failed to save board state:", error);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveCard(null);

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;
    const activeColumn = active.data.current?.columnId;
    const overColumn = over.data.current?.columnId;

    if (!activeColumn || !overColumn) return;
    if (activeId === overId && activeColumn === overColumn) return;

    setKanbanData((prev) => {
      const updated = [...prev];

      const fromCol = updated.find((col) => col.title === activeColumn)!;
      const toCol = updated.find((col) => col.title === overColumn)!;

      const fromIdx = fromCol.cardData.findIndex(
        (card) => card.id === activeId
      );
      const toIdx = toCol.cardData.findIndex((card) => card.id === overId);

      if (fromIdx === -1) return prev;

      const [movedCard] = fromCol.cardData.splice(fromIdx, 1);

      // Same column sorting
      if (fromCol === toCol) {
        const newIdx = fromIdx < toIdx ? toIdx - 1 : toIdx;
        toCol.cardData.splice(newIdx, 0, movedCard);
      } else {
        // Cross-column movement
        if (toIdx === -1) {
          // Dropped into empty column or beyond last card
          toCol.cardData.push(movedCard);
        } else {
          toCol.cardData.splice(toIdx, 0, movedCard);
        }
      }

      saveKanbanState(updated);
      return updated;
    });
  };

  return (
    <DotBackground>
      <Tabs defaultValue="kanban" className="w-full">
        {/* Combined Container with Border */}
        <div className="border rounded-md overflow-hidden bg-white">
          {/* Header */}
          <div className="flex flex-col gap-6 p-8 border-b">
            <div className="flex justify-between items-center">
              <div className="flex gap-4 items-center">
                <div
                  className="h-12 w-12 rounded-md border border-pink-200"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at center, #d8b4fe, white)",
                  }}></div>
                <div>
                  <p className="text-xl font-semibold text-gray-800">
                    {projectId}
                  </p>
                  <div className="flex flex-wrap gap-x-4 text-sm text-gray-600 mt-1">
                    <p>
                      <span className="text-gray-400">Timeline:</span> May 20,
                      2025 - June 20, 2025
                    </p>
                    <p>
                      <span className="text-gray-400">Client:</span> Google
                      Singh
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

              {/* Avatars + Invite */}
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
                <Button
                  className="flex items-center gap-2 w-fit px-3 py-1"
                  onClick={() => setOpenInvite(!openInvite)}>
                  <IoPersonAddSharp />
                  Invite
                </Button>
              </div>
            </div>
          </div>

          {/* Tabs List */}
          <TabsList className="px-4 py-2 flex gap-4 bg-white border-b">
            <TabsTrigger
              value="kanban"
              className="data-[state=active]:shadow-md flex items-center gap-1 py-3 border">
              <MdViewKanban />
              Kanban
            </TabsTrigger>
            <TabsTrigger
              value="calender"
              className="data-[state=active]:shadow-md flex items-center gap-1 py-3 border">
              <FaCalendarAlt />
              Calendar
            </TabsTrigger>
            <TabsTrigger
              value="timeline"
              className="data-[state=active]:shadow-md flex items-center gap-1 py-3 border">
              <FaTimeline />
              Timeline
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Tab Content */}
        <TabsContent value="kanban">
          <div className="">
            <DndContext
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              collisionDetection={closestCorners}
              autoScroll={true}>
              <div className="flex gap-4 mt-4 overflow-x-auto pb-4">
                {kanbanData.map((item) => (
                  <KanbanBoard
                    key={item.title}
                    title={item.title}
                    cardData={item.cardData}
                  />
                ))}
              </div>

              <DragOverlay>
                {activeCard ? (
                  <KanbanCard data={activeCard} columnId="" /> // Dummy columnId
                ) : null}
              </DragOverlay>
            </DndContext>
          </div>
        </TabsContent>

        <TabsContent value="calender">
          <div className="text-gray-600 p-4">Calendar view coming soon.</div>
        </TabsContent>

        <TabsContent value="timeline">
          <div className="text-gray-600 p-4">Timeline view coming soon.</div>
        </TabsContent>
      </Tabs>
      <InviteModal open={openInvite} setOpen={setOpenInvite} />
    </DotBackground>
  );
};

export default ProjectDetail;
