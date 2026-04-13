"use client";

import { ConditionsData } from "@/lib/types";
import { Banknote, Percent, Calendar, Clock, CheckCircle, MapPin } from "lucide-react";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

const CONDITION_ICONS = [Banknote, Percent, Calendar, Clock];
const CONDITION_COLORS = [
  "bg-brand-500 text-white",
  "bg-accent-400 text-neutral-900",
  "bg-brand-500 text-white",
  "bg-accent-400 text-neutral-900",
];

export default function Conditions({ data }: { data: ConditionsData }) {
  return (
    <Section bg="white">
      <Container>
        <AnimateOnScroll>
          <h2 className="text-center text-2xl font-bold sm:text-3xl">Условия кредитования</h2>
          <div className="mt-2 flex items-center justify-center gap-2 text-sm text-neutral-500">
            <MapPin size={14} strokeWidth={2} className="text-brand-500" />
            Работаем в Алматы и Актобе
          </div>
        </AnimateOnScroll>

        {/* Main conditions grid - card style */}
        <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {data.items.map((item, i) => {
            const Icon = CONDITION_ICONS[i];
            return (
              <AnimateOnScroll key={item.label} delay={i * 0.1}>
                <div className="relative overflow-hidden rounded-2xl bg-neutral-50 p-6 sm:p-8">
                  <div className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl ${CONDITION_COLORS[i]}`}>
                    <Icon size={22} strokeWidth={1.8} />
                  </div>
                  <div className="text-xs font-medium uppercase tracking-wider text-neutral-400">{item.label}</div>
                  <div className="mt-1 text-lg font-bold text-neutral-800 sm:text-xl">{item.value}</div>
                </div>
              </AnimateOnScroll>
            );
          })}
        </div>

        {/* Requirements */}
        <AnimateOnScroll delay={0.3}>
          <div className="mt-8 rounded-2xl border border-neutral-100 bg-neutral-50 p-6 sm:p-8">
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
