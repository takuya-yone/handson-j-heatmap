import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import type { GeoFeatureCollection, PopulationData, TooltipState } from '../types';

type TooltipSetter = React.Dispatch<React.SetStateAction<TooltipState>>;

interface Props {
  geoJson: GeoFeatureCollection;
  populationData: PopulationData;
  year: string;
  globalMax: number;
  onTooltipChange: TooltipSetter;
}

const SVG_W = 960;
const SVG_H = 600;

export function JapanMap({ geoJson, populationData, year, globalMax, onTooltipChange }: Props) {
  const svgRef = useRef<SVGSVGElement>(null);

  // Draw map paths once when geoJson is loaded
  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const projection = d3.geoMercator()
      .center([137, 35.5])
      .scale(1600)
      .translate([SVG_W / 2, SVG_H / 2]);

    const pathGen = d3.geoPath().projection(projection);

    svg.selectAll<SVGPathElement, (typeof geoJson.features)[number]>('path')
      .data(geoJson.features)
      .join('path')
      .attr('class', 'prefecture')
      .attr('d', d => pathGen(d as d3.GeoPermissibleObjects))
      .attr('stroke', '#2a2a4a')
      .attr('stroke-width', 0.5)
      .style('cursor', 'pointer')
      .style('transition', 'opacity 0.15s');
  }, [geoJson]);

  // Update colors when year changes
  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    const yearData = populationData[year] ?? [];
    const popMap = new Map(yearData.map(d => [d.name, d.population]));

    const colorScale = d3.scaleSequential()
      .domain([0, globalMax])
      .interpolator(d3.interpolateBlues);

    svg.selectAll<SVGPathElement, (typeof geoJson.features)[number]>('path.prefecture')
      .attr('fill', d => {
        const pop = popMap.get(d.properties.nam_ja);
        return pop != null ? colorScale(pop) : '#333';
      })
      .on('mouseover', function (event: MouseEvent, d) {
        d3.select(this).attr('opacity', 0.75).attr('stroke', '#ffffff').attr('stroke-width', 1.5);
        const pop = popMap.get(d.properties.nam_ja);
        if (pop != null) {
          onTooltipChange({
            visible: true,
            x: event.clientX,
            y: event.clientY,
            name: d.properties.nam_ja,
            population: pop,
          });
        }
      })
      .on('mousemove', function (event: MouseEvent) {
        onTooltipChange(prev => ({ ...prev, x: event.clientX, y: event.clientY }));
      })
      .on('mouseout', function () {
        d3.select(this).attr('opacity', 1).attr('stroke', '#2a2a4a').attr('stroke-width', 0.5);
        onTooltipChange(prev => ({ ...prev, visible: false }));
      });
  }, [geoJson, populationData, year, globalMax, onTooltipChange]);

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${SVG_W} ${SVG_H}`}
      preserveAspectRatio="xMidYMid meet"
      className="w-full h-auto"
    />
  );
}
