/**
 * Adham Dannaway-style section eyebrow: a mono uppercase label centered
 * between two full-width hairline rules. Label accepts a string or a
 * small node (e.g. the Signature band's yellow ● marker).
 */
export default function SectionEyebrow({
  label,
}: {
  label: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-4 sm:gap-6">
      <span aria-hidden="true" className="h-px flex-1 bg-line" />
      <p className="eyebrow text-muted">{label}</p>
      <span aria-hidden="true" className="h-px flex-1 bg-line" />
    </div>
  );
}
