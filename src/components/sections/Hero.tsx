"use client";

import { MapPin, Calculator, Shield, Clock } from "lucide-react";
import { HeroData } from "@/lib/types";
import Container from "@/components/ui/Container";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";

interface HeroProps {
  data: HeroData;
  collateralImageLabel: string;
  collateralImage?: string;
}

export default function Hero({ data, collateralImageLabel, collateralImage }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-neutral-900 text-white">
      {/* Subtle gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-500/10 via-transparent to-brand-700/5" />
      <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-brand-500/8 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-brand-500/5 blur-3xl" />

      <Container className="relative py-16 sm:py-20 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-12">
          {/* Left: text + CTA */}
          <div>
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm backdrop-blur-sm">
                <MapPin size={14} strokeWidth={2} />
                Алматы и Актобе
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm backdrop-blur-sm">
                <Shield size={14} strokeWidth={2} />
                Лицензия НБ РК
              </span>
            </div>

            {/* Title */}
            <h1 className="mt-6 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              {data.title}
            </h1>

            {/* Subtitle */}
            <p className="mt-4 max-w-xl text-lg text-white/70 sm:text-xl">
              {data.subtitle}
            </p>

            {/* Urgency badge */}
            <div className="mt-6 inline-flex items-center gap-2 rounded-lg bg-accent-400/15 px-4 py-2 text-sm font-medium text-accent-400">
              <Clock size={16} strokeWidth={2} />
              Акция: бесплатная оценка залога до конца месяца
            </div>

            {/* CTA buttons */}
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#form"
                className="inline-flex items-center justify-center rounded-xl bg-brand-500 px-7 py-3.5 text-base font-semibold text-white transition-colors hover:bg-brand-600"
              >
                Оставить заявку
              </a>
              <a
                href="#calculator"
                className="inline-flex items-center gap-2 rounded-xl border-2 border-white/20 px-6 py-3.5 font-semibold transition-colors hover:bg-white/10"
              >
                <Calculator size={18} strokeWidth={2} />
                Рассчитать кредит
              </a>
            </div>

            {/* Stats bar */}
            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {data.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col items-center justify-center rounded-xl bg-white/10 px-2 py-4 text-center backdrop-blur-sm"
                >
                  <div className="text-xl font-bold leading-tight sm:text-2xl">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-xs text-white/50">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: collateral photo */}
          <div className="overflow-hidden rounded-2xl">
            {collateralImage ? (
              <img
                src={collateralImage}
                alt={collateralImageLabel}
                className="h-full w-full object-cover aspect-[4/3]"
              />
            ) : (
              <ImagePlaceholder
                label={collateralImageLabel}
                aspectRatio="aspect-[4/3]"
                className="border-white/10 bg-white/5 text-white/40"
              />
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
