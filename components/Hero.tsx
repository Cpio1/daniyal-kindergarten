"use client";

import Image from "next/image";
import { useLang } from "./LanguageProvider";
import { SITE } from "@/lib/site";
import { ArrowIcon, WhatsAppIcon } from "./Icons";
import { Cloud, Rainbow, Star, Sun, Wave } from "./Decor";

export function Hero({ image }: { image: string | null }) {
  const { t } = useLang();

  return (
    <section id="home" className="relative overflow-hidden bg-hero pt-24 sm:pt-28 lg:pt-32">
      {/* Декор фона */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-sky/30 blur-3xl" />
        <div className="absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-sun/40 blur-3xl" />
        <Cloud className="float-slow absolute left-[4%] top-[18%] w-24 text-white sm:w-32" />
        <Cloud className="float-slower absolute right-[6%] top-[13%] hidden w-40 text-white/90 md:block" />
        <Cloud className="float-slow absolute bottom-[22%] left-[40%] hidden w-28 text-white/80 lg:block" />
        <Star className="twinkle absolute left-[12%] top-[48%] h-4 w-4 text-sun sm:h-5 sm:w-5" />
        <Star className="twinkle absolute right-[42%] top-[22%] h-3 w-3 text-white [animation-delay:1s]" />
        <Star className="twinkle absolute right-[10%] top-[56%] hidden h-5 w-5 text-sun md:block [animation-delay:.6s]" />
        <Star className="twinkle absolute left-[46%] top-[70%] h-3.5 w-3.5 text-white [animation-delay:1.6s]" />
      </div>

      <div className="relative mx-auto flex max-w-[1240px] flex-col px-4 pb-10 text-center sm:px-6 md:pb-14 lg:grid lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-10 lg:pb-20 lg:text-left">
        {/* Текст. На мобильном блок «раскрывается» (contents), чтобы фото встало сразу после заголовка */}
        <div className="contents lg:block">
          <span className="fade-up inline-flex items-center gap-2 self-center rounded-full bg-white/80 px-3.5 py-1.5 text-[12px] font-bold text-blue shadow-sm backdrop-blur sm:text-[13px]">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#2BB673]" />
            {t.hero.badge}
          </span>

          <h1 className="fade-up mt-4 font-display text-[32px] font-black leading-[1.08] tracking-tight text-ink [animation-delay:80ms] sm:text-[44px] lg:text-[52px] xl:text-[56px]">
            {t.hero.title1}{" "}
            <span className="relative inline-block text-blue">
              {t.hero.title2}
              <svg
                aria-hidden
                viewBox="0 0 300 16"
                preserveAspectRatio="none"
                className="absolute -bottom-1.5 left-0 h-2.5 w-full text-sun sm:-bottom-2 sm:h-3"
              >
                <path d="M3 11c60-9 140-11 294-4" stroke="currentColor" strokeWidth="6" fill="none" strokeLinecap="round" />
              </svg>
            </span>
          </h1>

          <p className="fade-up mx-auto mt-5 max-w-[30rem] text-[16px] leading-relaxed text-ink/75 [animation-delay:160ms] sm:text-[18px] lg:mx-0">
            {t.hero.subtitle}
          </p>

          <div className="fade-up order-2 mt-7 flex flex-col gap-3 [animation-delay:240ms] sm:flex-row sm:justify-center lg:justify-start">
            <a
              href={SITE.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-wa group inline-flex h-[52px] items-center justify-center gap-2.5 rounded-full px-7 text-[15px] font-bold"
            >
              <WhatsAppIcon className="h-5 w-5" />
              {t.hero.contact}
            </a>
            <a
              href="#about"
              className="group inline-flex h-[52px] items-center justify-center gap-2 rounded-full border-2 border-blue/15 bg-white px-7 text-[15px] font-bold text-blue shadow-sm transition hover:-translate-y-0.5 hover:border-blue/30 hover:shadow-md"
            >
              {t.hero.about}
              <ArrowIcon className="h-[18px] w-[18px] transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          <ul className="fade-up order-3 mt-5 flex flex-wrap justify-center gap-2 [animation-delay:320ms] lg:justify-start">
            {t.hero.chips.map((c) => (
              <li
                key={c}
                className="rounded-full border border-white bg-white/70 px-3.5 py-1.5 text-[13px] font-bold text-ink/80 backdrop-blur"
              >
                {c}
              </li>
            ))}
          </ul>
        </div>

        {/* Фото */}
        <div className="fade-up relative order-1 mx-auto mt-8 w-full max-w-[420px] [animation-delay:200ms] sm:max-w-[520px] lg:mt-0 lg:max-w-none">
          <Sun className="absolute -right-2 -top-6 z-20 w-20 sm:-right-4 sm:-top-10 sm:w-28" />
          <Rainbow className="absolute -bottom-4 -left-3 z-20 w-24 drop-shadow-sm sm:-left-8 sm:w-36" />

          <div className="blob-frame relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-white to-sky-light shadow-[0_30px_60px_-25px_rgba(35,120,184,.55)] ring-8 ring-white sm:aspect-[5/4]">
            {image ? (
              <Image
                src={image}
                alt={t.hero.photoAlt}
                fill
                preload
                sizes="(min-width:1024px) 560px, (min-width:640px) 520px, 92vw"
                className="object-cover"
              />
            ) : (
              <HeroPlaceholder />
            )}
          </div>
        </div>
      </div>

      <Wave fill="#ffffff" className="relative -mb-px" />
    </section>
  );
}

/** Красивая иллюстрация вместо фото, пока main-page не загружен. */
function HeroPlaceholder() {
  return (
    <div className="absolute inset-0 grid place-items-center bg-gradient-to-b from-sky/60 via-sky-light to-white">
      <Cloud className="float-slow absolute left-[8%] top-[16%] w-28 text-white" />
      <Cloud className="float-slower absolute right-[10%] top-[34%] w-20 text-white/90" />
      <Star className="twinkle absolute left-[30%] top-[10%] h-5 w-5 text-sun" />
      <Star className="twinkle absolute right-[28%] top-[14%] h-4 w-4 text-white [animation-delay:.8s]" />
      <div className="relative mt-10 text-center">
        <svg viewBox="0 0 220 150" className="mx-auto w-48 sm:w-60" aria-hidden>
          {/* Домик */}
          <path d="M40 70 110 18l70 52" fill="#FFDB85" />
          <path d="M30 76 110 16l80 60" stroke="#2378B8" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <rect x="52" y="68" width="116" height="74" rx="14" fill="#fff" />
          <rect x="94" y="96" width="32" height="46" rx="10" fill="#77C9F4" />
          <rect x="64" y="84" width="20" height="20" rx="6" fill="#DDF3FF" stroke="#77C9F4" strokeWidth="3" />
          <rect x="136" y="84" width="20" height="20" rx="6" fill="#DDF3FF" stroke="#77C9F4" strokeWidth="3" />
          <circle cx="110" cy="52" r="9" fill="#fff" stroke="#2378B8" strokeWidth="4" />
          <path d="M0 146h220" stroke="#9BE3B5" strokeWidth="8" strokeLinecap="round" />
        </svg>
        <p className="mt-3 font-display text-2xl font-black text-blue">«Даниял»</p>
      </div>
    </div>
  );
}
