import { SparkIcon } from "./Icons";

export function SectionTitle({
  eyebrow,
  title,
  text,
  align = "center",
  light = false,
}: {
  eyebrow: string;
  title: string;
  text?: string;
  align?: "center" | "left";
  light?: boolean;
}) {
  const center = align === "center";
  return (
    <div className={`${center ? "mx-auto text-center" : "text-center lg:text-left"} max-w-2xl`}>
      <span
        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[12px] font-extrabold uppercase tracking-[0.14em] ${
          light ? "bg-white/20 text-white" : "bg-sky-light text-blue"
        }`}
      >
        <SparkIcon className={`h-3.5 w-3.5 ${light ? "text-sun" : "text-sky"}`} />
        {eyebrow}
      </span>
      <h2
        className={`mt-3 font-display text-[26px] font-black leading-tight tracking-tight sm:text-[34px] lg:text-[38px] ${
          light ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {text && (
        <p className={`mt-3 text-[15px] leading-relaxed sm:text-[16px] ${light ? "text-white/90" : "text-ink/70"}`}>
          {text}
        </p>
      )}
    </div>
  );
}
