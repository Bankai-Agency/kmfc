"use client";

import { CheckCircle, X, Info } from "lucide-react";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

interface ComparisonRow {
  feature: string;
  kmfc: string | boolean;
  banks: string | boolean;
  mfo: string | boolean;
  note?: string;
}

const COMPARISON_DATA: ComparisonRow[] = [
  { feature: "Процентная ставка", kmfc: "от 3%/мес (36%/год)", banks: "от 18%/год", mfo: "от 5%/мес (60%/год)", note: "Ставки указаны в годовом исчислении для корректного сравнения" },
  { feature: "Срок рассмотрения", kmfc: "1 день", banks: "5-14 дней", mfo: "1-3 дня" },
  { feature: "Максимальная сумма", kmfc: "до 30 млн ₸", banks: "до 100 млн ₸", mfo: "до 5 млн ₸" },
  { feature: "Минимум документов", kmfc: "2 документа", banks: "5-8 документов", mfo: "2-3 документа" },
  { feature: "Любая финансовая история", kmfc: true, banks: false, mfo: true },
  { feature: "Прозрачные условия", kmfc: true, banks: true, mfo: false },
  { feature: "Досрочное погашение без штрафов", kmfc: true, banks: true, mfo: false },
  { feature: "Имущество остаётся у вас", kmfc: true, banks: true, mfo: true },
];

function CellValue({ value }: { value: string | boolean }) {
  if (typeof value === "boolean") {
    return value ? (
      <CheckCircle size={20} strokeWidth={2} className="mx-auto text-green-500" />
    ) : (
      <X size={20} strokeWidth={2} className="mx-auto text-neutral-300" />
    );
  }
  return <span>{value}</span>;
}

export default function ComparisonTable() {
  return (
    <Section bg="gray">
      <Container>
        <AnimateOnScroll>
          <h2 className="text-center text-2xl font-bold sm:text-3xl">Сравните условия</h2>
          <p className="mt-2 text-center text-neutral-500">Прозрачное сравнение KMFC с другими вариантами</p>
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.2}>
          <div className="mx-auto mt-10 max-w-4xl overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr>
                  <th className="px-4 py-3 font-medium text-neutral-500"></th>
                  <th className="rounded-t-2xl bg-brand-500 px-4 py-3 text-center font-bold text-white">
                    KMFC
                  </th>
                  <th className="px-4 py-3 text-center font-medium text-neutral-500">Банки</th>
                  <th className="px-4 py-3 text-center font-medium text-neutral-500">Другие МФО</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_DATA.map((row, i) => (
                  <tr key={row.feature} className={`transition-colors hover:bg-brand-50/50 ${i % 2 === 0 ? "bg-white" : ""}`}>
                    <td className="px-4 py-3 font-medium text-neutral-700">
                      <span className="flex items-center gap-1.5">
                        {row.feature}
                        {row.note && (
                          <span className="group relative">
                            <Info size={14} className="text-neutral-400" />
                            <span className="pointer-events-none absolute bottom-full left-0 z-10 mb-1 hidden w-56 rounded-lg bg-neutral-800 px-3 py-2 text-xs font-normal text-white shadow-lg group-hover:block">
                              {row.note}
                            </span>
                          </span>
                        )}
                      </span>
                    </td>
                    <td className="bg-brand-50 px-4 py-3 text-center font-semibold text-brand-700 shadow-[inset_-1px_0_0_#e6f9fc,inset_1px_0_0_#e6f9fc]">
                      <CellValue value={row.kmfc} />
                    </td>
                    <td className="px-4 py-3 text-center text-neutral-600">
                      <CellValue value={row.banks} />
                    </td>
                    <td className="px-4 py-3 text-center text-neutral-600">
                      <CellValue value={row.mfo} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mx-auto mt-4 max-w-4xl text-center text-xs text-neutral-400">
            Данные актуальны на {new Date().toLocaleDateString("ru-RU", { month: "long", year: "numeric" })}.
            Условия банков и МФО могут отличаться в зависимости от программы финансирования.
          </p>
        </AnimateOnScroll>
      </Container>
    </Section>
  );
}
