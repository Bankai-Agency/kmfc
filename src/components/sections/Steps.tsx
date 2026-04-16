"use client";

import { ClipboardPen, ScanSearch, CircleCheckBig, HandCoins } from "lucide-react";
import { Step } from "@/lib/types";
import Container from "@/components/ui/Container";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

const STEP_ICONS = [ClipboardPen, ScanSearch, CircleCheckBig, HandCoins];
const STEP_SW = [1.8, 1.8, 1.6, 1.6];

export default function Steps({ data }: { data: Step[] }) {
  return (
    <section className="bg-neutral-50 py-16 sm:py-20">
      <Container>
        <AnimateOnScroll>
          <h2 className="text-center text-2xl font-bold sm:text-3xl">Как получить кредит</h2>
          <p className="mt-2 text-center text-neutral-500">
            Решение за 1 час, деньги — в день регистрации залога
          </p>
        </AnimateOnScroll>

        <div className="relative mt-12 grid gap-10 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4 lg:gap-6">
          {/* Connecting line between steps (desktop only) */}
          <div className="pointer-events-none absolute left-0 right-0 top-12 hidden lg:block">
            <div className="mx-auto h-[1px] w-[65%] border-t border-dashed border-neutral-300" />
          </div>
          {data.map((step, i) => {
            const Icon = STEP_ICONS[i] ?? STEP_ICONS[0];
            return (
              <AnimateOnScroll key={step.number} delay={i * 0.12}>
                <div className="flex flex-col items-center text-center">
                  {/* Illustration squircle + number badge */}
                  <div className="relative z-10">
                    <div className="flex h-20 w-20 items-center justify-center rounded-[18px] bg-brand-100 sm:h-24 sm:w-24 sm:rounded-[20px]">
                      <Icon size={40} strokeWidth={STEP_SW[i] ?? 1.7} className="text-brand-600" />
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
