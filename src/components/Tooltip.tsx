import type { TooltipState } from '../types';

interface Props {
  tooltip: TooltipState;
  year: string;
}

export function Tooltip({ tooltip, year }: Props) {
  if (!tooltip.visible) return null;

  return (
    <div
      className="fixed z-50 pointer-events-none rounded-lg px-3 py-2 text-sm leading-relaxed"
      style={{
        left: tooltip.x + 14,
        top: tooltip.y - 10,
        background: 'rgba(22, 33, 62, 0.95)',
        border: '1px solid #4a6fa5',
      }}
    >
      <p className="font-bold text-base" style={{ color: '#a8d8ea' }}>
        {tooltip.name}
      </p>
      <p style={{ color: '#e0e0e0' }}>
        人口: <strong>{tooltip.population.toLocaleString()}</strong> 人
      </p>
      <p className="text-gray-400 text-xs">（{year}年）</p>
    </div>
  );
}
