import * as d3 from 'd3';

interface Props {
  globalMax: number;
}

const LEGEND_W = 280;
const LEGEND_H = 20;
const OFFSET_X = 10;
const OFFSET_Y = 10;
const STEPS = 10;

export function Legend({ globalMax }: Props) {
  const colorScale = d3.scaleSequential()
    .domain([0, globalMax])
    .interpolator(d3.interpolateBlues);

  const stops = Array.from({ length: STEPS + 1 }, (_, i) => ({
    offset: `${(i / STEPS) * 100}%`,
    color: colorScale((globalMax * i) / STEPS),
  }));

  const tickValues = [0, 300, 600, 900, 1200, 1500];
  const legendScale = d3.scaleLinear()
    .domain([0, globalMax / 10_000])
    .range([OFFSET_X, OFFSET_X + LEGEND_W]);

  return (
    <div className="mt-4 flex flex-col items-center gap-1">
      <svg width={LEGEND_W + OFFSET_X * 2} height={OFFSET_Y + LEGEND_H + 20}>
        <defs>
          <linearGradient id="legend-gradient" x1="0%" x2="100%">
            {stops.map(s => (
              <stop key={s.offset} offset={s.offset} stopColor={s.color} />
            ))}
          </linearGradient>
        </defs>
        <rect
          x={OFFSET_X}
          y={OFFSET_Y}
          width={LEGEND_W}
          height={LEGEND_H}
          fill="url(#legend-gradient)"
          rx={3}
        />
        {tickValues.map(v => {
          const x = legendScale(v);
          return (
            <g key={v}>
              <line
                x1={x} x2={x}
                y1={OFFSET_Y + LEGEND_H}
                y2={OFFSET_Y + LEGEND_H + 4}
                stroke="#aaa"
                strokeWidth={1}
              />
              <text
                x={x}
                y={OFFSET_Y + LEGEND_H + 14}
                textAnchor="middle"
                fontSize={10}
                fill="#aaa"
              >
                {v === 0 ? '0' : v}
              </text>
            </g>
          );
        })}
      </svg>
      <span className="text-xs text-gray-500">人口（万人）</span>
    </div>
  );
}
