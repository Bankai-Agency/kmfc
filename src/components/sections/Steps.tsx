"use client";

import { Clock } from "lucide-react";
import { Step } from "@/lib/types";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

export default function Steps({ data }: { data: Step[] }) {
  return (
    <Section bg="white">
      <Container>
        <AnimateOnScroll>
          <h2 className="text-center text-2xl font-bold sm:text-3xl">Как получить кредит</h2>
          <p className="mt-2 text-center text-neutral-500">Весь процесс занимает от 1 рабочего дня</p>
        </AnimateOnScroll>

        <div className="relative mt-10">
          {/* Connector line (desktop) */}
          <div className="absolute left-[calc(12.5%)] right-[calc(12.5%)] top-7 hidden h-0.5 bg-gradient-to-r from-brand-200 via-brand-400 to-brand-500 lg:block" />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {data.map((step, i) => (
              <AnimateOnScroll key={step.number} delay={i * 0.15}>
                <div className="relative text-center">
                  <div className="relative z-10 mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-500 text-xl font-bold text-white shadow-md shadow-brand-500/30">
                    {step.number}
                  </div>
                  <h3 className="mt-4 text-base font-semibold">{step.title}</h3>
                  <p className="mt-1 text-sm text-neutral-500">{step.description}</p>
                  <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-600">
                    <Clock size={12} strokeWidth={2} />
                    {step.time}
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
