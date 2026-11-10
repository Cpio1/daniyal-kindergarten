import type { SectionId } from "./site";

export type Lang = "kk" | "ru";

type Dict = {
  brand: string;
  brandShort: string;
  nav: Record<SectionId, string>;
  menu: string;
  close: string;
  writeWhatsapp: string;
  call: string;
  hero: {
    badge: string;
    title1: string;
    title2: string;
    subtitle: string;
    contact: string;
    about: string;
    chips: string[];
    photoAlt: string;
  };
  about: {
    eyebrow: string;
    title: string;
    text1: string;
    text2: string;
    cards: { value: string; label: string }[];
    photoAlt: string;
  };
  groups: {
    eyebrow: string;
    title: string;
    text: string;
    group: (n: number) => string;
    ageDefault: string;
    language: string;
    hours: string;
    note: string;
    ask: string;
  };
  food: {
    eyebrow: string;
    title: string;
    text: string;
    meal: (n: number) => string;
    mealText: string;
    note: string;
    ask: string;
  };
  gallery: {
    eyebrow: string;
    title: string;
    text: string;
    more: string;
    less: string;
    empty: string;
    emptyHint: string;
    photo: (n: number) => string;
    prev: string;
    next: string;
  };
  docs: {
    eyebrow: string;
    title: string;
    text: string;
    button: string;
    soon: string;
    soonText: string;
    ask: string;
  };
  contacts: {
    eyebrow: string;
    title: string;
    text: string;
    address: string;
    phone: string;
    hours: string;
    hoursValue: string;
    instagram: string;
    route: string;
    openIn: string;
    mapTitle: string;
    mapHint: string;
  };
  footer: {
    sections: string;
    contacts: string;
    rights: string;
  };
};

