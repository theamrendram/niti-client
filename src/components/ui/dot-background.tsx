import { cn } from "@/lib/utils";

const DotBackground = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative w-full bg-white dark:bg-black">
      {/* Dotted background layer */}
      <div
        className={cn(
          "absolute inset-0 z-0",
          "[background-size:20px_20px]",
          "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
          "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]"
        )}
      />

      {/* Soft radial mask overlay */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black" />

      {/* Foreground content */}
      <div className="relative z-20">{children}</div>
    </div>
  );
};

export default DotBackground;
