import { Camera } from "lucide-react";

interface ImagePlaceholderProps {
  label: string;
  aspectRatio?: string;
  className?: string;
  rounded?: boolean;
}

export default function ImagePlaceholder({
  label,
  aspectRatio = "aspect-video",
  className = "",
  rounded = false,
}: ImagePlaceholderProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 border-2 border-dashed border-neutral-300 bg-neutral-100 text-neutral-400 ${aspectRatio} ${rounded ? "rounded-full" : "rounded-2xl"} ${className}`}
    >
      <Camera size={24} strokeWidth={1.5} />
      <span className="px-3 text-center text-xs leading-tight">{label}</span>
    </div>
  );
}
