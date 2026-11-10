/**
 * Единый источник данных о детском саде «Даниял».
 * Меняйте значения здесь — они автоматически применятся во всех разделах сайта.
 */

export const SITE = {
  legalName: "ТОО «Маткасым» детский сад «Даниял»",
  phoneDisplay: "+7 700 088 83 15",
  phoneHref: "tel:+77000888315",
  whatsapp: "https://wa.me/77000888315",
  instagram: "https://www.instagram.com/daniyal_balabakshasyy/",
  instagramHandle: "@daniyal_balabakshasyy",
  hours: "07:30–18:00",
  groups: 4,
  ages: "2–6",
  meals: 4,

  /**
   * Ссылка на папку Google Drive с документами.
   * Пока пусто — на сайте показывается «скоро будет добавлено».
   * Пример: "https://drive.google.com/drive/folders/XXXXXXXX"
   */
  documentsUrl: "",

  /**
   * Точные координаты для карты 2GIS.
   * Заполните после проверки точки на карте (широта / долгота), например:
   * { lat: 43.2, lon: 76.6 }
   * Пока null — карта не встраивается, а маршруты строятся по адресу.
   */
  coordinates: null as { lat: number; lon: number } | null,

  /**
   * Прямая ссылка на карточку сада в 2GIS (если есть), например:
   * "https://2gis.kz/almaty/firm/XXXXXXXX"
   */
  twoGisUrl: "",

  /** ID организации в 2GIS (цифры из ссылки .../firm/XXXXXXXX) — для метки на встроенной карте. */
  twoGisFirmId: "",

  /** Адрес сайта после деплоя (используется для SEO). */
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://daniyal-balabakshasy.vercel.app",
} as const;

export const ADDRESS = {
  kk: "Алматы облысы, Жамбыл ауданы, Қайназар ауылы, Орталық көшесі, 18",
  ru: "Алматинская область, Жамбылский район, село Кайназар, улица Орталык, 18",
} as const;

/** Строка для поиска в картах (на русском — так её лучше распознают сервисы). */
const MAP_QUERY = "Алматинская область, Жамбылский район, Кайназар, улица Орталык, 18";

export function mapLinks() {
  const q = encodeURIComponent(MAP_QUERY);
  const c = SITE.coordinates;
  return {
    twoGis:
      SITE.twoGisUrl ||
      (c ? `https://2gis.kz/geo/${c.lon},${c.lat}` : `https://2gis.kz/search/${q}`),
    twoGisRoute: c
      ? `https://2gis.kz/directions/points/%7C${c.lon}%2C${c.lat}`
      : `https://2gis.kz/search/${q}`,
    google: c
      ? `https://www.google.com/maps/dir/?api=1&destination=${c.lat},${c.lon}`
      : `https://www.google.com/maps/dir/?api=1&destination=${q}`,
    yandex: c
      ? `https://yandex.kz/maps/?rtext=~${c.lat},${c.lon}&rtt=auto`
      : `https://yandex.kz/maps/?text=${q}`,
  };
}

/**
 * Группы. Точные названия и возраст по группам пока не предоставлены.
 * Когда появятся данные — заполните name / age (на двух языках).
 */
export type GroupInfo = {
  name?: { kk: string; ru: string };
  age?: { kk: string; ru: string };
};

export const GROUPS: GroupInfo[] = [{}, {}, {}, {}];

export const SECTION_IDS = [
  "home",
  "about",
  "groups",
  "food",
  "gallery",
  "documents",
  "contacts",
] as const;

export type SectionId = (typeof SECTION_IDS)[number];
