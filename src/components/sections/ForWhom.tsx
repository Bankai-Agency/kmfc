"use client";

import { User, Briefcase, RefreshCw } from "lucide-react";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

const SEGMENTS = [
  {
    icon: User,
    title: "Физическим лицам",
    image: "/images/forwhom-fizlica.png",
    imageAlt: "Семья или молодая пара",
    items: [
      "Крупные покупки и ремонт",
      "Образование и лечение",
      "Рефинансирование дорогих кредитов",
      "Срочные финансовые потребности",
    ],
  },
  {
    icon: Briefcase,
    title: "Для бизнеса (ИП/ТОО)",
    image: "/images/forwhom-biznes.png",
    imageAlt: "Предприниматель или офис",
    items: [
      "Пополнение оборотных средств",
      "Закрытие кассовых разрывов",
      "Закупка товаров и оборудования",
      "Расширение и развитие бизнеса",
    ],
  },
  {
    icon: RefreshCw,
    title: "Рефинансирование",
    image: "/images/forwhom-refinansirovanie.png",
    imageAlt: "Подписание документов",
    items: [
      "Объединение нескольких кредитов",
      "Снижение ежемесячного платежа",
      "Более выгодная процентная ставка",
      "Улучшение кредитной истории",
    ],
  },
];

export default function ForWhom() {
  return (
    <Section bg="gray">
      <Container>
        <AnimateOnScroll>
          <h2 className="text-center text-2xl font-bold sm:text-3xl">Кому подойдёт кредит</h2>
          <p className="mt-2 text-center text-neutral-500">Финансирование для любых целей под залог вашего имущества</p>
        </AnimateOnScroll>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {SEGMENTS.map((seg, i) => (
            <AnimateOnScroll key={seg.title} delay={i * 0.1}>
              <div className="overflow-hidden rounded-2xl bg-white">
                <img
                  src={seg.image}
                  alt={seg.imageAlt}
                  className="aspect-[16/9] w-full object-cover"
                  loading="lazy"
                />
                <div className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50">
                      <seg.icon size={20} strokeWidth={1.8} className="text-brand-500" />
                    </div>
                    <h3 className="text-lg font-semibold">{seg.title}</h3>
                  </div>
                  <ul className="mt-4 space-y-2">
                    {seg.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-neutral-600">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </Container>
    </Section>
  );
}
