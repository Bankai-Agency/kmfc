"use client";

import { Shield, Clock, FileCheck, Lock } from "lucide-react";
import Container from "@/components/ui/Container";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

const GUARANTEES = [
  { icon: Clock, title: "Решение за 1 час", description: "Оперативно принимаем решение, чтобы ваш бизнес не простаивал" },
  { icon: Shield, title: "Имущество в безопасности", description: "Вы продолжаете пользоваться залогом весь срок кредита" },
  { icon: FileCheck, title: "Прозрачный договор", description: "Все условия фиксируются до подписания — никаких сюрпризов" },
  { icon: Lock, title: "Защита данных", description: "Персональные данные защищены по Закону РК" },
];

export default function Guarantee() {
  return (
    <section className="bg-neutral-900 py-12 sm:py-16 text-white">
      <Container>
        <AnimateOnScroll>
          <h2 className="text-center text-2xl font-bold sm:text-3xl">Наши гарантии</h2>
          <p className="mt-2 text-center text-neutral-400">Лицензированная МФО под контролем АРРФР</p>
        </AnimateOnScroll>

        <div className="mt-10 grid auto-rows-fr gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {GUARANTEES.map((g, i) => (
            <AnimateOnScroll key={g.title} delay={i * 0.1} className="h-full">
              <div className="flex h-full flex-col rounded-2xl border border-neutral-800 bg-neutral-800/50 p-6 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500/20">
                  <g.icon size={24} strokeWidth={1.8} className="text-brand-400" />
                </div>
                <h3 className="mt-4 font-semibold">{g.title}</h3>
                <p className="mt-2 text-sm text-neutral-400">{g.description}</p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </Container>
    </section>
  );
}
