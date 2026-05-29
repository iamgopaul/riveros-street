export function SectionHeader({
  index,
  label,
  title,
  align = "left",
}: {
  index?: string;
  label: string;
  title?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "text-center" : ""}>
      <div
        className={`tick text-[11px] uppercase tracking-[0.4em] text-foreground/60 ${
          align === "center" ? "justify-center" : ""
        }`}
      >
        {index && <span className="text-accent font-mono">{index}</span>}
        <span>{label}</span>
      </div>
      {title && (
        <h2 className="mt-5 font-mono font-bold uppercase text-4xl sm:text-6xl leading-[0.95]">
          {title}
        </h2>
      )}
    </div>
  );
}
