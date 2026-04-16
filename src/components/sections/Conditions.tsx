"use client";

import { ConditionsData } from "@/lib/types";
import { CheckCircle, MapPin } from "lucide-react";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

const CARD_STYLE =
  "relative h-full rounded-3xl bg-white p-8 ring-1 ring-neutral-100";
const CARD_BASE = `${CARD_STYLE} overflow-hidden`;

// Bento placement:
// item 0 — tall left (col 1, rows 1-2)
// item 1 — tall middle (col 2, rows 1-2)
// item 2 — small top-right (col 3, row 1)
// item 3 — small bottom-right (col 3, row 2)
const BENTO_CLASSES = [
  "lg:col-span-1 lg:row-span-2",
  "lg:col-span-1 lg:row-span-2",
  "lg:col-span-1",
  "lg:col-span-1",
];

// Keep digit groups ("1 000 000") and number+currency ("86 000 000 ₸") unbreakable,
// but allow breaks at word boundaries like "от ... до ...".
function nbspNumbers(s: string) {
  return s.replace(/(\d) (?=[\d₸])/g, "$1\u00A0");
}

function ValueLabel({
  value,
  label,
  size = "md",
  align = "center",
}: {
  value: string;
  label: string;
  size?: "md" | "lg";
  align?: "center" | "left";
}) {
  return (
    <div className={align === "center" ? "text-center" : "text-left"}>
      <div
        className={`font-bold leading-[1.15] tracking-tight text-neutral-900 ${
          size === "lg" ? "text-[28px] sm:text-[34px]" : "text-[26px] sm:text-[30px]"
        }`}
      >
        {nbspNumbers(value)}
      </div>
      <div className="mt-2 text-base text-neutral-500">{label}</div>
    </div>
  );
}

export default function Conditions({ data }: { data: ConditionsData }) {
  return (
    <Section bg="gray">
      <Container>
        <AnimateOnScroll>
          <h2 className="text-center text-2xl font-bold sm:text-3xl">Условия кредитования</h2>
          <div className="mt-2 flex items-center justify-center gap-2 text-sm text-neutral-500">
            <MapPin size={14} strokeWidth={2} className="text-brand-500" />
            Работаем в Алматы и Актобе
          </div>
        </AnimateOnScroll>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:auto-rows-[160px] lg:grid-cols-3">
          {data.items.map((item, i) => (
            <AnimateOnScroll
              key={item.label}
              delay={i * 0.1}
              className={`h-full ${BENTO_CLASSES[i]}`}
            >
              {/* Big: vertical, image top + text bottom */}
              {i === 0 && (
                <div className={`${CARD_BASE} flex flex-col`}>
                  {/* Blur circle */}
                  <div className="absolute left-[12%] top-[-30%] h-[265px] w-[265px] rounded-full bg-brand-300/15 blur-[80px]" />
                  {/* Illustration */}
                  <div className="relative z-10 flex min-h-0 flex-1 items-center justify-center">
                    <img
                      src="/images/conditions-amount.png"
                      alt="Сумма кредита"
                      className="max-h-[68%] max-w-none object-contain drop-shadow-lg"
                    />
                  </div>
                  <div className="relative z-10 shrink-0 pb-2">
                    <ValueLabel value={item.value} label={item.label} size="lg" />
                  </div>
                </div>
              )}

              {/* Tall middle: vertical, image top + text bottom */}
              {i === 1 && (
                <div className={`${CARD_BASE} flex flex-col`}>
                  {/* Blur circle */}
                  <div className="absolute left-[12%] top-[-30%] h-[265px] w-[265px] rounded-full bg-brand-300/15 blur-[80px]" />
                  {/* Illustration */}
                  <div className="relative z-10 flex min-h-0 flex-1 items-center justify-center">
                    <img
                      src="/images/conditions-rate.png"
                      alt="Процентная ставка"
                      className="max-h-[93%] max-w-none object-contain drop-shadow-lg"
                    />
                  </div>
                  <div className="relative z-10 shrink-0 pb-2">
                    <ValueLabel value={item.value} label={item.label} size="lg" />
                  </div>
                </div>
              )}

              {/* Small cards with blur circles */}
              {i >= 2 && (
                <div className={`${CARD_BASE} flex flex-col items-center justify-center`}>
                  <div className="absolute right-[-40%] top-[-60%] h-[265px] w-[265px] rounded-full bg-brand-300/15 blur-[80px]" />
                  <div className="relative z-10">
                    <ValueLabel value={item.value} label={item.label} size="md" />
                  </div>
                </div>
              )}
            </AnimateOnScroll>
          ))}
        </div>

        {/* Requirements */}
        <AnimateOnScroll delay={0.3}>
          <div className="mt-4 rounded-3xl bg-white p-8 ring-1 ring-neutral-100 sm:p-10">
            <h3 className="text-lg font-semibold">Требования к залогу</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {data.requirements.map((req) => (
                <div key={req} className="flex items-start gap-3">
                  <CheckCircle size={20} strokeWidth={2} className="mt-0.5 shrink-0 text-brand-500" />
                  <span className="text-neutral-600">{req}</span>
                </div>
              ))}
            </div>
          </div>
        </AnimateOnScroll>
      </Container>
    </Section>
  );
}
