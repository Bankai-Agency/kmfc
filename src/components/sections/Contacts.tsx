"use client";

import { Phone, MapPin, Clock, MessageCircle, Mail } from "lucide-react";
import { CONTACT_INFO } from "@/lib/data";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

const OFFICE_IMAGES: Record<string, string> = {
  Алматы: "/images/office-almaty.png",
  Актобе: "/images/office-aktobe.png",
};

function telHref(phone: string): string {
  return `tel:${phone.replace(/[^+\d]/g, "")}`;
}

export default function Contacts() {
  return (
    <Section bg="white">
      <Container>
        <AnimateOnScroll>
          <h2 className="text-center text-2xl font-bold sm:text-3xl">Контакты</h2>
          <p className="mx-auto mt-2 max-w-lg text-center text-neutral-500">
            {CONTACT_INFO.companyName}
          </p>
          <p className="mt-1 text-center text-sm text-neutral-400">{CONTACT_INFO.license}</p>
        </AnimateOnScroll>

        {/* Phone block — Sber-style pills */}
        <AnimateOnScroll>
          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4">
            <a
              href={`https://wa.me/${CONTACT_INFO.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 rounded-xl bg-neutral-100 px-7 py-4 text-base font-medium text-neutral-900 transition-colors hover:bg-neutral-200"
            >
              <MessageCircle size={20} strokeWidth={2} className="shrink-0 text-neutral-500" />
              <span>
                WhatsApp{" "}
                <span className="font-semibold">{CONTACT_INFO.whatsappDisplay}</span>
              </span>
            </a>
            <a
              href={telHref(CONTACT_INFO.phones[0])}
              className="inline-flex items-center justify-center gap-3 rounded-xl bg-neutral-100 px-7 py-4 text-base font-medium text-neutral-900 transition-colors hover:bg-neutral-200"
            >
              <Phone size={20} strokeWidth={2} className="shrink-0 text-neutral-500" />
              <span>
                По телефону{" "}
                <span className="font-semibold">{CONTACT_INFO.phones[0]}</span>
              </span>
            </a>
          </div>
        </AnimateOnScroll>

        {/* Offices */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {CONTACT_INFO.offices.map((office, i) => (
            <AnimateOnScroll key={office.city} delay={i * 0.1}>
              <div className="overflow-hidden rounded-2xl bg-neutral-50">
                <img
                  src={OFFICE_IMAGES[office.city] ?? ""}
                  alt={`Офис KMFC в ${office.city}`}
                  className="aspect-[16/9] w-full object-cover"
                  loading="lazy"
                />
                <div className="p-6">
                  <h3 className="text-lg font-semibold">{office.city}</h3>
                  <div className="mt-4 space-y-3">
                    <div className="flex items-start gap-3">
                      <MapPin
                        size={20}
                        strokeWidth={1.8}
                        className="mt-0.5 shrink-0 text-brand-500"
                      />
                      <span className="text-neutral-600">{office.address}</span>
                    </div>

                    <div className="flex items-start gap-3">
                      <Phone
                        size={20}
                        strokeWidth={1.8}
                        className="mt-0.5 shrink-0 text-brand-500"
                      />
                      <div className="flex flex-col gap-1">
                        {office.phones.map((p) => (
                          <a
                            key={p}
                            href={telHref(p)}
                            className="text-neutral-600 transition-colors hover:text-brand-600"
                          >
                            {p}
                          </a>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Mail
                        size={20}
                        strokeWidth={1.8}
                        className="mt-0.5 shrink-0 text-brand-500"
                      />
                      <a
                        href={`mailto:${office.email}`}
                        className="text-neutral-600 transition-colors hover:text-brand-600"
                      >
                        {office.email}
                      </a>
                    </div>

                    <div className="flex items-start gap-3">
                      <Clock
                        size={20}
                        strokeWidth={1.8}
                        className="mt-0.5 shrink-0 text-brand-500"
                      />
                      <span className="text-neutral-600">{office.hours}</span>
                    </div>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </Container>
    </Section>
  );
}
