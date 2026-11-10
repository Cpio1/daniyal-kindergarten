"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useLang } from "./LanguageProvider";
import { SECTION_IDS, SITE, type SectionId } from "@/lib/site";
import { CloseIcon, InstagramIcon, MenuIcon, PhoneIcon, WhatsAppIcon } from "./Icons";
import { Cloud, Star } from "./Decor";

export function Logo({ logo, compact = false }: { logo: string | null; compact?: boolean }) {
  const { t } = useLang();
  if (logo) {
    return (
      <Image
        src={logo}
        alt={t.brand}
        width={160}
        height={56}
        className={`w-auto object-contain ${compact ? "h-10" : "h-11 md:h-12"}`}
        preload
      />
    );
  }
  return (
    <span className="flex items-center gap-2.5">
      <span className="relative grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-sky to-blue text-white shadow-[0_6px_16px_-6px_rgba(35,120,184,.7)]">
        <span className="font-display text-xl font-black leading-none">Д</span>
        <Star className="absolute -right-1 -top-1 h-4 w-4 text-sun" />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-xl font-extrabold tracking-tight text-ink">Даниял</span>
        <span className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-blue/80">
          {t.brandShort}
        </span>
      </span>
    </span>
  );
}

export function LangSwitch({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLang();
  return (
    <div
      role="group"
      aria-label="Language"
      className={`relative flex rounded-full bg-sky-light p-1 text-[13px] font-bold ${className}`}
    >
      <span
        aria-hidden
        className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full bg-white shadow-sm transition-transform duration-300 ease-out ${
          lang === "ru" ? "translate-x-full" : ""
        }`}
      />
      {(["kk", "ru"] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`relative z-10 w-10 rounded-full py-1.5 transition-colors ${
            lang === l ? "text-blue" : "text-ink/60 hover:text-ink"
          }`}
        >
          {l === "kk" ? "KZ" : "RU"}
        </button>
      ))}
    </div>
  );
}

export function Header({ logo }: { logo: string | null }) {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<SectionId>("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Подсветка текущего раздела в меню
  useEffect(() => {
    const els = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id as SectionId);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Блокируем прокрутку под открытым мобильным меню
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? "py-2" : "py-3 lg:py-4"
        }`}
      >
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
          <div
            className={`flex items-center justify-between gap-3 rounded-full border px-3 py-2 pl-4 transition-all duration-300 sm:pl-5 ${
              scrolled
                ? "border-white/80 bg-white/85 shadow-[0_10px_30px_-12px_rgba(35,120,184,.35)] backdrop-blur-xl"
                : "border-white/60 bg-white/60 backdrop-blur-md"
            }`}
          >
            <a href="#home" aria-label={t.brand} className="shrink-0">
              <Logo logo={logo} compact />
            </a>

            <nav aria-label="Main" className="hidden lg:block">
              <ul className="flex items-center gap-0.5">
                {SECTION_IDS.map((id) => (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      className={`relative block rounded-full px-2.5 py-2 text-[13px] font-semibold xl:px-3 xl:text-[14px] transition-colors ${
                        active === id ? "bg-sky-light text-blue" : "text-ink/75 hover:bg-sky-light/60 hover:text-blue"
                      }`}
                    >
                      {t.nav[id]}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center gap-2">
              <LangSwitch />
              <a
                href={SITE.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-wa hidden h-10 items-center gap-2 rounded-full px-4 text-[14px] font-bold md:inline-flex lg:hidden xl:inline-flex"
              >
                <WhatsAppIcon className="h-[18px] w-[18px]" />
                WhatsApp
              </a>
              <button
                type="button"
                onClick={() => setOpen(true)}
                aria-label={t.menu}
                aria-expanded={open}
                aria-controls="mobile-menu"
                className="grid h-10 w-10 place-items-center rounded-full bg-blue text-white transition hover:bg-blue-dark lg:hidden"
              >
                <MenuIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Мобильное меню */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-[60] lg:hidden ${open ? "pointer-events-auto" : "pointer-events-none"}`}
        aria-hidden={!open}
        inert={!open}
      >
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-ink/30 backdrop-blur-sm transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t.menu}
          className={`absolute inset-x-3 top-3 overflow-hidden rounded-[28px] bg-white shadow-2xl transition-all duration-400 ease-[cubic-bezier(.2,.9,.3,1.2)] sm:left-auto sm:right-4 sm:w-[380px] ${
            open ? "translate-y-0 scale-100 opacity-100" : "-translate-y-6 scale-95 opacity-0"
          }`}
        >
          <div className="relative bg-gradient-to-br from-sky to-blue px-5 pb-8 pt-4 text-white">
            <Cloud className="absolute -right-6 top-8 w-28 text-white/25" />
            <Cloud className="absolute left-10 -bottom-2 w-20 text-white/20" />
            <div className="relative flex items-center justify-between">
              <span className="font-display text-lg font-extrabold">«Даниял»</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={t.close}
                className="grid h-10 w-10 place-items-center rounded-full bg-white/20 transition hover:bg-white/30"
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>
            <p className="relative mt-1 text-sm text-white/90">{SITE.hours}</p>
          </div>

          <nav aria-label="Mobile" className="-mt-4 rounded-t-[24px] bg-white px-3 pt-3">
            <ul className="grid grid-cols-2 gap-2">
              {SECTION_IDS.map((id, i) => (
                <li
                  key={id}
                  className={`transition-all duration-500 ${open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"} ${id === "contacts" ? "col-span-2" : ""}`}
                  style={{ transitionDelay: open ? `${80 + i * 35}ms` : "0ms" }}
                >
                  <a
                    href={`#${id}`}
                    onClick={() => setOpen(false)}
                    className={`flex h-12 items-center rounded-2xl px-4 text-[15px] font-bold transition ${
                      active === id ? "bg-blue text-white" : "bg-sky-light/70 text-ink hover:bg-sky-light"
                    } ${id === "contacts" ? "justify-center" : ""}`}
                  >
                    {t.nav[id]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="grid grid-cols-3 gap-2 p-3 pt-3">
            <a
              href={SITE.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-wa flex h-12 items-center justify-center gap-2 rounded-2xl text-sm font-bold"
            >
              <WhatsAppIcon className="h-5 w-5" /> WhatsApp
            </a>
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ig flex h-12 items-center justify-center gap-2 rounded-2xl text-sm font-bold"
            >
              <InstagramIcon className="h-5 w-5" /> Instagram
            </a>
            <a
              href={SITE.phoneHref}
              className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-sun text-sm font-bold text-ink"
            >
              <PhoneIcon className="h-[18px] w-[18px]" />
              <span className="sr-only">{SITE.phoneDisplay}</span>
              <span aria-hidden>{t.call}</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
