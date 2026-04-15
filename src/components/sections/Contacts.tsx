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

        {/* Phone block */}
        <AnimateOnScroll>
          <div className="mt-8 flex flex-col items-center gap-3 rounded-2xl bg-neutral-900 p-6 text-white sm:flex-row sm:justify-center sm:gap-8">
            <a
              href={`https://wa.me/${CONTACT_INFO.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 transition-colors hover:text-green-400"
            >
              <MessageCircle size={18} strokeWidth={1.8} />
              <span className="text-sm text-neutral-400">WhatsApp</span>
            </a>
            <a
              href={telHref(CONTACT_INFO.whatsappDisplay)}
              className="text-3xl font-bold transition-colors hover:text-brand-300 sm:text-4xl"
            >
              {CONTACT_INFO.whatsappDisplay}
            </a>
            <div className="flex items-center gap-2 text-sm text-neutral-400">
              <Phone size={14} strokeWidth={1.8} />
              <a href={telHref(CONTACT_INFO.phones[0])} className="hover:text-white">
                {CONTACT_INFO.phones[0]}
              </a>
            </div>
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
