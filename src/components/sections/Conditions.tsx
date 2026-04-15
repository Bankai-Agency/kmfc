"use client";

import { ConditionsData } from "@/lib/types";
import { CheckCircle, MapPin } from "lucide-react";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";

const CARD_BASE =
  "relative h-full overflow-hidden rounded-3xl bg-white p-8 shadow-[0_4px_24px_rgba(15,23,42,0.06)] ring-1 ring-neutral-100";

// Bento placement:
// item 0 — big left (col 1, rows 1-2)
// item 1 — wide top-right (cols 2-3, row 1)
// item 2 — small bottom-right 1 (col 2, row 2)
// item 3 — small bottom-right 2 (col 3, row 2)
const BENTO_CLASSES = [
  "lg:col-span-1 lg:row-span-2",
  "lg:col-span-2",
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
          size === "lg" ? "text-[26px] sm:text-3xl" : "text-2xl sm:text-[26px]"
        }`}
      >
        {nbspNumbers(value)}
      </div>
      <div className="mt-2 text-sm text-neutral-500">{label}</div>
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

        <div className="mt-10 grid auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.items.map((item, i) => (
            <AnimateOnScroll
              key={item.label}
              delay={i * 0.1}
              className={`h-full ${BENTO_CLASSES[i]}`}
            >
              {/* Big: vertical, image fills top, text centered at bottom */}
              {i === 0 && (
                <div className={`${CARD_BASE} flex flex-col`}>
                  <div className="flex min-h-[160px] flex-1 items-center justify-center">
                    <ImagePlaceholder
                      label="Сумма кредита"
                      aspectRatio=""
                      className="h-full w-full"
                    />
                  </div>
                  <div className="pt-8">
                    <ValueLabel value={item.value} label={item.label} size="lg" />
                  </div>
                </div>
              )}

              {/* Wide: horizontal, text left + image right */}
              {i === 1 && (
                <div className={`${CARD_BASE} flex items-center gap-6`}>
                  <div className="flex-1">
                    <ValueLabel value={item.value} label={item.label} size="md" align="left" />
                  </div>
                  <div className="h-full max-h-[160px] w-40 shrink-0 sm:w-48">
                    <ImagePlaceholder
                      label="Процентная ставка"
                      aspectRatio=""
                      className="h-full w-full"
                    />
                  </div>
                </div>
              )}

              {/* Small: vertical, centered text only */}
              {i >= 2 && (
                <div className={`${CARD_BASE} flex flex-col items-center justify-center`}>
                  <ValueLabel value={item.value} label={item.label} size="md" />
                </div>
              )}
            </AnimateOnScroll>
          ))}
        </div>

        {/* Requirements */}
        <AnimateOnScroll delay={0.3}>
          <div className="mt-4 rounded-3xl bg-white p-8 shadow-[0_4px_24px_rgba(15,23,42,0.06)] ring-1 ring-neutral-100 sm:p-10">
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
