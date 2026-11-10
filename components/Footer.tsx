"use client";

import { useLang } from "./LanguageProvider";
import { ADDRESS, SECTION_IDS, SITE } from "@/lib/site";
import { Cloud, Star } from "./Decor";
import { ClockIcon, InstagramIcon, PhoneIcon, PinIcon, WhatsAppIcon } from "./Icons";
import { Logo } from "./Header";

export function Footer({ logo }: { logo: string | null }) {
  const { t, lang } = useLang();

  return (
    <footer className="relative overflow-hidden bg-[#0F3D63] text-white">
      <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="block h-8 w-full bg-sky-light md:h-12" aria-hidden>
        <path d="M0 30c160-30 320-30 480-6s320 34 480 16 320-38 480-26v46H0Z" fill="#0F3D63" />
      </svg>
      <Cloud className="float-slower absolute right-[6%] top-16 w-32 text-white/5" />
      <Star className="twinkle absolute left-[48%] top-20 h-4 w-4 text-sun/70" />

      <div className="relative mx-auto grid max-w-[1240px] gap-10 px-4 pb-8 pt-8 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1.2fr] lg:pt-10">
        <div>
          <div className="inline-block rounded-2xl bg-white px-3 py-2">
            <Logo logo={logo} compact />
          </div>
          <p className="mt-4 max-w-sm text-[14px] leading-relaxed text-white/75">{t.hero.subtitle}</p>
          <p className="mt-3 text-[13px] text-white/55">{SITE.legalName}</p>
          <div className="mt-5 flex gap-2.5">
            <a
              href={SITE.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="grid h-11 w-11 place-items-center rounded-full bg-white/10 transition hover:-translate-y-0.5 hover:bg-[#25D366]"
            >
              <WhatsAppIcon className="h-5 w-5" />
            </a>
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="grid h-11 w-11 place-items-center rounded-full bg-white/10 transition hover:-translate-y-0.5 hover:bg-[#E1306C]"
            >
              <InstagramIcon className="h-5 w-5" />
            </a>
            <a
              href={SITE.phoneHref}
              aria-label={SITE.phoneDisplay}
              className="grid h-11 w-11 place-items-center rounded-full bg-white/10 transition hover:-translate-y-0.5 hover:bg-sun hover:text-ink"
            >
              <PhoneIcon className="h-[18px] w-[18px]" />
            </a>
          </div>
        </div>

        <nav aria-label={t.footer.sections}>
          <p className="font-display text-[16px] font-extrabold text-sun">{t.footer.sections}</p>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 text-[14px]">
            {SECTION_IDS.map((id) => (
              <li key={id}>
                <a href={`#${id}`} className="text-white/80 transition hover:text-white hover:underline">
                  {t.nav[id]}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="font-display text-[16px] font-extrabold text-sun">{t.footer.contacts}</p>
          <ul className="mt-4 space-y-3 text-[14px] text-white/85">
            <li className="flex gap-2.5">
              <PinIcon className="mt-0.5 h-[18px] w-[18px] shrink-0 text-sky" />
              {ADDRESS[lang]}
            </li>
            <li className="flex gap-2.5">
              <ClockIcon className="mt-0.5 h-[18px] w-[18px] shrink-0 text-sky" />
              {t.contacts.hours}: {SITE.hours}
            </li>
            <li>
              <a href={SITE.phoneHref} className="flex gap-2.5 transition hover:text-white">
                <PhoneIcon className="mt-0.5 h-[18px] w-[18px] shrink-0 text-sky" />
                {SITE.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-2.5 transition hover:text-white"
              >
                <InstagramIcon className="mt-0.5 h-[18px] w-[18px] shrink-0 text-sky" />
                {SITE.instagramHandle}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <p className="mx-auto max-w-[1240px] px-4 py-5 pb-24 text-center text-[13px] text-white/55 sm:px-6 sm:pb-5 md:text-left">
          © 2026 {t.brand}. {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}
