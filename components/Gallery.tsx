"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLang } from "./LanguageProvider";
import { SITE } from "@/lib/site";
import { Reveal } from "./Reveal";
import { SectionTitle } from "./SectionTitle";
import { Cloud, Star, Wave } from "./Decor";
import { ChevronIcon, CloseIcon, ImageIcon, InstagramIcon } from "./Icons";

const INITIAL = 6;

/* Узор «мозаики» (повторяется каждые 6 фото и заполняет сетку без пустот):
   мобильный — 2 колонки, планшет — 3 ровные колонки, десктоп — 4 колонки */
const SPAN = [
  "row-span-2 sm:row-span-1 lg:col-span-2 lg:row-span-2",
  "",
  "",
  "col-span-2 sm:col-span-1 lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-2",
];

export function Gallery({ images }: { images: string[] }) {
  const { t } = useLang();
  const [expanded, setExpanded] = useState(false);
  const [index, setIndex] = useState<number | null>(null);
  const visible = expanded ? images : images.slice(0, INITIAL);
  const sectionRef = useRef<HTMLElement>(null);

  const toggle = () => {
    if (expanded) sectionRef.current?.scrollIntoView({ behavior: "smooth" });
    setExpanded((v) => !v);
  };

  return (
    <section id="gallery" ref={sectionRef} className="relative scroll-mt-20 overflow-hidden bg-sky-light">
      <Wave fill="#DDF3FF" className="bg-white" />
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <Cloud className="float-slow absolute right-[-30px] top-24 w-36 text-white" />
        <Star className="twinkle absolute left-[8%] top-32 h-5 w-5 text-sun" />
      </div>

      <div className="relative mx-auto max-w-[1240px] px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
        <Reveal>
          <SectionTitle eyebrow={t.gallery.eyebrow} title={t.gallery.title} text={t.gallery.text} />
        </Reveal>

        {images.length === 0 ? (
          <Reveal className="mx-auto mt-10 max-w-lg rounded-[32px] border-2 border-dashed border-sky bg-white/70 p-8 text-center">
            <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-sky-light text-blue">
              <ImageIcon className="h-8 w-8" />
            </span>
            <p className="mt-4 font-display text-xl font-black text-ink">{t.gallery.empty}</p>
            <p className="mt-2 text-[15px] text-ink/70">{t.gallery.emptyHint}</p>
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ig mt-5 inline-flex h-11 items-center gap-2 rounded-full px-5 text-[14px] font-bold"
            >
              <InstagramIcon className="h-5 w-5" /> {SITE.instagramHandle}
            </a>
          </Reveal>
        ) : (
          <>
            <ul className="mt-9 grid grid-flow-dense auto-rows-[150px] grid-cols-2 gap-2.5 sm:auto-rows-[200px] sm:grid-cols-3 sm:gap-4 lg:auto-rows-[210px] lg:grid-cols-4">
              {visible.map((src, i) => (
                <Reveal
                  as="li"
                  key={src}
                  delay={(i % INITIAL) * 60}
                  className={SPAN[i % 6]}
                >
                  <button
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={t.gallery.photo(i + 1)}
                    className="group relative block h-full w-full overflow-hidden rounded-[20px] bg-white shadow-[0_14px_30px_-22px_rgba(35,120,184,.8)] sm:rounded-[28px]"
                  >
                    <Image
                      src={src}
                      alt={`${t.brand} — ${t.gallery.photo(i + 1)}`}
                      fill
                      sizes="(min-width:1024px) 40vw, (min-width:640px) 33vw, 50vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    <span className="absolute inset-0 bg-gradient-to-t from-blue/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <span className="absolute bottom-3 right-3 grid h-9 w-9 scale-75 place-items-center rounded-full bg-white/90 text-blue opacity-0 transition duration-300 group-hover:scale-100 group-hover:opacity-100">
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden>
                        <circle cx="11" cy="11" r="7" />
                        <path d="m20 20-4-4M11 8v6M8 11h6" />
                      </svg>
                    </span>
                  </button>
                </Reveal>
              ))}
            </ul>

            {images.length > INITIAL && (
              <div className="mt-8 text-center">
                <button
                  type="button"
                  onClick={toggle}
                  aria-expanded={expanded}
                  className="inline-flex h-12 items-center gap-2 rounded-full bg-blue px-7 text-[15px] font-bold text-white shadow-[0_12px_24px_-12px_rgba(35,120,184,.9)] transition hover:-translate-y-0.5 hover:bg-blue-dark"
                >
                  {expanded ? t.gallery.less : `${t.gallery.more} (+${images.length - INITIAL})`}
                  <ChevronIcon className={`h-4 w-4 transition-transform ${expanded ? "-rotate-90" : "rotate-90"}`} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
      <Wave fill="#ffffff" />

      {index !== null && (
        <Lightbox images={images} index={index} setIndex={setIndex} />
      )}
    </section>
  );
}

function Lightbox({
  images,
  index,
  setIndex,
}: {
  images: string[];
  index: number;
  setIndex: (i: number | null) => void;
}) {
  const { t } = useLang();
  const touchX = useRef<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const n = images.length;

  const go = useCallback((d: number) => setIndex((index + d + n) % n), [index, n, setIndex]);

  useEffect(() => {
    closeRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIndex(null);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, setIndex]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t.gallery.photo(index + 1)}
      className="lightbox-in fixed inset-0 z-[80] flex flex-col bg-[#0B2A44]/92 backdrop-blur-md"
      onClick={() => setIndex(null)}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
    >
      <div className="flex items-center justify-between p-3 text-white sm:p-5">
        <span className="rounded-full bg-white/15 px-3 py-1.5 text-[13px] font-bold">
          {index + 1} / {n}
        </span>
        <button
          ref={closeRef}
          type="button"
          onClick={() => setIndex(null)}
          aria-label={t.close}
          className="grid h-11 w-11 place-items-center rounded-full bg-white/15 transition hover:bg-white/25"
        >
          <CloseIcon className="h-5 w-5" />
        </button>
      </div>

      <div className="relative flex-1 px-2 pb-4 sm:px-20 sm:pb-8">
        <div className="relative h-full w-full" onClick={(e) => e.stopPropagation()}>
          <Image
            key={images[index]}
            src={images[index]}
            alt={`${t.brand} — ${t.gallery.photo(index + 1)}`}
            fill
            sizes="100vw"
            className="lightbox-img object-contain"
          />
        </div>

        {n > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                go(-1);
              }}
              aria-label={t.gallery.prev}
              className="absolute left-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/15 text-white transition hover:bg-white/30 sm:grid"
            >
              <ChevronIcon className="h-6 w-6 rotate-180" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                go(1);
              }}
              aria-label={t.gallery.next}
              className="absolute right-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/15 text-white transition hover:bg-white/30 sm:grid"
            >
              <ChevronIcon className="h-6 w-6" />
            </button>
          </>
        )}
      </div>

      {/* Мобильная навигация снизу */}
      {n > 1 && (
        <div className="flex justify-center gap-3 pb-[max(1rem,env(safe-area-inset-bottom))] sm:hidden" onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label={t.gallery.prev}
            className="grid h-12 w-12 place-items-center rounded-full bg-white/15 text-white"
          >
            <ChevronIcon className="h-6 w-6 rotate-180" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label={t.gallery.next}
            className="grid h-12 w-12 place-items-center rounded-full bg-white/15 text-white"
          >
            <ChevronIcon className="h-6 w-6" />
          </button>
        </div>
      )}
    </div>
  );
}
