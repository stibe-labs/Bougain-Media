const lines = [
  "M-100,200 C100,150 200,250 400,200 S700,100 900,200 S1200,300 1400,200",
  "M-100,300 C150,250 250,350 450,300 S750,200 950,300 S1250,400 1450,300",
  "M-100,400 C120,350 220,450 420,400 S720,300 920,400 S1220,500 1420,400",
  "M-100,500 C80,450 180,550 380,500 S680,400 880,500 S1180,600 1380,500",
  "M-100,600 C130,550 230,650 430,600 S730,500 930,600 S1230,700 1430,600",
];

export function TopographicLines() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden opacity-40 gpu-layer"
      aria-hidden
    >
      <svg
        className="h-full w-full"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
      >
        {lines.map((d, i) => (
          <path
            key={i}
            d={d}
            fill="none"
            stroke="#B8DBD4"
            strokeWidth="1"
            opacity={0.55 - i * 0.08}
            className="max-md:animate-none animate-pulse-glow"
            style={{ animationDelay: `${i * 0.5}s` }}
          />
        ))}
      </svg>
      <div className="topo-drift absolute inset-0 max-md:hidden">
        <svg
          className="h-full w-full"
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMidYMid slice"
        >
          {lines.map((d, i) => (
            <path
              key={`b-${i}`}
              d={d}
              fill="none"
              stroke="#B8DBD4"
              strokeWidth="0.5"
              opacity={0.25 - i * 0.03}
              transform="translate(30, 20)"
            />
          ))}
        </svg>
      </div>
    </div>
  );
}
