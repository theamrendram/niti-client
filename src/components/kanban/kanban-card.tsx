import { Badge } from "../ui/badge";
import { TfiCommentAlt } from "react-icons/tfi";
import type { kanbanCardProps } from "@/types/kanban.types";
import { defaultAnimateLayoutChanges, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
interface KanbanCardComponentProps {
  data: kanbanCardProps;
  columnId: string;
}

const KanbanCard = ({ data, columnId }: KanbanCardComponentProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: data.id,
    data: {
      card: data,
      columnId,
    },
    animateLayoutChanges: defaultAnimateLayoutChanges,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      role="button"
      aria-label={`Card: ${data.title}`}
      className="bg-white h-[200px] w-[250px] border rounded-md shadow p-2 flex flex-col justify-between focus:outline-none focus:ring-2 focus:ring-blue-500"
      tabIndex={0}>
        
      {/* Top Badges */}
      <div className="flex justify-between gap-2">
        <div className="flex gap-2">
          <Badge variant={data.priority}>{data.priority}</Badge>
          <Badge className="bg-blue-100 text-blue-500 rounded">
            {data.category}
          </Badge>
        </div>
        <p className="text-sm text-gray-500">D-{data.id}</p>
      </div>

      {/* Title + Description */}
      <div className="py-2">
        <p className="text-md text-gray-700 font-medium">{data.title}</p>
        <p className="text-sm text-gray-500">{data.description}</p>
      </div>

      {/* Footer: Members + Comments */}
      <div className="flex items-center justify-between">
        {/* Member Avatars */}
        <div className="flex -space-x-1">
          {data.members.map((member) => (
            <img
              key={member}
              src={`https://ui-avatars.com/api/?name=${member}&background=random&color=fff`}
              alt={member}
              className="rounded-full h-6 w-6 ring-2 ring-white"
            />
          ))}
        </div>

        {/* Comment Icon (static count for now) */}
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <TfiCommentAlt /> 2
        </div>
      </div>
    </div>
  );
};

export default KanbanCard;
