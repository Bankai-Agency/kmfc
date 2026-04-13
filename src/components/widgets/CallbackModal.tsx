"use client";

import { useState, FormEvent } from "react";
import { X, PhoneCall, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CallbackModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);

    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name") as string,
          phone: formData.get("phone") as string,
          source: "callback_modal",
        }),
      });
    } catch {
      // Still show success
    }

    setLoading(false);
    setSubmitted(true);
    setTimeout(() => {
      setIsOpen(false);
      setSubmitted(false);
    }, 2500);
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="hidden items-center gap-2 rounded-lg bg-brand-50 px-3 py-2 text-sm font-medium text-brand-600 transition-colors hover:bg-brand-100 sm:flex"
      >
        <PhoneCall size={16} strokeWidth={2} />
        Перезвоните мне
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute right-4 top-4 text-neutral-400 hover:text-neutral-600"
                aria-label="Закрыть"
              >
                <X size={20} />
              </button>

              {submitted ? (
                <div className="py-8 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                    <PhoneCall size={28} className="text-green-500" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold">Заявка принята</h3>
                  <p className="mt-2 text-sm text-neutral-500">Перезвоним в течение 5 минут</p>
                </div>
              ) : (
                <>
                  <h3 className="text-lg font-bold">Перезвоните мне</h3>
                  <p className="mt-1 text-sm text-neutral-500">Оставьте номер — перезвоним за 5 минут</p>

                  <form onSubmit={handleSubmit} className="mt-5 space-y-3">
                    <input
                      type="text"
                      name="name"
                      placeholder="Ваше имя"
                      required
                      className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                    />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+7 (___) ___-__-__"
                      required
                      className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-500 py-3 font-semibold text-white transition-colors hover:bg-brand-600 disabled:opacity-70"
                    >
                      {loading ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          Отправка...
                        </>
                      ) : (
                        "Жду звонка"
                      )}
                    </button>
                    <p className="text-center text-[11px] text-neutral-400">
                      Нажимая кнопку, вы даёте согласие на{" "}
                      <a href="/privacy" className="underline">обработку данных</a>
                    </p>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
