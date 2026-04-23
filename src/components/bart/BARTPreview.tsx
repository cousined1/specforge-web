import Link from 'next/link';

export interface BARTPreviewProps {
  eyebrow: string;
  title: string;
  description: string;
}

export default function BARTPreview({ eyebrow, title, description }: BARTPreviewProps) {
  return (
    <section className="mx-auto max-w-3xl px-4 py-20 md:px-6">
      <div className="rounded-xl border border-surface bg-surface p-8 md:p-12">
        <span className="inline-flex items-center rounded-full border border-surface bg-background px-3 py-1 text-xs font-semibold uppercase tracking-wide text-muted">
          {eyebrow}
        </span>
        <h1 className="mt-4 text-3xl font-bold text-white md:text-4xl">{title}</h1>
        <p className="mt-4 text-sm text-muted md:text-base">{description}</p>
        <p className="mt-4 text-sm text-muted">
          This view is part of the BART orchestration preview and is not yet wired to live provenance
          services. Existing customers can request early access while we roll the feature out.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/product/"
            className="rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-background hover:bg-secondary"
          >
            Explore features
          </Link>
          <Link
            href="/contact/"
            className="rounded-md border border-surface px-5 py-2.5 text-sm font-medium text-white hover:bg-background"
          >
            Request early access
          </Link>
        </div>
      </div>
    </section>
  );
}
