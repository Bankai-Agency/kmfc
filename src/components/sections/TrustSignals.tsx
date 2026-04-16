"use client";

import { Shield, Calendar, MapPin, TrendingUp } from "lucide-react";
import Container from "@/components/ui/Container";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

const SIGNALS = [
  { icon: Calendar, value: "10+", suffix: " лет", label: "на рынке Казахстана" },
  { icon: MapPin, value: "2", suffix: " офиса", label: "в Алматы и Актобе" },
  { icon: Shield, value: "", suffix: "Лицензия АРРФР", label: "официальная МФО" },
  { icon: TrendingUp, value: "до 70%", suffix: "", label: "от оценки залога для повторных клиентов" },
];

export default function TrustSignals() {
  return (
    <div className="border-y border-neutral-100 bg-neutral-50 py-8">
      <Container>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {SIGNALS.map((s) => (
            <div key={s.label} className="flex flex-col items-center rounded-2xl bg-white px-4 py-6 text-center ring-1 ring-neutral-100">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100">
                <s.icon size={20} strokeWidth={1.8} className="text-brand-600" />
              </div>
              {s.value ? (
                <AnimatedCounter
                  value={`${s.value}${s.suffix}`}
                  className="mt-3 text-2xl font-bold text-neutral-800"
                />
              ) : (
                <div className="mt-3 text-base font-bold text-neutral-800">{s.suffix}</div>
              )}
              <div className="mt-1 text-xs text-neutral-500">{s.label}</div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
