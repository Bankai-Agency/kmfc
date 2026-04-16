"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FAQItem } from "@/lib/types";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

function AccordionItem({
  item,
  isOpen,
  onToggle,
}: {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div>
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-6 py-5 text-left transition-colors hover:text-brand-600 sm:py-6"
      >
        <span className="text-base font-medium text-neutral-800 sm:text-[17px]">{item.question}</span>
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
          <p className="pb-6 pr-10 text-[15px] leading-relaxed text-neutral-600">{item.answer}</p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ({ data }: { data: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Section bg="gray">
      <Container>
        <AnimateOnScroll>
          <h2 className="text-center text-2xl font-bold sm:text-3xl">Частые вопросы</h2>
        </AnimateOnScroll>

        <div className="mx-auto mt-10 max-w-3xl rounded-3xl bg-white px-6 ring-1 ring-neutral-100 sm:px-8">
          <div className="divide-y divide-neutral-200">
            {data.map((item, i) => (
              <AccordionItem
                key={i}
                item={item}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
