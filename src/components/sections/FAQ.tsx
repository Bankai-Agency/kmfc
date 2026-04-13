"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    question: "Какие документы нужны для оформления?",
    answer: "Всего два документа: удостоверение личности и правоустанавливающие документы на залоговое имущество. Мы специально упростили процесс, чтобы вы не тратили время на сбор справок.",
  },
  {
    question: "Как быстро я получу деньги?",
    answer: "Решение принимается в течение 1 рабочего дня. После подписания договора средства поступают на ваш счёт в тот же или на следующий рабочий день. Заявки, поданные до 14:00, обычно обрабатываются в тот же день.",
  },
  {
    question: "Можно ли получить кредит с плохой кредитной историей?",
    answer: "Да. Залоговое обеспечение позволяет нам одобрять заявки клиентов с любой кредитной историей. Мы оцениваем стоимость вашего имущества, а не прошлые записи в кредитном бюро.",
  },
  {
    question: "Автомобиль/техника остаётся у меня?",
    answer: "Да, вы продолжаете пользоваться имуществом на протяжении всего срока кредита. Регистрируется только право залога в уполномоченных органах — это стандартная процедура.",
  },
  {
    question: "Можно ли погасить кредит досрочно?",
    answer: "Да, в любой момент без штрафов и комиссий. Проценты начисляются только за фактические дни пользования. Многие клиенты берут кредит на 12 месяцев, а закрывают за 3-4.",
  },
  {
    question: "Какие виды недвижимости принимаются в залог?",
    answer: "Квартиры, дома, коммерческую недвижимость и земельные участки в Алматы, Актобе и пригородах. Объект должен быть свободен от обременений и иметь оформленное право собственности.",
  },
  {
    question: "Какие комиссии есть?",
    answer: "До подписания договора вы получаете полный расчёт: сумма, ставка, ежемесячный платёж, общая переплата. Мы фиксируем все условия в договоре — ничего не меняется после подписания.",
  },
  {
    question: "У вас есть лицензия?",
    answer: "Да, KMFC — лицензированная микрофинансовая организация, деятельность которой регулируется Национальным Банком Республики Казахстан. Мы работаем более 10 лет в полном соответствии с законодательством РК.",
  },
  {
    question: "Кто может получить кредит?",
    answer: "Граждане Казахстана — физические лица, индивидуальные предприниматели и юридические лица (ТОО). Возраст от 21 до 63 лет.",
  },
  {
    question: "Мои данные в безопасности?",
    answer: "Персональные данные обрабатываются и хранятся в соответствии с Законом РК «О персональных данных и их защите». Мы не передаём информацию третьим лицам без вашего письменного согласия.",
  },
];

function AccordionItem({ item, isOpen, onToggle }: { item: FAQItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-neutral-100">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between py-4 text-left transition-colors hover:text-brand-600"
      >
        <span className="pr-4 font-medium text-neutral-800">{item.question}</span>
        <ChevronDown
          size={20}
          strokeWidth={2}
          className={`shrink-0 text-neutral-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
      >
        <div className="overflow-hidden">
          <p className="pb-5 text-sm leading-relaxed text-neutral-600">{item.answer}</p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section bg="white">
      <Container>
        <AnimateOnScroll>
          <h2 className="text-center text-2xl font-bold sm:text-3xl">Частые вопросы</h2>
        </AnimateOnScroll>

        <div className="mx-auto mt-10 max-w-2xl">
          {FAQ_DATA.map((item, i) => (
            <AccordionItem
              key={i}
              item={item}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
