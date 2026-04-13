"use client";

import { CollateralType } from "@/lib/types";
import { COLLATERAL_CARDS } from "@/lib/data";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

export default function OtherCollateral({ current }: { current: CollateralType }) {
  return (
    <Section bg="gray">
      <Container>
        <AnimateOnScroll>
          <h2 className="text-center text-2xl font-bold sm:text-3xl">Другие виды залога</h2>
        </AnimateOnScroll>
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {COLLATERAL_CARDS.map((card, i) => {
            const isActive = card.slug === current;
            return (
              <AnimateOnScroll key={card.slug} delay={i * 0.1}>
                <a
                  href={`/${card.slug}`}
                  className={`flex flex-col items-center gap-3 rounded-2xl p-6 text-center transition-all duration-300 ${
                    isActive
                      ? "bg-brand-500 text-white shadow-lg shadow-brand-500/30"
                      : "bg-white text-neutral-700 hover:-translate-y-1 hover:shadow-lg"
                  }`}
                >
                  <card.icon size={32} strokeWidth={1.5} />
                  <span className="text-sm font-medium">{card.shortTitle}</span>
                </a>
              </AnimateOnScroll>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
