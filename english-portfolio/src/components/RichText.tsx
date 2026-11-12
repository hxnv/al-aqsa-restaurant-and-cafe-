import { Fragment } from 'react';

/** Renders **bold** as highlighted concepts and *text* as italics. */
export function RichText({ text, markClass = '' }: { text: string; markClass?: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <mark key={i} className={`rounded-none bg-transparent px-0 font-semibold text-inherit ${markClass}`}>
              {part.slice(2, -2)}
            </mark>
          );
        }
        if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
          return <em key={i} className="font-accent text-[1.12em] italic">{part.slice(1, -1)}</em>;
        }
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}
