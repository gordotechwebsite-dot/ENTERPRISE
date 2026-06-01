const marqueeText = 'Expertos en Inmuebles ';

export default function MarqueeBanner() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 overflow-hidden border-t border-brand-200 bg-white/95 py-3 backdrop-blur-md">
      <div className="animate-marquee flex whitespace-nowrap">
        {Array.from({ length: 10 }).map((_, i) => (
          <span key={i} className="mx-6 text-[12px] font-semibold tracking-[0.2em] text-brand-400 uppercase">
            {marqueeText}
            <span className="mx-4 text-accent-300">&#x2022;</span>
          </span>
        ))}
      </div>
    </div>
  );
}
