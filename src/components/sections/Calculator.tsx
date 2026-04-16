"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { ArrowRight, Info } from "lucide-react";
import Container from "@/components/ui/Container";
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
  const [amountInput, setAmountInput] = useState<string | null>(null);
  const [term, setTerm] = useState(Math.round((minTerm + maxTerm) / 2 / 6) * 6);
  const rate = defaultRate;

  // Dropdown options in 6-month steps, clamped to [minTerm, maxTerm]
  const termOptions = useMemo(() => {
    const opts: number[] = [];
    for (let m = Math.max(6, minTerm); m <= maxTerm; m += 6) opts.push(m);
    if (opts[0] !== minTerm && minTerm < opts[0]) opts.unshift(minTerm);
    if (opts[opts.length - 1] !== maxTerm) opts.push(maxTerm);
    return opts;
  }, [minTerm, maxTerm]);

  const isBelowMin = amount < minAmount;

  const result = useMemo(() => {
    if (isBelowMin) {
      return { monthlyPayment: 0, totalPayment: 0, overpayment: 0 };
    }
    const monthlyRate = rate / 100;
    const monthlyPayment =
      (amount * monthlyRate * Math.pow(1 + monthlyRate, term)) /
      (Math.pow(1 + monthlyRate, term) - 1);
    const totalPayment = monthlyPayment * term;
    const overpayment = totalPayment - amount;
    return { monthlyPayment, totalPayment, overpayment };
  }, [amount, term, rate, isBelowMin]);

  // ГЭСВ не превышает 46% (фикс из данных кредитного продукта)
  const gesv = 46;

  function handleAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
    const digits = e.target.value.replace(/\D/g, "");
    setAmountInput(digits);
    if (!digits) {
      setAmount(0);
      return;
    }
    // Only clamp to max while typing — allow below min until blur
    const n = Math.min(maxAmount, Number(digits));
    setAmount(n);
  }

  function handleAmountBlur() {
    // On blur: clamp max only. Leave below-min state visible so user sees the warning.
    const n = Math.min(maxAmount, amount);
    setAmount(n);
    setAmountInput(null);
  }

  const termLabel = (m: number) => {
    const years = Math.floor(m / 12);
    const months = m % 12;
    const parts: string[] = [`${m} мес`];
    if (years > 0) {
      const y = years === 1 ? "1 год" : years >= 2 && years <= 4 ? `${years} года` : `${years} лет`;
      parts.push(`(${y}${months ? ` ${months} мес` : ""})`);
    }
    return parts.join(" ");
  };

  return (
    <section
      id="calculator"
      className="bg-neutral-50 py-16 sm:py-20"
    >
      <Container>
        <AnimateOnScroll>
          <div className="rounded-3xl bg-white p-6 ring-1 ring-neutral-100 sm:p-10 lg:p-12">
            <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
              Рассчитайте платёж
            </h2>

            {/* Top grid: inputs (left) + info (right) */}
            <div className="mt-8 grid gap-6 lg:grid-cols-2 lg:gap-8">
              {/* Inputs */}
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-neutral-600">
                    Срок финансирования
                  </label>
                  <div className="relative mt-2">
                    <select
                      value={term}
                      onChange={(e) => setTerm(Number(e.target.value))}
                      className="w-full appearance-none rounded-2xl border border-neutral-200 bg-white px-5 py-4 pr-12 text-base font-medium text-neutral-900 outline-none transition-colors focus:border-brand-500"
                    >
                      {termOptions.map((m) => (
                        <option key={m} value={m}>
                          {termLabel(m)}
                        </option>
                      ))}
                    </select>
                    <svg
                      className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-neutral-400"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-600">
                    Сумма финансирования
                  </label>
                  <div className="relative mt-2">
                    <input
                      type="text"
                      inputMode="numeric"
                      value={
                        amountInput !== null
                          ? amountInput
                            ? formatNumber(Number(amountInput))
                            : ""
                          : formatNumber(amount)
                      }
                      onChange={handleAmountChange}
                      onBlur={handleAmountBlur}
                      className={`w-full rounded-2xl border bg-white px-5 py-4 pr-12 text-base font-medium outline-none transition-colors ${
                        isBelowMin
                          ? "border-red-400 text-red-600 focus:border-red-500"
                          : "border-neutral-200 text-neutral-900 focus:border-brand-500"
                      }`}
                    />
                    <span
                      className={`pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 ${
                        isBelowMin ? "text-red-400" : "text-neutral-400"
                      }`}
                    >
                      ₸
                    </span>
                  </div>
                  <div className="relative mt-4 flex h-6 items-center">
                    <div className="absolute inset-x-0 h-1.5 rounded-full bg-neutral-200" />
                    <div
                      className="absolute left-0 h-1.5 rounded-full bg-brand-500"
                      style={{
                        width: `${((Math.max(minAmount, amount) - minAmount) / (maxAmount - minAmount)) * 100}%`,
                      }}
                    />
                    <input
                      type="range"
                      min={minAmount}
                      max={maxAmount}
                      step={200_000}
                      value={Math.max(minAmount, amount)}
                      onChange={(e) => {
                        const v = Number(e.target.value);
                        setAmount(v);
                        setAmountInput(null);
                      }}
                      className="relative z-10 h-6 w-full cursor-pointer appearance-none bg-transparent [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-[3px] [&::-moz-range-thumb]:border-brand-500 [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:shadow-md [&::-moz-range-track]:bg-transparent [&::-webkit-slider-runnable-track]:bg-transparent [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-[3px] [&::-webkit-slider-thumb]:border-brand-500 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-md"
                    />
                  </div>
                  <div
                    className={`mt-1.5 text-xs ${
                      isBelowMin ? "font-medium text-red-500" : "text-neutral-400"
                    }`}
                  >
                    {isBelowMin
                      ? `Минимальная сумма — ${formatNumber(minAmount)} ₸`
                      : `от ${formatNumber(minAmount)} до ${formatNumber(maxAmount)} ₸`}
                  </div>
                </div>
              </div>

              {/* Info block */}
              <div className="rounded-2xl border border-neutral-200 bg-white p-6 sm:p-7">
                <div className="flex items-center justify-between py-2">
                  <span className="text-neutral-700">Ставка в месяц</span>
                  <span className="text-base font-semibold text-neutral-900">
                    {rate.toLocaleString("ru-RU")}&nbsp;%
                  </span>
                </div>
                <div className="flex items-center justify-between border-t border-neutral-100 py-2 pt-4">
                  <span className="flex items-center gap-1.5 text-neutral-700">
                    ГЭСВ
                    <Info size={14} strokeWidth={2} className="text-neutral-400" />
                  </span>
                  <span className="text-base font-semibold text-neutral-900">
                    не&nbsp;более&nbsp;{gesv},00&nbsp;%
                  </span>
                </div>
                <div className="flex items-center justify-between border-t border-neutral-100 py-2 pt-4">
                  <span className="text-neutral-700">Переплата</span>
                  <span className={`text-base font-semibold ${isBelowMin ? "text-neutral-300" : "text-neutral-900"}`}>
                    {isBelowMin ? "—" : formatNumber(Math.round(result.overpayment))}&nbsp;₸
                  </span>
                </div>
                <div className="flex items-center justify-between border-t border-neutral-100 py-2 pt-4">
                  <span className="text-neutral-700">Срок</span>
                  <span className="text-base font-semibold text-neutral-900">
                    {term}&nbsp;мес
                  </span>
                </div>
              </div>
            </div>

            {/* Result: monthly payment */}
            <div className="mt-6 rounded-2xl bg-white p-5 ring-1 ring-neutral-100">
              <div className="text-xs text-neutral-500">Ежемесячный платёж</div>
              <div
                className={`mt-1 text-2xl font-bold sm:text-3xl ${
                  isBelowMin ? "text-neutral-300" : "text-brand-600"
                }`}
              >
                {isBelowMin ? (
                  "— ₸"
                ) : (
                  <>
                    <AnimatedNumber value={Math.round(result.monthlyPayment)} />&nbsp;₸
                  </>
                )}
              </div>
            </div>

            {/* CTA + disclaimer */}
            <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
              <a
                href={isBelowMin ? undefined : "#form"}
                aria-disabled={isBelowMin}
                onClick={(e) => {
                  if (isBelowMin) e.preventDefault();
                }}
                className={`inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 font-semibold text-white transition-colors sm:w-auto ${
                  isBelowMin
                    ? "cursor-not-allowed bg-neutral-300"
                    : "bg-brand-500 hover:bg-brand-600"
                }`}
              >
                Получить на этих условиях
                <ArrowRight size={18} strokeWidth={2.5} />
              </a>
              <p className="text-xs text-neutral-400 sm:max-w-sm sm:text-right">
                Предварительный расчёт. Не&nbsp;является публичной офертой.
              </p>
            </div>
          </div>
        </AnimateOnScroll>
      </Container>
    </section>
  );
}
