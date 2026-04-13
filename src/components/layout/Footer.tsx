"use client";

import { Phone, MapPin, MessageCircle } from "lucide-react";
import { CONTACT_INFO, COLLATERAL_CARDS } from "@/lib/data";
import Container from "@/components/ui/Container";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-800 bg-neutral-900 pb-24 pt-12 text-neutral-400 sm:pb-12">
      <Container>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Company */}
          <div>
            <div className="text-lg font-bold text-white">KMFC</div>
            <p className="mt-2 text-sm leading-relaxed">
              {CONTACT_INFO.companyName}
            </p>
            <p className="mt-1 text-xs text-neutral-500">{CONTACT_INFO.license}</p>
          </div>

          {/* Products */}
          <div>
            <div className="text-sm font-semibold uppercase tracking-wider text-neutral-500">Кредиты</div>
            <ul className="mt-3 space-y-2">
              {COLLATERAL_CARDS.map((card) => (
                <li key={card.slug}>
                  <a
                    href={`/${card.slug}`}
                    className="text-sm transition-colors hover:text-white"
                  >
                    {card.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <div className="text-sm font-semibold uppercase tracking-wider text-neutral-500">Навигация</div>
            <ul className="mt-3 space-y-2">
              <li><a href="#calculator" className="text-sm transition-colors hover:text-white">Калькулятор</a></li>
              <li><a href="#form" className="text-sm transition-colors hover:text-white">Оставить заявку</a></li>
              <li><a href="/privacy" className="text-sm transition-colors hover:text-white">Политика конфиденциальности</a></li>
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <div className="text-sm font-semibold uppercase tracking-wider text-neutral-500">Контакты</div>
            <ul className="mt-3 space-y-3">
              <li>
                <a href={`tel:${CONTACT_INFO.phones[0].replace(/[\s()-]/g, "")}`} className="flex items-center gap-2 text-sm transition-colors hover:text-white">
                  <Phone size={14} strokeWidth={1.8} />
                  {CONTACT_INFO.phones[0]}
                </a>
              </li>
              <li>
                <a href={`https://wa.me/${CONTACT_INFO.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm transition-colors hover:text-green-400">
                  <MessageCircle size={14} strokeWidth={1.8} />
                  {CONTACT_INFO.whatsappDisplay}
                </a>
              </li>
              {CONTACT_INFO.offices.map((office) => (
                <li key={office.city} className="flex items-start gap-2 text-xs">
                  <MapPin size={12} strokeWidth={1.8} className="mt-0.5 shrink-0" />
                  <span>{office.city}: {office.address}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-neutral-800 pt-6 text-center text-xs text-neutral-500">
          &copy; {new Date().getFullYear()} KMFC. Все права защищены.
        </div>
      </Container>
    </footer>
  );
}
