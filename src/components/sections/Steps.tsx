"use client";

import { FileText, Search, CheckCircle2, Banknote } from "lucide-react";
import { Step } from "@/lib/types";
import Container from "@/components/ui/Container";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

const STEP_ICONS = [FileText, Search, CheckCircle2, Banknote];

export default function Steps({ data }: { data: Step[] }) {
  return (
    <section className="bg-gradient-to-b from-brand-50 to-white py-16 sm:py-20">
      <Container>
        <AnimateOnScroll>
          <h2 className="text-center text-2xl font-bold sm:text-3xl">Как получить кредит</h2>
          <p className="mt-2 text-center text-neutral-500">
            Решение за 1 час, деньги — в день регистрации залога
          </p>
        </AnimateOnScroll>

        <div className="mt-12 grid gap-10 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4 lg:gap-6">
          {data.map((step, i) => {
            const Icon = STEP_ICONS[i] ?? FileText;
            return (
              <AnimateOnScroll key={step.number} delay={i * 0.12}>
                <div className="flex flex-col items-center text-center">
                  {/* Illustration squircle + number badge */}
                  <div className="relative">
                    <div className="flex h-24 w-24 items-center justify-center rounded-[22px] bg-gradient-to-br from-brand-200 via-brand-100 to-white shadow-sm ring-1 ring-brand-100 sm:h-28 sm:w-28 sm:rounded-[24px]">
                      <Icon size={44} strokeWidth={1.4} className="text-brand-600" />
                    </div>
                    <div className="absolute -left-1.5 -top-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-neutral-900 text-xs font-bold text-white shadow-md">
                      {step.number}
                    </div>
                  </div>

                  <h3 className="mt-6 text-lg font-bold leading-tight text-neutral-900">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-[240px] text-sm leading-relaxed text-neutral-500">
                    {step.description}
                  </p>
                  <div className="mt-3 text-xs font-medium text-brand-600">≈ {step.time}</div>
                </div>
              </AnimateOnScroll>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
