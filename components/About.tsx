"use client";

import Image from "next/image";
import { useLang } from "./LanguageProvider";
import type { Media } from "@/lib/media";
import { Reveal } from "./Reveal";
import { SectionTitle } from "./SectionTitle";
import { Cloud, Star, Sun } from "./Decor";
import { ChatIcon, HeartIcon, UsersIcon } from "./Icons";

const CARD_STYLES = [
  { bg: "bg-sky-light", text: "text-blue", icon: <UsersIcon className="h-5 w-5" /> },
  { bg: "bg-sun/45", text: "text-[#8A5A00]", icon: <HeartIcon className="h-5 w-5" /> },
  { bg: "bg-[#E3F7EC]", text: "text-[#1E7A4C]", icon: <ChatIcon className="h-5 w-5" /> },
  { bg: "bg-[#FFE8E3]", text: "text-[#B24A35]", icon: <span className="text-lg leading-none">🍎</span> },
];

export function About({ media }: { media: Media | null }) {
  const { t } = useLang();

  return (
    <section id="about" className="relative scroll-mt-20 bg-white py-14 sm:py-20 lg:py-24">
      <div className="mx-auto grid max-w-[1240px] items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
        {/* Фото */}
        <Reveal className="relative order-2 mx-auto w-full max-w-[520px] lg:order-1">
          <div className="absolute -left-4 -top-4 h-full w-full rounded-[40px] bg-sky-light sm:-left-6 sm:-top-6" aria-hidden />
          <Star className="absolute -right-2 top-6 z-10 h-7 w-7 text-sun twinkle" />
          <div className="relative aspect-[4/3.6] overflow-hidden rounded-[32px] rounded-tr-[90px] bg-gradient-to-br from-sky-light to-white shadow-[0_24px_50px_-28px_rgba(35,120,184,.6)] sm:rounded-[40px] sm:rounded-tr-[120px]">
            {media?.type === "video" ? (
              <video
                src={media.src}
                className="h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label={t.about.photoAlt}
              />
            ) : media ? (
              <Image
                src={media.src}
                alt={t.about.photoAlt}
                fill
                sizes="(min-width:1024px) 520px, 92vw"
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 grid place-items-center">
                <Cloud className="float-slow absolute left-[10%] top-[14%] w-24 text-white" />
                <Cloud className="float-slower absolute bottom-[16%] right-[8%] w-28 text-white" />
                <Sun className="w-32 sm:w-40" />
              </div>
            )}
          </div>
        </Reveal>

        {/* Текст */}
        <div className="order-1 lg:order-2">
          <Reveal>
            <SectionTitle eyebrow={t.about.eyebrow} title={t.about.title} align="left" />
            <p className="mt-4 text-center text-[15px] leading-relaxed text-ink/75 sm:text-[16px] lg:text-left">
              {t.about.text1}
            </p>
            <p className="mt-3 text-center text-[15px] leading-relaxed text-ink/75 sm:text-[16px] lg:text-left">
              {t.about.text2}
            </p>
          </Reveal>

          <ul className="mt-7 grid grid-cols-2 gap-3 sm:gap-4">
            {t.about.cards.map((c, i) => {
              const s = CARD_STYLES[i];
              return (
                <Reveal as="li" key={i} delay={i * 80}>
                  <div
                    className={`group relative h-full overflow-hidden rounded-[24px] ${s.bg} p-4 transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_30px_-18px_rgba(35,120,184,.55)] sm:rounded-[28px] sm:p-5`}
                  >
                    <span
                      className={`grid h-9 w-9 place-items-center rounded-full bg-white ${s.text} shadow-sm transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110`}
                    >
                      {s.icon}
                    </span>
                    <p className={`mt-3 font-display text-[26px] font-black leading-none sm:text-[30px] ${s.text}`}>
                      {c.value}
                    </p>
                    <p className="mt-1.5 text-[13px] font-bold leading-snug text-ink/80 sm:text-[14px]">{c.label}</p>
                    <span aria-hidden className="absolute -bottom-6 -right-6 h-20 w-20 rounded-full bg-white/40" />
                  </div>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
