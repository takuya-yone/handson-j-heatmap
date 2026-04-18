interface Props {
  years: string[];
  value: string;
  onChange: (year: string) => void;
}

export function YearSelector({ years, value, onChange }: Props) {
  return (
    <div className="flex items-center gap-3">
      <label htmlFor="yearSelect" className="text-sm" style={{ color: '#ccc' }}>
        表示年：
      </label>
      <select
        id="yearSelect"
        value={value}
        onChange={e => onChange(e.target.value)}
        className="px-3 py-1.5 rounded-md text-sm cursor-pointer focus:outline-none focus:ring-2"
        style={{
          background: '#16213e',
          color: '#e0e0e0',
          border: '1px solid #4a6fa5',
        }}
      >
        {years.map(y => (
          <option key={y} value={y}>
            {y}年
          </option>
        ))}
      </select>
    </div>
  );
}
