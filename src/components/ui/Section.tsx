interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  bg?: "white" | "gray" | "brand" | "dark";
  spacing?: "sm" | "md" | "lg";
}

const bgStyles = {
  white: "bg-white",
  gray: "bg-neutral-50",
  brand: "bg-brand-500 text-white",
  dark: "bg-neutral-900 text-white",
};

const spacingStyles = {
  sm: "py-10 sm:py-12",
  md: "py-16 sm:py-20",
  lg: "py-20 sm:py-28",
};

export default function Section({ children, className = "", id, bg = "white", spacing = "md" }: SectionProps) {
  return (
    <section id={id} className={`${spacingStyles[spacing]} ${bgStyles[bg]} ${className}`}>
      {children}
    </section>
  );
}
