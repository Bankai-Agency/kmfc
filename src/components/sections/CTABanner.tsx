"use client";

import { ArrowRight, Check } from "lucide-react";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

interface CTABannerProps {
  title: string;
  subtitle?: string;
  bullets?: string[];
  buttonText?: string;
  href?: string;
  imageLabel?: string;
}

export default function CTABanner({
  title,
  subtitle,
  bullets,
  buttonText = "Оставить заявку",
  href = "#form",
  imageLabel = "Иллюстрация",
}: CTABannerProps) {
  return (
    <Section bg="white" spacing="sm">
      <Container>
        <AnimateOnScroll>
          <div className="flex flex-col-reverse overflow-hidden rounded-3xl bg-neutral-50 md:grid md:grid-cols-[1.15fr_1fr]">
            <div className="flex flex-col p-6 sm:p-8 md:justify-center md:p-12 lg:p-14">
              <h3 className="text-2xl font-bold leading-tight text-neutral-900 sm:text-3xl">
                {title}
              </h3>
              {subtitle && (
                <p className="mt-3 text-neutral-600">{subtitle}</p>
              )}
              {bullets && bullets.length > 0 && (
                <ul className="mt-5 space-y-2.5">
                  {bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-neutral-700">
                      <Check size={20} strokeWidth={2.5} className="mt-0.5 shrink-0 text-brand-500" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
              <a
                href={href}
                className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-500 px-6 py-3.5 font-semibold text-white shadow-sm transition-colors hover:bg-brand-600 md:w-fit md:justify-start"
              >
                {buttonText}
                <ArrowRight size={18} strokeWidth={2.5} />
              </a>
            </div>
            <div className="relative flex items-center justify-center p-6 pb-0 sm:p-8 sm:pb-0 md:min-h-[320px] md:p-8">
              <ImagePlaceholder
                label={imageLabel}
                aspectRatio="aspect-[4/3] md:aspect-auto"
                className="h-full w-full md:h-full"
              />
            </div>
          </div>
        </AnimateOnScroll>
      </Container>
    </Section>
  );
}
