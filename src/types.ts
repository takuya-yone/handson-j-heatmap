export interface Prefecture {
  id: number;
  name: string;
  population: number;
}

export type PopulationData = Record<string, Prefecture[]>;

export interface TooltipState {
  visible: boolean;
  x: number;
  y: number;
  name: string;
  population: number;
}

// GeoJSON types (minimal)
import type { Feature, FeatureCollection, Geometry } from 'geojson';

export type GeoFeatureProperties = {
  nam_ja: string;
  [key: string]: unknown;
};

export type GeoFeature = Feature<Geometry, GeoFeatureProperties>;
export type GeoFeatureCollection = FeatureCollection<Geometry, GeoFeatureProperties>;
