"use client";

import { FormEvent, useState } from "react";
import { Loader2, CheckCircle, Phone, Shield } from "lucide-react";
import { CollateralType } from "@/lib/types";
import { CONTACT_INFO } from "@/lib/data";
import Container from "@/components/ui/Container";

export default function HeroForm({ collateralType }: { collateralType: CollateralType }) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);

    const params = new URLSearchParams(window.location.search);
    const body: Record<string, string> = {
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
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
    <section className="bg-neutral-800 py-8 text-white sm:py-10">
      <Container>
        {submitted ? (
          <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-center sm:gap-6 sm:text-left">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-500/20">
              <CheckCircle size={24} strokeWidth={2} className="text-green-400" />
            </div>
            <div>
              <p className="text-lg font-bold">Заявка принята — перезвоним за 15 минут</p>
              <a
                href={`tel:${CONTACT_INFO.phones[0].replace(/[^+\d]/g, "")}`}
                className="mt-1 inline-flex items-center gap-1.5 text-sm text-white/60 transition-colors hover:text-white"
              >
                <Phone size={14} strokeWidth={2} />
                Или позвоните сами: {CONTACT_INFO.phones[0]}
              </a>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
            {/* Left: text */}
            <div className="shrink-0">
              <h2 className="text-lg font-bold sm:text-xl">
                Получите решение за 15 минут
              </h2>
              <p className="mt-1 flex items-center gap-1.5 text-sm text-white/60">
                <Shield size={14} strokeWidth={2} className="shrink-0" />
                Бесплатно, без обязательств. Данные защищены.
              </p>
            </div>

            {/* Right: inline form */}
            <form onSubmit={handleSubmit} className="flex w-full flex-col gap-3 sm:flex-row sm:items-center lg:max-w-xl">
              <input
                type="text"
                name="name"
                placeholder="Ваше имя"
                required
                className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/50 backdrop-blur-sm transition-colors focus:border-brand-400 focus:outline-none focus:ring-1 focus:ring-brand-400 sm:w-auto sm:flex-1"
              />
              <input
                type="tel"
                name="phone"
                placeholder="+7 (___) ___-__-__"
                required
                className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/50 backdrop-blur-sm transition-colors focus:border-brand-400 focus:outline-none focus:ring-1 focus:ring-brand-400 sm:w-auto sm:flex-1"
              />
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
                  "Получить консультацию"
                )}
              </button>
            </form>
          </div>
        )}
      </Container>
    </section>
  );
}
