"use client";

import { useState, useCallback, FormEvent, useRef, useEffect } from "react";
import {
  ArrowRight,
  ArrowLeft,
  Loader2,
  CheckCircle,
  Clock,
  Phone,
  Shield,
} from "lucide-react";
import { CollateralType } from "@/lib/types";
import { PAGES_DATA } from "@/lib/data";
import { formatPhoneKz, stripPhoneToDigits } from "@/lib/phone";
import Container from "@/components/ui/Container";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

interface LeadFormProps {
  collateralType: CollateralType;
}

const TOTAL_STEPS = 3;

const AMOUNT_OPTIONS = [
  { value: "1-5 млн ₸", label: "1-5 млн ₸" },
  { value: "5-15 млн ₸", label: "5-15 млн ₸" },
  { value: "15-40 млн ₸", label: "15-40 млн ₸" },
  { value: "40-86 млн ₸", label: "40-86 млн ₸" },
];

const URGENCY_OPTIONS = [
  { value: "Сегодня-завтра", label: "Сегодня-завтра" },
  { value: "В течение недели", label: "В течение недели" },
  { value: "Не срочно", label: "Не срочно, изучаю варианты" },
];

const STEP_TITLES = [
  "Какая сумма вам нужна?",
  "Как срочно нужны деньги?",
  "Оставьте контакты",
];

function getUtmParams(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"].forEach((key) => {
    const val = params.get(key);
    if (val) utm[key] = val;
  });
  return utm;
}

