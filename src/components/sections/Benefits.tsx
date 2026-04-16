"use client";

import { Benefit } from "@/lib/types";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

export default function Benefits({ data }: { data: Benefit[] }) {
  return (
    <Section bg="gray">
      <Container>
        <AnimateOnScroll>
          <h2 className="text-center text-2xl font-bold sm:text-3xl">Преимущества</h2>
        </AnimateOnScroll>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((b, i) => (
            <AnimateOnScroll key={b.title} delay={i * 0.1}>
              <div className="flex h-full flex-col rounded-2xl bg-white p-6 transition-all duration-300 hover:-translate-y-1 sm:p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100">
                  <b.icon size={24} strokeWidth={1.8} className="text-brand-600" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{b.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral-500">{b.description}</p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </Container>
    </Section>
  );
}
