"use client";

import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { CONTACT_INFO } from "@/lib/data";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import CallbackModal from "@/components/widgets/CallbackModal";

export default function Header() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-100 bg-white/95 backdrop-blur-sm">
      <Container className="flex h-16 items-center justify-between">
        <a href="/" className="text-xl font-bold text-brand-500">
          KMFC
        </a>

        <div className="flex items-center gap-3">
          <a
            href={`tel:${CONTACT_INFO.phones[0].replace(/[\s()-]/g, "")}`}
            className="hidden items-center gap-2 text-sm font-medium text-neutral-700 hover:text-brand-500 md:flex"
          >
            <Phone size={18} strokeWidth={1.8} />
            {CONTACT_INFO.phones[0]}
          </a>
          <CallbackModal />
          <Button href="#form" size="sm">
            Оставить заявку
          </Button>
        </div>
      </Container>

      {/* Scroll progress bar */}
      <div className="absolute bottom-0 left-0 h-0.5 w-full bg-transparent">
        <div
          className="h-full bg-gradient-to-r from-brand-500 to-accent-400 transition-[width] duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </header>
  );
}
