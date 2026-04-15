"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

interface Testimonial {
  name: string;
  city: string;
  text: string;
  rating: number;
  purpose: string;
  initials: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Алмас К.",
    city: "Алматы",
    text: "Обратился за кредитом под залог коммерческой недвижимости для расширения бизнеса. Решение приняли за час, деньги получил в день регистрации залога. Менеджер всё подробно объяснил — никаких скрытых комиссий.",
    rating: 5,
    purpose: "Расширение бизнеса",
    initials: "АК",
  },
  {
    name: "Айгуль М.",
    city: "Алматы",
    text: "Нужны были оборотные средства на закупку товара для магазина. Банки отказывали из-за кредитной истории, а в KMFC оформили кредит под залог авто за один день. Машина осталась у меня, условия прозрачные.",
    rating: 5,
    purpose: "Закупка товара",
    initials: "АМ",
  },
  {
    name: "Нурлан С.",
    city: "Актобе",
    text: "Оформил кредит под залог земельного участка для развития фермерского хозяйства. Процесс занял минимум времени. Удобный график погашения, а льготный период позволил пустить деньги в оборот.",
    rating: 5,
    purpose: "Развитие хозяйства",
    initials: "НС",
  },
  {
    name: "Бахыт Т.",
    city: "Алматы",
    text: "Брал кредит под залог спецтехники для пополнения оборотных средств ТОО. Оценку провели быстро и бесплатно, сумму дали хорошую. Техника продолжает работать на объектах.",
    rating: 5,
    purpose: "Оборотные средства",
    initials: "БТ",
  },
  {
    name: "Марина Л.",
    city: "Алматы",
    text: "Запускала новую точку в своём ТОО, срочно нужен был капитал. В KMFC оформили кредит под залог квартиры за один день. Ставка честная, переплата понятна заранее. Вернула досрочно — без штрафов.",
    rating: 5,
    purpose: "Запуск новой точки",
    initials: "МЛ",
  },
  {
    name: "Дамир О.",
    city: "Алматы",
    text: "Срочно понадобились деньги на предоплату крупного заказа. Оформили кредит под залог авто за 1 день. Быстро, без бюрократии. Бизнес не остановился.",
    rating: 5,
    purpose: "Исполнение заказа",
    initials: "ДО",
  },
  {
    name: "Гульнара А.",
    city: "Актобе",
    text: "Взяла кредит под залог коммерческой недвижимости на расширение ассортимента магазина. Решение получила за час. Менеджеры вежливые, на все вопросы ответили.",
    rating: 5,
    purpose: "Расширение ассортимента",
    initials: "ГА",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((c) => (c === TESTIMONIALS.length - 1 ? 0 : c + 1));
  }, []);

  const prev = useCallback(() => {
    setCurrent((c) => (c === 0 ? TESTIMONIALS.length - 1 : c - 1));
  }, []);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [paused, next]);

  function handleInteraction(callback: () => void) {
    setPaused(true);
    callback();
    setTimeout(() => setPaused(false), 10000);
  }

  const t = TESTIMONIALS[current];

  return (
    <Section bg="white">
      <Container>
        <AnimateOnScroll>
          <h2 className="text-center text-2xl font-bold sm:text-3xl">Что говорят клиенты</h2>
          <p className="mt-2 text-center text-neutral-500">Как предприниматели развивают бизнес с KMFC</p>
        </AnimateOnScroll>

        <div className="mx-auto mt-10 max-w-2xl">
          <div className="relative rounded-2xl bg-neutral-50 p-6 sm:p-8">
            <Quote size={32} strokeWidth={1.5} className="absolute right-6 top-6 text-brand-100" />

            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-500 text-sm font-bold text-white">
                {t.initials}
              </div>
              <div>
                <div className="font-semibold text-neutral-800">{t.name}</div>
                <div className="text-sm text-neutral-500">{t.city} &middot; {t.purpose}</div>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  strokeWidth={1.5}
                  className={i < t.rating ? "fill-accent-400 text-accent-400" : "text-neutral-300"}
                />
              ))}
            </div>

            <blockquote className="mt-3 leading-relaxed text-neutral-700">
              &ldquo;{t.text}&rdquo;
            </blockquote>
          </div>

          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              onClick={() => handleInteraction(prev)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 text-neutral-600 transition-colors hover:bg-brand-50 hover:text-brand-500"
              aria-label="Предыдущий отзыв"
            >
              <ChevronLeft size={20} strokeWidth={2} />
            </button>
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleInteraction(() => setCurrent(i))}
                  className={`h-2 rounded-full transition-all ${i === current ? "w-6 bg-brand-500" : "w-2 bg-neutral-300"}`}
                  aria-label={`Отзыв ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={() => handleInteraction(next)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 text-neutral-600 transition-colors hover:bg-brand-50 hover:text-brand-500"
              aria-label="Следующий отзыв"
            >
              <ChevronRight size={20} strokeWidth={2} />
            </button>
          </div>

          <p className="mt-4 text-center text-xs text-neutral-400">
            Имена сокращены для защиты персональных данных клиентов
          </p>
        </div>
      </Container>
    </Section>
  );
}
