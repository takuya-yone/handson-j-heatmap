import { useState, useEffect } from 'react';
import type { PopulationData, GeoFeatureCollection, TooltipState } from './types';
import populationJson from '../data/population.json';
import { JapanMap } from './components/JapanMap';
import { YearSelector } from './components/YearSelector';
import { Legend } from './components/Legend';
import { Tooltip } from './components/Tooltip';
import * as d3 from 'd3';

const POPULATION_DATA = populationJson as PopulationData;
const GEOJSON_URL = 'https://raw.githubusercontent.com/dataofjapan/land/master/japan.geojson';
const YEARS = Object.keys(POPULATION_DATA).sort((a, b) => +b - +a);

const allPopulations = Object.values(POPULATION_DATA).flat().map(d => d.population);
const GLOBAL_MAX = d3.max(allPopulations) ?? 15_000_000;

export default function App() {
  const [selectedYear, setSelectedYear] = useState<string>(YEARS[0]);
  const [geoJson, setGeoJson] = useState<GeoFeatureCollection | null>(null);
  const [geoError, setGeoError] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<TooltipState>({
    visible: false,
    x: 0,
    y: 0,
    name: '',
    population: 0,
  });

  useEffect(() => {
    d3.json<GeoFeatureCollection>(GEOJSON_URL)
      .then(data => {
        if (data) setGeoJson(data);
      })
      .catch(() => setGeoError('地図データの読み込みに失敗しました。インターネット接続を確認してください。'));
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen px-4 py-6">
      <h1 className="text-2xl font-bold mb-4 tracking-wide" style={{ color: '#a8d8ea' }}>
        🗾 日本都道府県別人口ヒートマップ
      </h1>

      <YearSelector
        years={YEARS}
        value={selectedYear}
        onChange={setSelectedYear}
      />

      <div className="w-full max-w-4xl mt-4">
        {geoError ? (
          <div className="flex items-center justify-center h-64 rounded-xl border border-red-500/40 bg-red-900/20">
            <p className="text-red-400 text-center">{geoError}</p>
          </div>
        ) : !geoJson ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-gray-400 animate-pulse">地図データを読み込み中...</div>
          </div>
        ) : (
          <JapanMap
            geoJson={geoJson}
            populationData={POPULATION_DATA}
            year={selectedYear}
            globalMax={GLOBAL_MAX}
            onTooltipChange={setTooltip}
          />
        )}
      </div>

      <Legend globalMax={GLOBAL_MAX} />

      <p className="mt-6 text-xs text-gray-500">
        データ出典: e-Stat 政府統計の総合窓口（国勢調査）
      </p>

      <Tooltip tooltip={tooltip} year={selectedYear} />
    </div>
  );
}
