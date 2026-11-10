import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Groups } from "@/components/Groups";
import { Food } from "@/components/Food";
import { Gallery } from "@/components/Gallery";
import { Documents } from "@/components/Documents";
import { Contacts } from "@/components/Contacts";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { getSiteMedia } from "@/lib/media";

export default function Home() {
  // Файлы из public/images определяются во время сборки
  const media = getSiteMedia();
  const aboutMedia =
    media.secondary ?? (media.gallery[0] ? { src: media.gallery[0], type: "image" as const } : null);

  return (
    <>
      <Header logo={media.logo} />
      <main>
        <Hero image={media.hero} />
        <About media={aboutMedia} />
        <Groups />
        <Food />
        <Gallery images={media.gallery} />
        <Documents />
        <Contacts />
      </main>
      <Footer logo={media.logo} />
      <FloatingWhatsApp />
    </>
  );
}
