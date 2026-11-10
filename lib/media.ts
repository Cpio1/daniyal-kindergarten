import fs from "node:fs";
import path from "node:path";

/**
 * Сканирует public/images во время сборки и возвращает только реально
 * существующие файлы — поэтому на сайте никогда не будет «битых» картинок.
 */

const IMAGE_EXT = ["webp", "avif", "jpg", "jpeg", "png"];
const VIDEO_EXT = ["mp4", "webm", "mov"];

export type Media = { src: string; type: "image" | "video" };

export type SiteMedia = {
  logo: string | null;
  hero: string | null;
  secondary: Media | null;
  gallery: string[];
};

function listFiles(): string[] {
  const dir = path.join(process.cwd(), "public", "images");
  try {
    return fs.readdirSync(dir).filter((f) => !f.startsWith("."));
  } catch {
    return [];
  }
}

function find(files: string[], base: string, exts: string[]): string | null {
  for (const ext of exts) {
    const hit = files.find((f) => f.toLowerCase() === `${base}.${ext}`);
    if (hit) return `/images/${hit}`;
  }
  return null;
}

export function getSiteMedia(): SiteMedia {
  const files = listFiles();

  const secondaryVideo = find(files, "main-page2", VIDEO_EXT);
  const secondaryImage = find(files, "main-page2", IMAGE_EXT);

  const gallery = files
    .map((f) => {
      const m = /^image(\d+)\.([a-z0-9]+)$/i.exec(f);
      return m && IMAGE_EXT.includes(m[2].toLowerCase())
        ? { n: Number(m[1]), src: `/images/${f}` }
        : null;
    })
    .filter((x): x is { n: number; src: string } => x !== null)
    .sort((a, b) => a.n - b.n)
    .map((x) => x.src);

  return {
    logo: find(files, "logo", ["png", "svg", "webp"]),
    hero: find(files, "main-page", IMAGE_EXT),
    secondary: secondaryVideo
      ? { src: secondaryVideo, type: "video" }
      : secondaryImage
        ? { src: secondaryImage, type: "image" }
        : null,
    gallery,
  };
}
