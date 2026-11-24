import Image from "next/image";
import { Lightbulb } from "lucide-react";
import type { GuideBlock, GuideImage } from "@/content/guides";
import { PromptBlock } from "./prompt-block";
import { RichText } from "./rich-text";

export function GuideFigure({ image, priority }: { image: GuideImage; priority?: boolean }) {
  return (
    <figure className="flex flex-col gap-3">
      <div className="overflow-hidden rounded-2xl border border-line bg-night">
        <Image
          src={image.src}
          width={image.width}
          height={image.height}
          alt={image.alt}
          priority={priority}
          sizes="(max-width: 1024px) 100vw, 760px"
          className="h-auto w-full"
        />
      </div>
      {image.caption && <figcaption className="text-sm text-muted-foreground">{image.caption}</figcaption>}
    </figure>
  );
}

const ratings = [
  { name: "Keep", note: "leave it.", className: "bg-sage-soft text-sage-deep" },
  { name: "Maybe", note: "change it, and write how.", className: "bg-oat text-ink" },
  { name: "Drop", note: "remove it.", className: "bg-tomato-deep text-[#FFFDF8]" },
];

function Ratings() {
  return (
    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {ratings.map((r) => (
        <li key={r.name} className="flex flex-col gap-3 rounded-2xl border border-line bg-raised p-4">
          <span className={`w-fit rounded-full px-3 py-1 text-sm font-semibold ${r.className}`}>{r.name}</span>
          <span className="text-sm leading-relaxed text-muted-foreground">{r.note}</span>
        </li>
      ))}
    </ul>
  );
}

export function GuideBlockView({ block }: { block: GuideBlock }) {
  switch (block.type) {
    case "p":
      return (
        <p className="text-lg leading-relaxed text-muted-foreground">
          <RichText text={block.text} />
        </p>
      );
    case "h3":
      return <h3 className="mt-4 text-xl font-semibold text-foreground">{block.text}</h3>;
    case "prompt":
      return <PromptBlock label={block.label} text={block.text} />;
    case "tip":
      return (
        <aside className="flex gap-3 rounded-2xl bg-sage-soft p-4 text-ink md:p-5">
          <Lightbulb size={18} className="mt-0.5 shrink-0 text-sage-deep" aria-hidden="true" />
          <p className="leading-relaxed">
            <span className="sr-only">Tip: </span>
            <RichText text={block.text} />
          </p>
        </aside>
      );
    case "image":
      return <GuideFigure image={block.image} />;
    case "ratings":
      return <Ratings />;
    case "list": {
      const items = block.items.map((item, i) => (
        <li key={i} className="flex gap-3 leading-relaxed text-foreground/85">
          {block.ordered ? (
            <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-surface font-mono text-xs text-foreground">
              {i + 1}
            </span>
          ) : (
            <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-tomato" aria-hidden="true" />
          )}
          <span className="min-w-0">
            <RichText text={item} />
          </span>
        </li>
      ));
      return block.ordered ? (
        <ol className="flex flex-col gap-3">{items}</ol>
      ) : (
        <ul className="flex flex-col gap-3">{items}</ul>
      );
    }
    case "table":
      return <GuideTable head={block.head} rows={block.rows} />;
  }
}

/** Two-column table; stacks into cards on small screens. */
export function GuideTable({ head, rows }: { head: [string, string]; rows: [string, string][] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-line">
      <table className="w-full border-collapse text-left">
        <thead className="hidden bg-surface sm:table-header-group">
          <tr>
            <th scope="col" className="w-2/5 px-4 py-3 font-mono text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
              {head[0]}
            </th>
            <th scope="col" className="px-4 py-3 font-mono text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
              {head[1]}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([a, b]) => (
            <tr key={a} className="flex flex-col border-t border-line first:border-t-0 sm:table-row sm:first:border-t">
              <th scope="row" className="px-4 pt-4 font-semibold text-foreground sm:py-3.5 sm:align-top">
                <RichText text={a} />
              </th>
              <td className="px-4 pb-4 pt-1 leading-relaxed text-muted-foreground sm:py-3.5">
                <RichText text={b} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
