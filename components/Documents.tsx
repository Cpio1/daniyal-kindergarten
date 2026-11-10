"use client";

import { useLang } from "./LanguageProvider";
import { SITE } from "@/lib/site";
import { Reveal } from "./Reveal";
import { Cloud, Star } from "./Decor";
import { ArrowIcon, DocIcon, WhatsAppIcon } from "./Icons";

export function Documents() {
  const { t } = useLang();
  const hasLink = SITE.documentsUrl.length > 0;

  return (
    <section id="documents" className="relative bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-[1040px] px-4 sm:px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-blue via-[#2E8BCB] to-sky px-6 py-10 text-white shadow-[0_30px_60px_-30px_rgba(35,120,184,.8)] sm:rounded-[48px] sm:px-12 sm:py-14">
            <Cloud className="float-slow absolute -right-6 -top-2 w-40 text-white/15 sm:w-56" />
            <Cloud className="float-slower absolute -bottom-6 left-1/3 w-36 text-white/10" />
            <Star className="twinkle absolute left-6 top-6 h-5 w-5 text-sun" />
            <Star className="twinkle absolute bottom-8 right-[30%] h-3.5 w-3.5 text-white/80 [animation-delay:1s]" />

            <div className="relative flex flex-col items-center gap-7 text-center md:flex-row md:text-left">
              <div className="relative shrink-0">
                <span className="grid h-24 w-24 rotate-[-6deg] place-items-center rounded-[30px] bg-white text-blue shadow-xl sm:h-28 sm:w-28">
                  <DocIcon className="h-12 w-12 sm:h-14 sm:w-14" />
                </span>
                <span className="absolute -bottom-2 -right-3 grid h-10 w-10 rotate-12 place-items-center rounded-2xl bg-sun font-display text-lg font-black text-ink shadow">
                  ✓
                </span>
              </div>

              <div className="flex-1">
                <span className="text-[12px] font-extrabold uppercase tracking-[0.14em] text-sun">
                  {t.docs.eyebrow}
                </span>
                <h2 className="mt-2 font-display text-[26px] font-black leading-tight sm:text-[32px]">{t.docs.title}</h2>
                <p className="mt-2 text-[15px] leading-relaxed text-white/90 sm:text-[16px]">
                  {hasLink ? t.docs.text : t.docs.soonText}
                </p>
              </div>

              <div className="flex w-full flex-col gap-2.5 md:w-auto">
                {hasLink ? (
                  <a
                    href={SITE.documentsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex h-[52px] items-center justify-center gap-2 rounded-full bg-white px-7 text-[15px] font-bold text-blue transition hover:-translate-y-0.5 hover:bg-sun hover:text-ink"
                  >
                    <DocIcon className="h-5 w-5" />
                    {t.docs.button}
                    <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                ) : (
                  <>
                    <span className="inline-flex h-[52px] cursor-default items-center justify-center gap-2 rounded-full border-2 border-dashed border-white/60 px-7 text-[15px] font-bold text-white">
                      <DocIcon className="h-5 w-5" />
                      {t.docs.button} · {t.docs.soon}
                    </span>
                    <a
                      href={SITE.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-white px-6 text-[14px] font-bold text-blue transition hover:-translate-y-0.5 hover:bg-sun hover:text-ink"
                    >
                      <WhatsAppIcon className="h-[18px] w-[18px]" /> {t.docs.ask}
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
