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
import Section from "@/components/ui/Section";
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
        // Allow enter animation in next frame
        requestAnimationFrame(() => {
          setIsAnimating(false);
        });
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

  const selectAmount = useCallback(
    (value: string) => {
      setAnswers((prev) => ({ ...prev, amount: value }));
      autoAdvanceTimer.current = setTimeout(() => {
        animateToStep(1);
      }, 300);
    },
    [animateToStep],
  );

  const selectUrgency = useCallback(
    (value: string) => {
      setAnswers((prev) => ({ ...prev, urgency: value }));
      autoAdvanceTimer.current = setTimeout(() => {
        animateToStep(2);
      }, 300);
    },
    [animateToStep],
  );

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
      <Section bg="brand" id="form">
        <Container>
          <div className="mx-auto max-w-md text-center animate-[fadeIn_0.5s_ease]">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white/20">
              <CheckCircle size={40} strokeWidth={1.5} className="text-white" />
            </div>
            <h2 className="mt-6 text-2xl font-bold sm:text-3xl">Заявка принята!</h2>

            <div className="mt-8 space-y-4 text-left">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15">
                  <Clock size={20} strokeWidth={1.8} className="text-white" />
                </div>
                <span className="text-brand-100">Перезвоним в ближайшее время</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15">
                  <Shield size={20} strokeWidth={1.8} className="text-white" />
                </div>
                <span className="text-brand-100">Ваши данные защищены</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15">
                  <Phone size={20} strokeWidth={1.8} className="text-white" />
                </div>
                <a
                  href="tel:+77073555565"
                  className="text-white underline underline-offset-2 transition-opacity hover:opacity-80"
                >
                  +7 (707) 355-55-65
                </a>
              </div>
            </div>
          </div>
        </Container>
      </Section>
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

  return (
    <Section bg="brand" id="form">
      <Container>
        <AnimateOnScroll>
          <div className="mx-auto max-w-2xl">
            {/* Offer badge — показываем только если в data.ts задан hero.offer */}
            {offerBadge && (
              <div className="mb-6 text-center">
                <span className="inline-block rounded-full bg-accent-400 px-4 py-1.5 text-sm font-medium text-neutral-900">
                  {offerBadge}
                </span>
              </div>
            )}

            {/* Progress dots */}
            <div className="mb-8 flex items-center justify-center gap-2">
              {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      i === step
                        ? "w-8 bg-white"
                        : i < step
                          ? "w-2.5 bg-white/70"
                          : "w-2.5 bg-white/25"
                    }`}
                  />
                </div>
              ))}
            </div>

            {/* Step title */}
            <h2 className="mb-8 text-center text-2xl font-bold sm:text-3xl">
              {STEP_TITLES[step]}
            </h2>

            {/* Steps container */}
            <div style={stepStyle}>
              {/* Step 0: Amount */}
              {renderStep === 0 && (
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {AMOUNT_OPTIONS.map((opt) => {
                    const isSelected = answers.amount === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => selectAmount(opt.value)}
                        className={`rounded-2xl p-6 text-center text-sm font-medium transition-all duration-200 sm:text-base ${
                          isSelected
                            ? "bg-white/20 ring-2 ring-white"
                            : "bg-white/10 hover:bg-white/15"
                        }`}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Step 1: Urgency */}
              {renderStep === 1 && (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
                  {URGENCY_OPTIONS.map((opt) => {
                    const isSelected = answers.urgency === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => selectUrgency(opt.value)}
                        className={`rounded-2xl p-6 text-center text-sm font-medium transition-all duration-200 sm:text-base ${
                          isSelected
                            ? "bg-white/20 ring-2 ring-white"
                            : "bg-white/10 hover:bg-white/15"
                        }`}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Step 2: Contact form */}
              {renderStep === 2 && (
                <div className="mx-auto max-w-md">
                  <div className="rounded-2xl bg-white p-6 shadow-xl sm:p-8">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label
                          htmlFor="quiz-name"
                          className="mb-1 block text-sm font-medium text-neutral-700"
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
                          className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-neutral-900 placeholder-neutral-400 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-400/20"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="quiz-phone"
                          className="mb-1 block text-sm font-medium text-neutral-700"
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
                          className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-neutral-900 placeholder-neutral-400 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-400/20"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-500 py-3.5 font-semibold text-white transition-colors hover:bg-brand-600 disabled:opacity-70"
                      >
                        {loading ? (
                          <>
                            <Loader2 size={20} className="animate-spin" />
                            Отправка...
                          </>
                        ) : (
                          <>
                            Получить предложение
                            <ArrowRight size={18} strokeWidth={2} />
                          </>
                        )}
                      </button>

                      <p className="text-center text-xs text-neutral-400">
                        Нажимая кнопку, вы даёте согласие на обработку персональных данных
                      </p>
                    </form>
                  </div>
                </div>
              )}
            </div>

            {/* Back button */}
            {step > 0 && !isAnimating && (
              <div className="mt-6 text-center">
                <button
                  type="button"
                  onClick={goBack}
                  className="inline-flex items-center gap-1.5 text-sm text-white/70 transition-colors hover:text-white"
                >
                  <ArrowLeft size={16} strokeWidth={1.8} />
                  Назад
                </button>
              </div>
            )}
          </div>
        </AnimateOnScroll>
      </Container>
    </Section>
  );
}
