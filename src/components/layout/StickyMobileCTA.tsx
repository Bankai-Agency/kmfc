"use client";

import Button from "@/components/ui/Button";

export default function StickyMobileCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-neutral-100 bg-white p-3 sm:hidden">
      <Button href="#form" size="md" className="w-full">
        Оставить заявку
      </Button>
    </div>
  );
}
