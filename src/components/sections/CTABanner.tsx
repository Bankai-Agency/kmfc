"use client";

import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";

interface CTABannerProps {
  title: string;
  subtitle?: string;
  buttonText?: string;
  href?: string;
  variant?: "brand" | "dark";
}

export default function CTABanner({
  title,
  subtitle,
  buttonText = "Оставить заявку",
  href = "#form",
  variant = "brand",
}: CTABannerProps) {
  const bg = variant === "dark"
    ? "bg-neutral-900 text-white"
    : "bg-gradient-to-r from-brand-500 to-brand-600 text-white";

  return (
    <section className={`py-10 sm:py-12 ${bg}`}>
      <Container className="flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <h3 className="text-lg font-bold sm:text-xl">{title}</h3>
          {subtitle && <p className="mt-1 text-sm opacity-80">{subtitle}</p>}
        </div>
        <a
          href={href}
          className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-accent-400 px-6 py-3 font-semibold text-neutral-900 transition-colors hover:bg-accent-500"
        >
          {buttonText}
          <ArrowRight size={18} strokeWidth={2} />
        </a>
      </Container>
    </section>
  );
}
