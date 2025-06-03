export interface Point {
  id: string;
  x: number;
  y: number;
  clusterId: number;
  isCentroid: boolean;
  originalValue?: string; // For categorical data
}

export interface Cluster {
  id: number;
  centroid: Point;
  points: Point[];
}