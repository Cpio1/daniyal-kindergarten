"use client";

import { useLang } from "./LanguageProvider";
import { SITE } from "@/lib/site";
import { Reveal } from "./Reveal";
import { SectionTitle } from "./SectionTitle";
import { Apple, Bowl, Bread, Carrot, Milk, Pear, Star } from "./Decor";
import { WhatsAppIcon } from "./Icons";

const MEALS = [
  { Icon: Milk, bg: "bg-sky-light", ring: "ring-sky/40" },
  { Icon: Apple, bg: "bg-[#FFE8E3]", ring: "ring-[#FF9A8A]/40" },
  { Icon: Bowl, bg: "bg-sun/40", ring: "ring-sun" },
  { Icon: Pear, bg: "bg-[#E3F7EC]", ring: "ring-[#7FD9A6]/50" },
];

export function Food() {
  const { t } = useLang();

  return (
    <section id="food" className="relative overflow-hidden bg-white py-14 sm:py-20 lg:py-24">
      {/* Парящие продукты */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <Carrot className="float-slow absolute left-[3%] top-16 hidden w-14 rotate-[-18deg] md:block lg:w-16" />
        <Bread className="float-slower absolute right-[4%] top-20 hidden w-14 md:block lg:w-16" />
        <Apple className="float-slower absolute bottom-16 left-[6%] hidden w-12 lg:block" />
        <Star className="twinkle absolute right-[12%] bottom-24 h-5 w-5 text-sun" />
      </div>

      <div className="relative mx-auto max-w-[1240px] px-4 sm:px-6">
        <Reveal>
          <SectionTitle eyebrow={t.food.eyebrow} title={t.food.title} text={t.food.text} />
        </Reveal>

        {/* Мобильный: компактный «таймлайн», десктоп: 4 карточки в ряд */}
        <ol className="relative mx-auto mt-10 grid max-w-md gap-3 sm:max-w-none sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          <span
            aria-hidden
            className="absolute bottom-6 left-[38px] top-6 w-0.5 rounded bg-gradient-to-b from-sky via-sun to-[#7FD9A6] sm:hidden"
          />
          {MEALS.map(({ Icon, bg, ring }, i) => (
            <Reveal as="li" key={i} delay={i * 90}>
              <div
                className={`group relative flex h-full items-center gap-4 rounded-[26px] ${bg} p-3 pr-5 transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_34px_-22px_rgba(35,120,184,.6)] sm:flex-col sm:gap-0 sm:rounded-[32px] sm:p-6 sm:pt-8 sm:text-center`}
              >
                <span
                  className={`relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-full bg-white ring-4 ${ring} transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[8deg] sm:h-24 sm:w-24`}
                >
                  <Icon className="h-9 w-9 sm:h-14 sm:w-14" />
                </span>
                <div className="sm:mt-5">
                  <p className="font-display text-[19px] font-black text-ink sm:text-[22px]">{t.food.meal(i + 1)}</p>
                  <p className="mt-0.5 text-[13px] font-semibold text-ink/65 sm:text-[14px]">{t.food.mealText}</p>
                </div>
                <span
                  aria-hidden
                  className="absolute right-4 top-3 font-display text-[44px] font-black leading-none text-white/70 sm:right-5 sm:top-4 sm:text-[56px]"
                >
                  {i + 1}
                </span>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal className="mx-auto mt-10 max-w-3xl">
          <div className="relative flex flex-col items-center gap-4 overflow-hidden rounded-[32px] bg-gradient-to-r from-blue to-[#3C9ADB] p-6 text-center text-white sm:flex-row sm:rounded-full sm:p-3 sm:pl-8 sm:text-left">
            <div aria-hidden className="flex -space-x-2 sm:order-none">
              {[Apple, Carrot, Milk, Bread].map((I, k) => (
                <span key={k} className="grid h-10 w-10 place-items-center rounded-full bg-white ring-2 ring-blue">
                  <I className="h-6 w-6" />
                </span>
              ))}
            </div>
            <p className="text-[15px] font-bold sm:flex-1">{t.food.note}</p>
            <a
              href={SITE.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-white px-5 text-[14px] font-bold text-blue transition hover:-translate-y-0.5 hover:bg-sun hover:text-ink sm:w-auto"
            >
              <WhatsAppIcon className="h-[18px] w-[18px]" /> {t.food.ask}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
