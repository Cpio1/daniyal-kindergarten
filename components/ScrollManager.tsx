"use client";

import { useEffect } from "react";

/** Свободное место между нижним краем шапки и началом раздела. */
const GAP = 24;

/** Минимальный зазор между шапкой/низом экрана и содержимым «вписываемого» раздела. */
const FIT_MIN_GAP = 16;

/** Позиция элемента от начала документа без учёта CSS-трансформаций (анимация появления). */
function docTop(el: HTMLElement) {
  let y = 0;
  for (let n: HTMLElement | null = el; n; n = n.offsetParent as HTMLElement | null) y += n.offsetTop;
  return y;
}

/**
 * Для разделов с [data-scroll-fit] («Топтар», «Байланыс»): прокрутка, при которой
 * всё содержимое раздела (от заголовка до последнего блока, без декоративных волн
 * и внутренних отступов) целиком помещается на экране под шапкой — по центру
 * свободной области. Если содержимое выше экрана (напр. «Байланыс» на телефоне),
 * раздел выравнивается по заголовку: шапка + 24px.
 */
function fitScrollTop(section: HTMLElement): number | null {
  const content = section.querySelector<HTMLElement>("[data-scroll-content]");
  const first = content?.firstElementChild as HTMLElement | null;
  const last = content?.lastElementChild as HTMLElement | null;
  if (!first || !last) return null;

  const root = document.documentElement;
  const headerBottom = parseFloat(getComputedStyle(root).getPropertyValue("--scroll-offset")) - GAP;
  if (!Number.isFinite(headerBottom)) return null;
  const avail = window.innerHeight - headerBottom;
  const top = docTop(first);
  const height = docTop(last) + last.offsetHeight - top;

  const target =
    height + FIT_MIN_GAP * 2 <= avail
      ? top - headerBottom - (avail - height) / 2 // целиком влезает — по центру
      : top - headerBottom - GAP; // не влезает — заголовок сразу под шапкой
  const max = root.scrollHeight - window.innerHeight;
  return Math.max(0, Math.min(Math.round(target), max));
}

/**
 * Якорная навигация с учётом фиксированной шапки.
 *
 * Отступ задаётся ОДИН раз — через `scroll-padding-top: var(--scroll-offset)` на <html>.
 * Здесь мы только:
 *  1) уточняем --scroll-offset по реальной высоте шапки (разной на телефоне и компьютере);
 *  2) прокручиваем к разделу через scrollIntoView (он сам учитывает scroll-padding,
 *     поэтому отступ не применяется дважды);
 *  3) корректно открываем ссылки вида /#groups (в т.ч. после смены языка/загрузки шрифтов).
 */
export function ScrollManager() {
  useEffect(() => {
    const root = document.documentElement;
    const bar = document.querySelector<HTMLElement>("[data-header-bar]");

    // Шапка уменьшается при прокрутке (внешний отступ py-3/lg:py-4 → py-2).
    // К любому разделу, кроме самого верха, мы приходим уже с компактной шапкой,
    // поэтому считаем от её размеров: верхний отступ 0.5rem + высота панели.
    const measure = () => {
      if (!bar) return;
      const rem = parseFloat(getComputedStyle(root).fontSize) || 16;
      const compactBottom = rem * 0.5 + bar.offsetHeight;
      root.style.setProperty("--scroll-offset", `${Math.round(compactBottom + GAP)}px`);
    };
    measure();
    const ro = bar ? new ResizeObserver(measure) : null;
    if (bar) ro?.observe(bar);
    window.addEventListener("resize", measure);

    const reduceMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scrollToId = (id: string, smooth: boolean) => {
      const behavior: ScrollBehavior = smooth && !reduceMotion() ? "smooth" : "instant";
      if (id === "home" || id === "") {
        window.scrollTo({ top: 0, behavior });
        return true;
      }
      const el = document.getElementById(id);
      if (!el) return false;
      const fitTop = el.hasAttribute("data-scroll-fit") ? fitScrollTop(el) : null;
      if (fitTop !== null) window.scrollTo({ top: fitTop, behavior });
      else el.scrollIntoView({ behavior, block: "start" });
      return true;
    };

    // Клики по любым внутренним якорям: меню, мобильное меню, кнопки, футер.
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a[href^='#']");
      if (!a) return;
      const id = decodeURIComponent(a.getAttribute("href")!.slice(1));
      if (id !== "home" && !document.getElementById(id)) return;
      e.preventDefault();
      // Даём мобильному меню закрыться и снять блокировку прокрутки body,
      // затем прокручиваем (иначе плавная прокрутка может прерваться).
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          scrollToId(id, true);
          if (location.hash !== `#${id}`) history.pushState(null, "", `#${id}`);
        }),
      );
    };
    document.addEventListener("click", onClick);

    // Открытие страницы по ссылке /#section. После загрузки высота блоков над разделом
    // ещё может измениться (восстановление выбранного языка, шрифты, изображения),
    // поэтому несколько секунд при каждом изменении раскладки снова ставим раздел на место.
    // Как только пользователь сам начинает прокручивать — перестаём вмешиваться.
    let stopSettling = () => {};
    const initialId = decodeURIComponent(location.hash.slice(1));
    if (initialId && initialId !== "home") {
      let frame = 0;
      const settle = () => {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          measure();
          scrollToId(initialId, false);
        });
      };
      const layoutRo = new ResizeObserver(settle);
      layoutRo.observe(document.body);
      const userEvents = ["wheel", "touchstart", "keydown", "mousedown"] as const;
      const timer = window.setTimeout(() => stopSettling(), 3000);
      stopSettling = () => {
        layoutRo.disconnect();
        cancelAnimationFrame(frame);
        clearTimeout(timer);
        userEvents.forEach((ev) => window.removeEventListener(ev, stopSettling));
      };
      userEvents.forEach((ev) => window.addEventListener(ev, stopSettling, { passive: true, once: true }));
      (document.fonts?.ready ?? Promise.resolve()).then(settle);
    }

    return () => {
      stopSettling();
      ro?.disconnect();
      window.removeEventListener("resize", measure);
      document.removeEventListener("click", onClick);
    };
  }, []);

  return null;
}
