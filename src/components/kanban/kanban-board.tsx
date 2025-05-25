import KanbanCard from "./kanban-card";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import type { kanbanBoardProps } from "@/types/kanban.types";

const KanbanBoard = (props: kanbanBoardProps) => {
  return (
    <div>
      <div className="todo bg-gray-100 p-3 rounded-md">
        <div className="flex  items-center justify-between gap-2 w-full">
          <div className="flex items-center gap-2">
            <p className="font-semibold py-2 uppercase">{props.title}</p>
            <div className="h-full w-6 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-400 shadow-inner shadow-gray-200 border border-gray-300 text-center rounded">
              {props.cardData.length}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <FaPlus />
            <BsThreeDotsVertical />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {props.cardData.map((item) => (
            <KanbanCard key={item.id} data={item} />
          ))}
        </div>
      </div>
      <div className="in-progress"></div>
      <div className="review"></div>
      <div className="completed"></div>
    </div>
  );
};

export default KanbanBoard;
