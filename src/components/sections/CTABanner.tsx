"use client";

import { ArrowRight, Check } from "lucide-react";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

interface CTABannerProps {
  title: string;
  subtitle?: string;
  bullets?: string[];
  buttonText?: string;
  href?: string;
}

export default function CTABanner({
  title,
  subtitle,
  bullets,
  buttonText = "Оставить заявку",
  href = "#form",
}: CTABannerProps) {
  return (
    <Section bg="gray" spacing="sm">
      <Container>
        <AnimateOnScroll>
          <div className="relative overflow-hidden rounded-3xl bg-neutral-900 md:grid md:grid-cols-[1.15fr_1fr]">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-500/10 via-transparent to-brand-700/5" />
            <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-brand-500/8 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-brand-500/5 blur-3xl" />

            <div className="relative flex flex-col p-6 sm:p-8 md:justify-center md:p-12 lg:p-14">
              <h3 className="text-2xl font-bold leading-tight text-white sm:text-3xl">
                {title}
              </h3>
              {subtitle && (
                <p className="mt-3 text-white/70">{subtitle}</p>
              )}
              {bullets && bullets.length > 0 && (
                <ul className="mt-5 space-y-2.5">
                  {bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-white/80">
                      <Check size={20} strokeWidth={2.5} className="mt-0.5 shrink-0 text-brand-400" />
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
            <div className="relative flex items-center justify-center p-6 pb-0 sm:p-8 sm:pb-0 md:min-h-[320px] md:p-0">
              <img
                src="/images/cta-illustration.png"
                alt="Иллюстрация"
                className="h-auto w-full max-w-none object-contain drop-shadow-2xl md:-my-8 md:-ml-12 md:w-[110%] md:max-w-[560px]"
              />
            </div>
          </div>
        </AnimateOnScroll>
      </Container>
    </Section>
  );
}
