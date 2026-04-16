"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle } from "lucide-react";

const PROOFS = [
  { name: "Алмас К.", city: "Алматы", action: "получил одобрение на 5 млн ₸" },
  { name: "Айгуль М.", city: "Алматы", action: "оформила финансирование под залог квартиры" },
  { name: "Бахыт Т.", city: "Актобе", action: "получил 3 млн ₸ под залог авто" },
  { name: "Марина Л.", city: "Алматы", action: "рефинансировала займ на лучших условиях" },
  { name: "Нурлан С.", city: "Актобе", action: "получил одобрение за 1 день" },
];

export default function SocialProofToast() {
  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    const showDelay = setTimeout(() => setVisible(true), 12000);
    return () => clearTimeout(showDelay);
  }, [dismissed]);

  useEffect(() => {
    if (!visible || dismissed) return;
    const hideTimer = setTimeout(() => setVisible(false), 5000);
    return () => clearTimeout(hideTimer);
  }, [visible, index, dismissed]);

  useEffect(() => {
    if (visible || dismissed) return;
    const nextTimer = setTimeout(() => {
      setIndex((i) => (i + 1) % PROOFS.length);
      setVisible(true);
    }, 30000);
    return () => clearTimeout(nextTimer);
  }, [visible, dismissed]);

  function handleDismiss() {
    setVisible(false);
    setDismissed(true);
  }

  const proof = PROOFS[index];

  return (
    <AnimatePresence>
      {visible && !dismissed && (
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ type: "spring", damping: 20 }}
          className="fixed bottom-20 left-4 z-50 flex max-w-xs items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-lg ring-1 ring-neutral-100 sm:bottom-6"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100">
            <CheckCircle size={20} className="text-green-500" />
          </div>
          <div>
            <p className="text-sm font-medium text-neutral-800">
              {proof.name} из {proof.city}
            </p>
            <p className="text-xs text-neutral-500">{proof.action}</p>
          </div>
          <button
            onClick={handleDismiss}
            className="ml-2 shrink-0 text-neutral-300 hover:text-neutral-500"
            aria-label="Закрыть"
          >
            &times;
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
