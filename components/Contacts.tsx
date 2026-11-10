"use client";

import { useLang } from "./LanguageProvider";
import { ADDRESS, SITE, mapLinks } from "@/lib/site";
import { Reveal } from "./Reveal";
import { SectionTitle } from "./SectionTitle";
import { Cloud, Star, Wave } from "./Decor";
import { ClockIcon, InstagramIcon, PhoneIcon, PinIcon, RouteIcon, WhatsAppIcon } from "./Icons";

export function Contacts() {
  const { t, lang } = useLang();
  const links = mapLinks();
  const c = SITE.coordinates;

  const items = [
    { icon: <PinIcon className="h-5 w-5" />, label: t.contacts.address, value: ADDRESS[lang], href: links.twoGis, ext: true },
    { icon: <PhoneIcon className="h-5 w-5" />, label: t.contacts.phone, value: SITE.phoneDisplay, href: SITE.phoneHref },
    { icon: <ClockIcon className="h-5 w-5" />, label: t.contacts.hours, value: t.contacts.hoursValue },
    { icon: <InstagramIcon className="h-5 w-5" />, label: t.contacts.instagram, value: SITE.instagramHandle, href: SITE.instagram, ext: true },
  ];

  return (
    <section id="contacts" data-scroll-fit className="relative overflow-hidden bg-sky-light">
      <Wave fill="#DDF3FF" className="bg-white" />
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <Cloud className="float-slower absolute -left-8 top-28 w-32 text-white" />
        <Star className="twinkle absolute right-[10%] top-24 h-5 w-5 text-sun" />
      </div>

      <div data-scroll-content className="relative mx-auto max-w-[1240px] px-4 pb-14 pt-10 sm:px-6 sm:pb-20 sm:pt-14">
        <Reveal>
          <SectionTitle eyebrow={t.contacts.eyebrow} title={t.contacts.title} text={t.contacts.text} />
        </Reveal>

        <div className="mt-10 grid gap-5 lg:grid-cols-[0.95fr_1.05fr] lg:gap-7">
          {/* Карточки контактов */}
          <Reveal className="rounded-[32px] bg-white p-4 shadow-[0_24px_50px_-34px_rgba(35,120,184,.8)] sm:p-7">
            <ul className="space-y-2.5">
              {items.map((it) => {
                const inner = (
                  <>
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-sky-light text-blue transition-colors group-hover:bg-blue group-hover:text-white">
                      {it.icon}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[12px] font-bold uppercase tracking-wider text-ink/55">{it.label}</span>
                      <span className="mt-0.5 block text-[15px] font-bold leading-snug text-ink sm:text-[16px]">{it.value}</span>
                    </span>
                  </>
                );
                return (
                  <li key={it.label}>
                    {it.href ? (
                      <a
                        href={it.href}
                        {...(it.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="group flex items-center gap-3.5 rounded-[20px] p-2.5 transition hover:bg-sky-light/60"
                      >
                        {inner}
                      </a>
                    ) : (
                      <div className="group flex items-center gap-3.5 rounded-[20px] p-2.5">{inner}</div>
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="mt-5 grid grid-cols-2 gap-2.5">
              <a
                href={SITE.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-wa inline-flex h-12 items-center justify-center gap-2 rounded-2xl text-[14px] font-bold"
              >
                <WhatsAppIcon className="h-5 w-5" /> WhatsApp
              </a>
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ig inline-flex h-12 items-center justify-center gap-2 rounded-2xl text-[14px] font-bold"
              >
                <InstagramIcon className="h-5 w-5" /> Instagram
              </a>
              <a
                href={SITE.phoneHref}
                className="col-span-2 inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-sun text-[15px] font-bold text-ink transition hover:-translate-y-0.5 hover:brightness-95"
              >
                <PhoneIcon className="h-[18px] w-[18px]" /> {SITE.phoneDisplay}
              </a>
            </div>
          </Reveal>

          {/* Карта */}
          <Reveal delay={100} className="flex flex-col overflow-hidden rounded-[32px] bg-white shadow-[0_24px_50px_-34px_rgba(35,120,184,.8)]">
            <div className="relative min-h-[260px] flex-1 sm:min-h-[320px]">
              {c ? (
                <iframe
                  title={t.contacts.mapTitle}
                  src={`https://widgets.2gis.com/widget?type=firmsonmap&options=${encodeURIComponent(
                    JSON.stringify({ pos: { lat: c.lat, lon: c.lon, zoom: 16 }, opt: { city: "almaty" }, org: SITE.twoGisFirmId }),
                  )}`}
                  className="absolute inset-0 h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              ) : (
                <MapIllustration label={t.contacts.mapTitle} address={ADDRESS[lang]} href={links.twoGis} />
              )}
            </div>

            <div className="p-4 sm:p-5">
              <p className="mb-3 flex items-center gap-2 text-[14px] font-bold text-ink/75">
                <RouteIcon className="h-4 w-4 text-blue" /> {t.contacts.mapHint}
              </p>
              <div className="grid grid-cols-3 gap-2">
                <a
                  href={links.twoGisRoute}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center justify-center rounded-2xl bg-[#1BA136] text-[14px] font-extrabold text-white transition hover:-translate-y-0.5 hover:brightness-110"
                >
                  2GIS
                </a>
                <a
                  href={links.google}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center justify-center rounded-2xl bg-sky-light text-[14px] font-extrabold text-blue transition hover:-translate-y-0.5 hover:bg-blue hover:text-white"
                >
                  Google
                </a>
                <a
                  href={links.yandex}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center justify-center rounded-2xl bg-sun/60 text-[14px] font-extrabold text-ink transition hover:-translate-y-0.5 hover:bg-sun"
                >
                  Яндекс
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/** Стилизованная «карта», пока точные координаты не указаны в lib/site.ts */
function MapIllustration({ label, address, href }: { label: string; address: string; href: string }) {
  const { t } = useLang();
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group absolute inset-0 block overflow-hidden bg-[#EAF6FD]"
      aria-label={`${t.contacts.openIn}: 2GIS`}
    >
      <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden>
        <rect width="400" height="300" fill="#EAF6FD" />
        <path d="M-20 210C80 180 140 240 240 200s140-60 200-40" stroke="#BFE6FA" strokeWidth="26" fill="none" />
        <path d="M60-10 120 320M300-10l-40 330M-10 90h420" stroke="#fff" strokeWidth="14" />
        <path d="M-10 160h420M200-10v330" stroke="#fff" strokeWidth="8" />
        <rect x="140" y="20" width="44" height="54" rx="10" fill="#D6EEDC" />
        <rect x="320" y="110" width="70" height="40" rx="10" fill="#D6EEDC" />
        <rect x="20" y="110" width="30" height="36" rx="8" fill="#FFF1CC" />
        <rect x="216" y="104" width="64" height="44" rx="10" fill="#FFF1CC" />
        <circle cx="70" cy="250" r="22" fill="#D6EEDC" />
      </svg>
      <div className="absolute left-1/2 top-[44%] -translate-x-1/2 -translate-y-full">
        <span className="absolute left-1/2 top-full h-3 w-8 -translate-x-1/2 rounded-full bg-blue/25 blur-[2px]" />
        <span className="pin-bounce relative grid h-14 w-14 place-items-center rounded-full rounded-br-none bg-blue text-white shadow-lg [transform:rotate(45deg)]">
          <span className="[transform:rotate(-45deg)]">
            <PinIcon className="h-6 w-6" />
          </span>
        </span>
      </div>
      <div className="absolute inset-x-3 bottom-3 rounded-2xl bg-white/95 p-3 shadow-md backdrop-blur sm:inset-x-5 sm:bottom-5">
        <p className="text-[12px] font-bold uppercase tracking-wider text-blue">{label}</p>
        <p className="mt-0.5 text-[14px] font-semibold leading-snug text-ink">{address}</p>
        <p className="mt-1.5 inline-flex items-center gap-1 text-[13px] font-bold text-blue group-hover:underline">
          {t.contacts.openIn} · 2GIS →
        </p>
      </div>
    </a>
  );
}
