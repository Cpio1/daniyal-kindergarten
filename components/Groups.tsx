"use client";

import { useLang } from "./LanguageProvider";
import { GROUPS, SITE } from "@/lib/site";
import { Reveal } from "./Reveal";
import { SectionTitle } from "./SectionTitle";
import { Cloud, Star, Wave } from "./Decor";
import { ChatIcon, ClockIcon, WhatsAppIcon } from "./Icons";

const PALETTE = [
  { card: "from-[#4FB3EC] to-[#2378B8] text-white", num: "text-blue", dot: "bg-white/20" },
  { card: "from-[#FFE29A] to-[#FFC65C] text-ink", num: "text-[#9A6200]", dot: "bg-white/40" },
  { card: "from-[#3DB07A] to-[#1F8559] text-white", num: "text-[#1E7A4C]", dot: "bg-white/20" },
  { card: "from-[#F0828A] to-[#C9485E] text-white", num: "text-[#B23A4A]", dot: "bg-white/20" },
];

export function Groups() {
  const { t, lang } = useLang();

  return (
    <section id="groups" className="relative scroll-mt-20 overflow-hidden bg-sky-light">
      <Wave fill="#DDF3FF" className="bg-white" />
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <Cloud className="float-slower absolute -left-6 top-24 w-32 text-white" />
        <Cloud className="float-slow absolute right-4 bottom-24 hidden w-40 text-white md:block" />
        <Star className="twinkle absolute right-[18%] top-28 h-5 w-5 text-sun" />
      </div>

      <div className="relative mx-auto max-w-[1240px] px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
        <Reveal>
          <SectionTitle eyebrow={t.groups.eyebrow} title={t.groups.title} text={t.groups.text} />
        </Reveal>

        {/* На мобильном — горизонтальная карусель, на десктопе — сетка */}
        <ul className="no-scrollbar -mx-4 mt-9 flex snap-x snap-mandatory gap-3.5 overflow-x-auto px-4 pb-3 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 lg:grid-cols-4">
          {GROUPS.map((g, i) => {
            const p = PALETTE[i % PALETTE.length];
            return (
              <Reveal as="li" key={i} delay={i * 90} className="w-[78%] shrink-0 snap-center sm:w-auto">
                <article
                  className={`group relative h-full overflow-hidden rounded-[30px] bg-gradient-to-br ${p.card} p-5 shadow-[0_20px_40px_-24px_rgba(35,120,184,.7)] transition duration-300 hover:-translate-y-1.5 sm:p-6`}
                >
                  <span aria-hidden className={`absolute -right-8 -top-8 h-28 w-28 rounded-full ${p.dot}`} />
                  <span aria-hidden className={`absolute -bottom-10 left-6 h-24 w-24 rounded-full ${p.dot}`} />
                  <Cloud className="absolute right-3 top-14 w-16 text-white/40 transition-transform duration-500 group-hover:translate-x-2" />

                  <span
                    className={`relative grid h-14 w-14 place-items-center rounded-[20px] bg-white font-display text-2xl font-black ${p.num} shadow-md transition-transform duration-300 group-hover:-rotate-6`}
                  >
                    {i + 1}
                  </span>
                  <h3 className="relative mt-5 font-display text-[22px] font-black leading-tight">
                    {g.name?.[lang] ?? t.groups.group(i + 1)}
                  </h3>
                  <p className="relative mt-1 text-[14px] font-semibold opacity-90">
                    {g.age?.[lang] ?? t.groups.ageDefault}
                  </p>

                  <ul className="relative mt-5 space-y-2 text-[13px] font-semibold">
                    <li className="flex items-center gap-2 rounded-full bg-white/25 px-3 py-1.5 backdrop-blur-sm">
                      <ChatIcon className="h-4 w-4 shrink-0" /> {t.groups.language}
                    </li>
                    <li className="flex items-center gap-2 rounded-full bg-white/25 px-3 py-1.5 backdrop-blur-sm">
                      <ClockIcon className="h-4 w-4 shrink-0" /> {t.groups.hours}
                    </li>
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </ul>

        <Reveal className="mt-8 flex flex-col items-center justify-center gap-3 rounded-[28px] bg-white/80 p-4 text-center shadow-sm backdrop-blur sm:mx-auto sm:max-w-2xl sm:flex-row sm:rounded-full sm:p-2 sm:pl-6 sm:text-left">
          <p className="text-[15px] font-bold text-ink/85 sm:flex-1">{t.groups.note}</p>
          <a
            href={SITE.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-wa inline-flex h-11 w-full items-center justify-center gap-2 rounded-full px-5 text-[14px] font-bold sm:w-auto"
          >
            <WhatsAppIcon className="h-[18px] w-[18px]" /> {t.groups.ask}
          </a>
        </Reveal>
      </div>
      <Wave fill="#ffffff" />
    </section>
  );
}
