"use client";

import { CONTACT_INFO } from "@/lib/data";

export default function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${CONTACT_INFO.whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-20 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110 sm:bottom-6"
      aria-label="Написать в WhatsApp"
    >
      <svg viewBox="0 0 32 32" fill="white" className="h-8 w-8">
        <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16.004c0 3.5 1.128 6.744 3.046 9.378L1.054 31.29l6.118-1.958A15.9 15.9 0 0 0 16.004 32C24.826 32 32 24.826 32 16.004 32 7.176 24.826 0 16.004 0Zm9.302 22.602c-.388 1.098-2.28 2.098-3.14 2.172-.778.066-1.748.094-2.82-.178a25.7 25.7 0 0 1-2.554-.944c-4.496-1.942-7.43-6.478-7.656-6.78-.224-.302-1.836-2.442-1.836-4.66 0-2.216 1.162-3.308 1.574-3.76.388-.424.862-.536 1.15-.536.286 0 .574.002.824.016.264.012.618-.1.968.74.362.866 1.228 3.004 1.336 3.224.11.22.184.478.036.77-.146.294-.22.478-.44.736-.22.258-.462.576-.66.774-.22.22-.448.46-.192.898.256.44 1.138 1.878 2.444 3.042 1.68 1.496 3.094 1.96 3.534 2.18.44.22.696.184.952-.11.256-.294 1.098-1.28 1.39-1.72.294-.44.586-.366.99-.22.402.148 2.554 1.204 2.994 1.424.44.22.732.33.84.512.11.184.11 1.058-.278 2.154l.004-.004Z" />
      </svg>
      <span className="absolute -right-1 -top-1 flex h-4 w-4">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-75" />
        <span className="relative inline-flex h-4 w-4 rounded-full bg-[#25D366]" />
      </span>
    </a>
  );
}
