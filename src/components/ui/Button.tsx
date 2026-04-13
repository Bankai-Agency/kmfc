import { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "outline";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-brand-500 text-white hover:bg-brand-600 active:bg-brand-700",
  secondary: "bg-accent-400 text-neutral-900 hover:bg-accent-500 active:bg-accent-600",
  outline: "border-2 border-brand-500 text-brand-500 hover:bg-brand-50 active:bg-brand-100",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

type BaseProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
};

type ButtonProps = BaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: never };
type LinkProps = BaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export default function Button({ variant = "primary", size = "md", className = "", ...props }: ButtonProps | LinkProps) {
  const classes = `inline-flex items-center justify-center font-semibold rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-brand-400 focus:ring-offset-2 ${variants[variant]} ${sizes[size]} ${className}`;

  if ("href" in props && props.href) {
    return <a {...(props as LinkProps)} className={classes} />;
  }

  return <button {...(props as ButtonProps)} className={classes} />;
}