export const dict: Record<Lang, Dict> = {
  kk: {
    brand: "«Даниял» балабақшасы",
    brandShort: "балабақшасы",
    nav: {
      home: "Басты бет",
      about: "Балабақша туралы",
      groups: "Топтар",
      food: "Тамақтану",
      gallery: "Галерея",
      documents: "Құжаттар",
      contacts: "Байланыс",
    },
    menu: "Мәзір",
    close: "Жабу",
    writeWhatsapp: "WhatsApp-қа жазу",
    call: "Қоңырау",
    hero: {
      badge: "Жеке балабақша · Қайназар ауылы",
      title1: "«Даниял» балабақшасына",
      title2: "қош келдіңіз!",
      subtitle: "Балаңыздың бақытты балалық шағы үшін жайлы орта",
      contact: "Бізбен байланысу",
      about: "Балабақша туралы",
      chips: ["2–6 жас", "4 топ", "07:30–18:00"],
      photoAlt: "«Даниял» балабақшасы",
    },
    about: {
      eyebrow: "Біз туралы",
      title: "Балаға арналған жылы әрі қауіпсіз орта",
      text1:
        "«Даниял» — Алматы облысы, Жамбыл ауданы, Қайназар ауылындағы жеке балабақша. Біз 2 мен 6 жас аралығындағы балаларды қабылдаймыз.",
      text2:
        "Тәрбие мен оқу қазақ тілінде жүргізіледі. Балабақша 07:30-дан 18:00-ге дейін жұмыс істейді, балалар күніне 4 мезгіл тамақтанады.",
      cards: [
        { value: "4", label: "топ" },
        { value: "2–6", label: "жас" },
        { value: "ҚАЗ", label: "Қазақ тілінде тәрбие" },
        { value: "4", label: "мезгіл тамақтану" },
      ],
      photoAlt: "«Даниял» балабақшасының фотосы",
    },
    groups: {
      eyebrow: "Біздің топтар",
      title: "Балабақшада 4 топ жұмыс істейді",
      text: "Әр топ 2–6 жас аралығындағы балаларға арналған. Топтардың атаулары мен жас ерекшеліктері туралы толық ақпаратты бізден сұраңыз.",
      group: (n) => `${n}-топ`,
      ageDefault: "2–6 жас аралығы",
      language: "Қазақ тілінде тәрбие",
      hours: "07:30–18:00",
      note: "Балаңызға қай топ лайық екенін білгіңіз келе ме?",
      ask: "Топ туралы сұрау",
    },
    food: {
      eyebrow: "Тамақтану",
      title: "Күніне 4 мезгіл тамақтану",
      text: "Балабақшада болған уақытта балалар күніне төрт рет тамақтанады. Мәзір мен тамақтану кестесі туралы толық ақпаратты бізден біле аласыз.",
      meal: (n) => `${n}-мезгіл`,
      mealText: "Күн тәртібіне сай",
      note: "Мәзір туралы сұрақтарыңыз бар ма?",
      ask: "Мәзір туралы сұрау",
    },
    gallery: {
      eyebrow: "Галерея",
      title: "Балабақшадағы күндеріміз",
      text: "Біздің балабақшаның өмірінен суреттер.",
      more: "Көбірек көрсету",
      less: "Жасыру",
      empty: "Фотосуреттер жақында қосылады",
      emptyHint: "Әзірге жаңалықтарымызды Instagram парақшамыздан көре аласыз.",
      photo: (n) => `Фото ${n}`,
      prev: "Алдыңғы",
      next: "Келесі",
    },
    docs: {
      eyebrow: "Құжаттар",
      title: "Балабақшаның құжаттары",
      text: "Балабақшаның ресми құжаттарымен танысуға болады.",
      button: "Құжаттар",
      soon: "Жақында қосылады",
      soonText: "Құжаттарға сілтеме жақында осында пайда болады. Қазір қажет болса, бізге WhatsApp арқылы жазыңыз.",
      ask: "WhatsApp арқылы сұрау",
    },
    contacts: {
      eyebrow: "Байланыс",
      title: "Бізге келіңіз немесе жазыңыз",
      text: "Сұрақтарыңызға қуана жауап береміз.",
      address: "Мекенжай",
      phone: "Телефон",
      hours: "Жұмыс уақыты",
      hoursValue: "07:30–18:00",
      instagram: "Instagram",
      route: "Маршрут құру",
      openIn: "Картадан ашу",
      mapTitle: "Біз картада",
      mapHint: "Маршрутты өзіңізге ыңғайлы қосымшада құрыңыз",
    },
    footer: {
      sections: "Бөлімдер",
      contacts: "Байланыс",
      rights: "Барлық құқықтар қорғалған.",
    },
  },
  ru: {
    brand: "Детский сад «Даниял»",
    brandShort: "детский сад",
    nav: {
      home: "Главная",
      about: "О садике",
      groups: "Группы",
      food: "Питание",
      gallery: "Галерея",
      documents: "Документы",
      contacts: "Контакты",
    },
    menu: "Меню",
    close: "Закрыть",
    writeWhatsapp: "Написать в WhatsApp",
    call: "Звонок",
    hero: {
      badge: "Частный детский сад · село Кайназар",
      title1: "Добро пожаловать",
      title2: "в детский сад «Даниял»!",
      subtitle: "Уютная среда для счастливого детства вашего ребёнка",
      contact: "Связаться с нами",
      about: "О детском саде",
      chips: ["2–6 лет", "4 группы", "07:30–18:00"],
      photoAlt: "Детский сад «Даниял»",
    },
    about: {
      eyebrow: "О нас",
      title: "Тёплая и безопасная среда для ребёнка",
      text1:
        "«Даниял» — частный детский сад в селе Кайназар Жамбылского района Алматинской области. Мы принимаем детей от 2 до 6 лет.",
      text2:
        "Воспитание и обучение ведётся на казахском языке. Сад работает с 07:30 до 18:00, дети питаются 4 раза в день.",
      cards: [
        { value: "4", label: "группы" },
        { value: "2–6", label: "лет" },
        { value: "ҚАЗ", label: "Воспитание на казахском" },
        { value: "4", label: "разовое питание" },
      ],
      photoAlt: "Фото детского сада «Даниял»",
    },
    groups: {
      eyebrow: "Наши группы",
      title: "В детском саду 4 группы",
      text: "Группы рассчитаны на детей от 2 до 6 лет. Подробную информацию о названиях групп и возрастах уточняйте у нас.",
      group: (n) => `Группа ${n}`,
      ageDefault: "Дети 2–6 лет",
      language: "Воспитание на казахском",
      hours: "07:30–18:00",
      note: "Хотите узнать, какая группа подойдёт вашему ребёнку?",
      ask: "Узнать о группе",
    },
    food: {
      eyebrow: "Питание",
      title: "Питание 4 раза в день",
      text: "Во время пребывания в саду дети питаются четыре раза в день. Подробнее о меню и графике питания можно узнать у нас.",
      meal: (n) => `${n}-й приём пищи`,
      mealText: "По режиму дня",
      note: "Есть вопросы о меню?",
      ask: "Спросить о меню",
    },
    gallery: {
      eyebrow: "Галерея",
      title: "Наши дни в детском саду",
      text: "Фотографии из жизни нашего детского сада.",
      more: "Показать больше",
      less: "Скрыть",
      empty: "Фотографии скоро появятся",
      emptyHint: "А пока наши новости можно посмотреть в Instagram.",
      photo: (n) => `Фото ${n}`,
      prev: "Предыдущее",
      next: "Следующее",
    },
    docs: {
      eyebrow: "Документы",
      title: "Документы детского сада",
      text: "Здесь можно ознакомиться с официальными документами детского сада.",
      button: "Документы",
      soon: "Скоро будет добавлено",
      soonText: "Ссылка на документы скоро появится здесь. Если нужно сейчас — напишите нам в WhatsApp.",
      ask: "Спросить в WhatsApp",
    },
    contacts: {
      eyebrow: "Контакты",
      title: "Приходите к нам или напишите",
      text: "С радостью ответим на ваши вопросы.",
      address: "Адрес",
      phone: "Телефон",
      hours: "Режим работы",
      hoursValue: "07:30–18:00",
      instagram: "Instagram",
      route: "Построить маршрут",
      openIn: "Открыть на карте",
      mapTitle: "Мы на карте",
      mapHint: "Постройте маршрут в удобном приложении",
    },
    footer: {
      sections: "Разделы",
      contacts: "Контакты",
      rights: "Все права защищены.",
    },
  },
};
