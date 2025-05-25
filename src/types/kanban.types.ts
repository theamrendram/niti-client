type BadgeVariant =
  | "default"
  | "secondary"
  | "destructive"
  | "outline"
  | "high"
  | "low"
  | "medium";

interface kanbanCardProps {
  id: string;
  title: string;
  priority: BadgeVariant;
  description: string;
  members: string[];
  category: string;
}

interface kanbanBoardProps {
  title: string;
  cardData: kanbanCardProps[];
}

export type { kanbanBoardProps, kanbanCardProps };