export default function LeadForm({ collateralType }: LeadFormProps) {
  const offerBadge = PAGES_DATA[collateralType]?.hero.offer;

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({
    amount: "",
    urgency: "",
  });
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Slide direction: 1 = forward, -1 = backward
  const [slideDir, setSlideDir] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [renderStep, setRenderStep] = useState(0);

  const autoAdvanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    return () => {
      if (autoAdvanceTimer.current) clearTimeout(autoAdvanceTimer.current);
    };
  }, []);

  const animateToStep = useCallback(
    (nextStep: number) => {
      if (isAnimating) return;
      const dir = nextStep > step ? 1 : -1;
      setSlideDir(dir);
      setIsAnimating(true);

      // After exit animation, swap rendered step and enter
      setTimeout(() => {
        setRenderStep(nextStep);
        setStep(nextStep);
        setIsAnimating(false);
      }, 200);
    },
    [step, isAnimating],
  );

  const goBack = useCallback(() => {
    if (autoAdvanceTimer.current) {
      clearTimeout(autoAdvanceTimer.current);
      autoAdvanceTimer.current = null;
    }
    if (step > 0) animateToStep(step - 1);
  }, [step, animateToStep]);

  const selectAmount = useCallback((value: string) => {
    setAnswers((prev) => ({ ...prev, amount: value }));
  }, []);

  const selectUrgency = useCallback((value: string) => {
    setAnswers((prev) => ({ ...prev, urgency: value }));
  }, []);

  const goNext = useCallback(() => {
    if (step < TOTAL_STEPS - 1) animateToStep(step + 1);
  }, [step, animateToStep]);

  const canAdvance =
    (step === 0 && !!answers.amount) || (step === 1 && !!answers.urgency);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const payload = {
      name,
      phone: stripPhoneToDigits(phone),
      collateral_type: collateralType,
      amount: answers.amount,
      urgency: answers.urgency,
      source: "quiz_form",
      ...getUtmParams(),
    };

    // TODO: replace with real API call (Telegram bot / CRM)
    console.log("Quiz lead:", payload);

    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }).catch(() => {
        // Silently handle network errors — form still shows success
      });
    } catch {
      // fallback
    }

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1000);
  }

  // --- Success state ---
  if (submitted) {
    return (
      <section id="form" className="bg-[rgba(179,238,245,0.5)] pb-16 pt-10 sm:pb-20 sm:pt-12">
        <Container>
          <div>
            <div className="rounded-3xl bg-gradient-to-b from-brand-50 to-brand-100/50 p-8 text-center ring-1 ring-brand-100 sm:p-12 animate-[fadeIn_0.5s_ease]">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-brand-500/10">
                <CheckCircle size={40} strokeWidth={1.5} className="text-brand-500" />
              </div>
              <h2 className="mt-6 text-2xl font-bold text-neutral-900 sm:text-3xl">
                Заявка принята!
              </h2>

              <div className="mx-auto mt-8 max-w-sm space-y-4 text-left">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white ring-1 ring-brand-100">
                    <Clock size={20} strokeWidth={1.8} className="text-brand-500" />
                  </div>
                  <span className="text-neutral-700">Перезвоним в ближайшее время</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white ring-1 ring-brand-100">
                    <Shield size={20} strokeWidth={1.8} className="text-brand-500" />
                  </div>
                  <span className="text-neutral-700">Ваши данные защищены</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white ring-1 ring-brand-100">
                    <Phone size={20} strokeWidth={1.8} className="text-brand-500" />
                  </div>
                  <a
                    href="tel:+77073555565"
                    className="text-neutral-900 underline underline-offset-2 transition-opacity hover:opacity-80"
                  >
                    +7 (707) 355-55-65
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  // --- Slide animation styles ---
  const exitTransform = slideDir > 0 ? "translateX(-40px)" : "translateX(40px)";
  const enterFrom = slideDir > 0 ? "translateX(40px)" : "translateX(-40px)";

  const stepStyle: React.CSSProperties = {
    transition: "opacity 0.2s ease, transform 0.2s ease",
    opacity: isAnimating ? 0 : 1,
    transform: isAnimating ? (renderStep === step ? exitTransform : enterFrom) : "translateX(0)",
  };

  const progressPct = ((step + 1) / TOTAL_STEPS) * 100;

  return (
    <section id="form" className="bg-[rgba(179,238,245,0.5)] pb-16 pt-10 sm:pb-20 sm:pt-12">
      <Container>
        <AnimateOnScroll>
          <div>
            {/* Offer badge — показываем только если в data.ts задан hero.offer */}
            {offerBadge && (
              <div className="mb-6 text-center">
                <span className="inline-block rounded-full bg-accent-400 px-4 py-1.5 text-sm font-medium text-neutral-900">
                  {offerBadge}
                </span>
              </div>
            )}

            <div className="rounded-3xl bg-white p-6 ring-1 ring-neutral-100 sm:p-10">
              {/* Header: progress bar + step counter */}
              <div className="flex items-center gap-4">
                <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/80">
                  <div
                    className="h-full rounded-full bg-brand-500 transition-all duration-300"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
                <div className="shrink-0 text-sm font-medium text-neutral-500">
                  Шаг {step + 1} из {TOTAL_STEPS}
                </div>
              </div>

              {/* Step title */}
              <h2 className="mt-8 max-w-md text-2xl font-bold text-neutral-900 sm:text-[28px] sm:leading-tight">
                {STEP_TITLES[step]}
              </h2>

              {/* Steps container */}
              <div className="mt-8" style={stepStyle}>
                {/* Step 0: Amount */}
                {renderStep === 0 && (
                  <div className="space-y-3">
                    {AMOUNT_OPTIONS.map((opt) => {
                      const isSelected = answers.amount === opt.value;
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => selectAmount(opt.value)}
                          className={`flex w-full items-center gap-4 rounded-2xl px-5 py-4 text-left transition-all ${
                            isSelected
                              ? "bg-brand-50 ring-2 ring-brand-500"
                              : "bg-neutral-50 hover:ring-1 hover:ring-brand-200"
                          }`}
                        >
                          <span
                            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                              isSelected ? "border-brand-500" : "border-neutral-300"
                            }`}
                          >
                            {isSelected && (
                              <span className="h-2.5 w-2.5 rounded-full bg-brand-500" />
                            )}
                          </span>
                          <span className="text-base font-medium text-neutral-900">
                            {opt.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Step 1: Urgency */}
                {renderStep === 1 && (
                  <div className="space-y-3">
                    {URGENCY_OPTIONS.map((opt) => {
                      const isSelected = answers.urgency === opt.value;
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => selectUrgency(opt.value)}
                          className={`flex w-full items-center gap-4 rounded-2xl px-5 py-4 text-left transition-all ${
                            isSelected
                              ? "bg-brand-50 ring-2 ring-brand-500"
                              : "bg-neutral-50 hover:ring-1 hover:ring-brand-200"
                          }`}
                        >
                          <span
                            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                              isSelected ? "border-brand-500" : "border-neutral-300"
                            }`}
                          >
                            {isSelected && (
                              <span className="h-2.5 w-2.5 rounded-full bg-brand-500" />
                            )}
                          </span>
                          <span className="text-base font-medium text-neutral-900">
                            {opt.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Step 2: Contact form */}
                {renderStep === 2 && (
                  <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                    <div className="rounded-2xl bg-neutral-50 p-5">
                      <label
                        htmlFor="quiz-name"
                        className="block text-xs font-medium text-neutral-500"
                      >
                        Ваше имя
                      </label>
                      <input
                        id="quiz-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Введите имя"
                        required
                        className="mt-1 w-full border-0 bg-transparent p-0 text-base font-medium text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-0"
                      />
                    </div>

                    <div className="rounded-2xl bg-neutral-50 p-5">
                      <label
                        htmlFor="quiz-phone"
                        className="block text-xs font-medium text-neutral-500"
                      >
                        Телефон
                      </label>
                      <input
                        id="quiz-phone"
                        type="tel"
                        inputMode="tel"
                        value={phone}
                        onChange={(e) => setPhone(formatPhoneKz(e.target.value))}
                        placeholder="+7 (___) ___-__-__"
                        required
                        className="mt-1 w-full border-0 bg-transparent p-0 text-base font-medium text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-0"
                      />
                    </div>

                    <p className="text-xs text-neutral-500">
                      Нажимая кнопку, вы даёте согласие на обработку персональных данных
                    </p>
                  </form>
                )}
              </div>

              {/* Footer: Back + Next/Submit */}
              <div className="mt-8 flex items-center justify-between gap-4">
                {step > 0 ? (
                  <button
                    type="button"
                    onClick={goBack}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-500 transition-colors hover:text-neutral-900"
                  >
                    <ArrowLeft size={16} strokeWidth={2} />
                    Назад
                  </button>
                ) : (
                  <span />
                )}

                {step < TOTAL_STEPS - 1 ? (
                  <button
                    type="button"
                    onClick={goNext}
                    disabled={!canAdvance}
                    className="inline-flex items-center justify-center rounded-xl bg-brand-500 px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Далее
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => formRef.current?.requestSubmit()}
                    disabled={loading || !name || !phone}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-500 px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {loading ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Отправка...
                      </>
                    ) : (
                      <>
                        Получить предложение
                        <ArrowRight size={18} strokeWidth={2} />
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </Container>
    </section>
  );
}
