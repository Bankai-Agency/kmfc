"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

interface CalculatorProps {
  minAmount: number;
  maxAmount: number;
  minTerm: number;
  maxTerm: number;
  defaultRate: number;
}

function formatNumber(n: number): string {
  return n.toLocaleString("ru-RU");
}

function AnimatedNumber({ value }: { value: number }) {
  const [display, setDisplay] = useState(value);
  const prev = useRef(value);

  useEffect(() => {
    if (prev.current === value) return;
    const start = prev.current;
    const diff = value - start;
    const duration = 300;
    const startTime = performance.now();

    function animate(time: number) {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(start + diff * eased));
      if (progress < 1) requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
    prev.current = value;
  }, [value]);

  return <>{formatNumber(display)}</>;
}

export default function Calculator({
  minAmount = 500_000,
  maxAmount = 30_000_000,
  minTerm = 3,
  maxTerm = 36,
  defaultRate = 3,
}: CalculatorProps) {
  const [amount, setAmount] = useState(Math.round((minAmount + maxAmount) / 2));
  const [term, setTerm] = useState(Math.round((minTerm + maxTerm) / 2));
  const [rate] = useState(defaultRate);

  const result = useMemo(() => {
    const monthlyRate = rate / 100;
    const monthlyPayment = (amount * monthlyRate * Math.pow(1 + monthlyRate, term)) / (Math.pow(1 + monthlyRate, term) - 1);
    const totalPayment = monthlyPayment * term;
    const overpayment = totalPayment - amount;
    return { monthlyPayment, totalPayment, overpayment };
  }, [amount, term, rate]);

  const amountPercent = ((amount - minAmount) / (maxAmount - minAmount)) * 100;
  const termPercent = ((term - minTerm) / (maxTerm - minTerm)) * 100;

  return (
    <Section bg="white" id="calculator" spacing="lg">
      <Container>
        <AnimateOnScroll>
          <h2 className="text-center text-2xl font-bold sm:text-3xl">Рассчитайте платёж</h2>
          <p className="mt-2 text-center text-neutral-500">Узнайте примерный ежемесячный платёж по кредиту</p>
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.2}>
          <div className="mx-auto mt-10 max-w-4xl">
            <div className="grid gap-8 lg:grid-cols-5">
              <div className="space-y-8 lg:col-span-3">
                <div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-neutral-600">Сумма кредита</label>
                    <span className="text-lg font-bold text-brand-500">{formatNumber(amount)} ₸</span>
                  </div>
                  <input
                    type="range"
                    min={minAmount}
                    max={maxAmount}
                    step={100_000}
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full bg-neutral-200 accent-brand-500"
                    style={{
                      background: `linear-gradient(to right, #00B4CD 0%, #00B4CD ${amountPercent}%, #e9ecef ${amountPercent}%, #e9ecef 100%)`,
                    }}
                  />
                  <div className="mt-1 flex justify-between text-xs text-neutral-400">
                    <span>{formatNumber(minAmount)} ₸</span>
                    <span>{formatNumber(maxAmount)} ₸</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-neutral-600">Срок кредита</label>
                    <span className="text-lg font-bold text-brand-500">{term} мес</span>
                  </div>
                  <input
                    type="range"
                    min={minTerm}
                    max={maxTerm}
                    step={1}
                    value={term}
                    onChange={(e) => setTerm(Number(e.target.value))}
                    className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full bg-neutral-200 accent-brand-500"
                    style={{
                      background: `linear-gradient(to right, #00B4CD 0%, #00B4CD ${termPercent}%, #e9ecef ${termPercent}%, #e9ecef 100%)`,
                    }}
                  />
                  <div className="mt-1 flex justify-between text-xs text-neutral-400">
                    <span>{minTerm} мес</span>
                    <span>{maxTerm} мес</span>
                  </div>
                </div>

              </div>

              <div className="flex flex-col justify-between rounded-2xl bg-brand-500 p-6 text-white lg:col-span-2">
                <div>
                  <div className="text-sm text-brand-100">Ежемесячный платёж</div>
                  <div className="mt-1 text-3xl font-bold transition-all duration-300">
                    <AnimatedNumber value={Math.round(result.monthlyPayment)} /> ₸
                  </div>
                </div>
                <div className="mt-6 space-y-3 border-t border-white/20 pt-6">
                  <div className="flex justify-between">
                    <span className="text-sm text-brand-100">Сумма кредита</span>
                    <span className="font-medium">{formatNumber(amount)} ₸</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-brand-100">Всего выплатите</span>
                    <span className="font-medium"><AnimatedNumber value={Math.round(result.totalPayment)} /> ₸</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-brand-100">Переплата</span>
                    <span className="font-medium"><AnimatedNumber value={Math.round(result.overpayment)} /> ₸</span>
                  </div>
                </div>
                <a
                  href="#form"
                  className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-accent-400 px-6 py-3 font-semibold text-neutral-900 transition-colors hover:bg-accent-500"
                >
                  Получить на этих условиях
                  <ArrowRight size={18} strokeWidth={2} />
                </a>
              </div>
            </div>

            <p className="mt-4 text-center text-xs text-neutral-400">
              Расчёт является предварительным. Точные условия определяются после оценки залогового имущества.
            </p>
          </div>
        </AnimateOnScroll>
      </Container>
    </Section>
  );
}
