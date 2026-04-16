"use client";

import { ArrowRight } from "lucide-react";
import { CollateralType } from "@/lib/types";
import { COLLATERAL_CARDS } from "@/lib/data";
import Container from "@/components/ui/Container";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

export default function OtherCollateral({ current }: { current: CollateralType }) {
  const others = COLLATERAL_CARDS.filter((c) => c.slug !== current);

  return (
    <section className="bg-gradient-to-b from-brand-50 to-brand-100/50 pb-0 pt-16 sm:pt-20">
      <Container>
        <AnimateOnScroll>
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
            Посмотрите также
          </h2>
        </AnimateOnScroll>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {others.map((card, i) => (
            <AnimateOnScroll key={card.slug} delay={i * 0.1} className="h-full">
              <a
                href={`/${card.slug}`}
                className="group flex h-full items-center gap-4 rounded-2xl bg-white px-6 py-5 transition-colors hover:bg-neutral-50"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white">
                  <card.icon
                    size={20}
                    strokeWidth={1.5}
                    className="text-brand-500"
                  />
                </div>
                <span className="flex-1 text-base font-medium text-neutral-900">
                  {card.title}
                </span>
                <ArrowRight
                  size={20}
                  strokeWidth={2}
                  className="shrink-0 text-neutral-400 transition-transform group-hover:translate-x-1"
                />
              </a>
            </AnimateOnScroll>
          ))}
        </div>
      </Container>
    </section>
  );
}
