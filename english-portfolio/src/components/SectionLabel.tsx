export function SectionLabel({ index, label, className = '' }: { index: string; label: string; className?: string }) {
  return (
    <div className={`flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.28em] ${className}`}>
      <span>{index}</span>
      <span className="h-px w-12 bg-current opacity-50" />
      <span>{label}</span>
    </div>
  );
}
