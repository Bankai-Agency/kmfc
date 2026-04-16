"use client";

import { FormEvent, useState } from "react";
import { Loader2, CheckCircle, Phone, Shield } from "lucide-react";
import { CollateralType } from "@/lib/types";
import { CONTACT_INFO } from "@/lib/data";
import { formatPhoneKz, stripPhoneToDigits } from "@/lib/phone";
import Container from "@/components/ui/Container";

export default function HeroForm({ collateralType }: { collateralType: CollateralType }) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);

    const params = new URLSearchParams(window.location.search);
    const body: Record<string, string> = {
      name: formData.get("name") as string,
      phone: stripPhoneToDigits(phone),
      collateral_type: collateralType,
      source: "hero_form",
    };
    ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"].forEach((key) => {
      const val = params.get(key);
      if (val) body[key] = val;
    });

    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch {
      // still show success
    }

    setLoading(false);
    setSubmitted(true);
  }

  return (
    <section className="bg-neutral-50 py-4 sm:py-6">
      <Container>
        <div className="rounded-2xl bg-neutral-900 px-6 py-6 sm:px-8 sm:py-7">
          {submitted ? (
            <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-center sm:gap-6 sm:text-left">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-500/10">
                <CheckCircle size={24} strokeWidth={2} className="text-green-600" />
              </div>
              <div>
                <p className="text-lg font-bold text-neutral-900">Заявка принята — перезвоним за 15 минут</p>
                <a
                  href={`tel:${CONTACT_INFO.phones[0].replace(/[^+\d]/g, "")}`}
                  className="mt-1 inline-flex items-center gap-1.5 text-sm text-neutral-500 transition-colors hover:text-neutral-900"
                >
                  <Phone size={14} strokeWidth={2} />
                  Или позвоните сами: {CONTACT_INFO.phones[0]}
                </a>
              </div>
            </div>
          ) : (
            <>
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
                {/* Left: heading */}
                <div className="shrink-0">
                  <h3 className="text-lg font-bold text-white sm:text-xl">Узнайте свои условия</h3>
                  <p className="mt-1 max-w-sm text-sm text-white/60">
                    Оставьте номер — перезвоним и&nbsp;рассчитаем персональное предложение
                  </p>
                </div>

                {/* Right: form */}
                <div className="w-full lg:max-w-md">
                  <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-end">
                    <div className="flex-1">
                      <label className="mb-1 block text-xs font-medium text-white/50">Телефон</label>
                      <input
                        type="tel"
                        name="phone"
                        inputMode="tel"
                        placeholder="+7 (000) 000-00-00"
                        value={phone}
                        onChange={(e) => setPhone(formatPhoneKz(e.target.value))}
                        required
                        className="w-full rounded-xl border-0 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/40 transition-colors focus:outline-none focus:ring-1 focus:ring-brand-400/30"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-brand-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-600 disabled:opacity-70"
                    >
                      {loading ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          Отправка...
                        </>
                      ) : (
                        "Отправить заявку"
                      )}
                    </button>
                  </form>
                  <p className="mt-3 text-xs text-white/40">
                    Нажимая на кнопку, я даю своё согласие на взаимодействие и&nbsp;обработку персональных данных
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </Container>
    </section>
  );
}
