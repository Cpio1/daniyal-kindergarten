"use client";

import { useEffect, useState } from "react";
import { useLang } from "./LanguageProvider";
import { SITE } from "@/lib/site";
import { WhatsAppIcon } from "./Icons";

export function FloatingWhatsApp() {
  const { t } = useLang();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 280);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={SITE.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.writeWhatsapp}
      className={`group fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-40 flex items-center gap-2 rounded-full bg-[#25D366] p-3.5 text-white shadow-[0_14px_30px_-10px_rgba(37,211,102,.8)] transition-all duration-500 hover:scale-105 sm:right-6 sm:bottom-6 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <span aria-hidden className="wa-ping absolute inset-0 rounded-full bg-[#25D366]" />
      <WhatsAppIcon className="relative h-7 w-7" />
      <span className="relative hidden max-w-0 overflow-hidden whitespace-nowrap text-[14px] font-bold text-[#073B1C] transition-all duration-500 group-hover:max-w-[200px] group-hover:pr-2 md:inline">
        {t.writeWhatsapp}
      </span>
    </a>
  );
}
