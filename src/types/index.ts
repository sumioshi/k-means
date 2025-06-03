export interface Point {
  id: string;
  x: number;
  y: number;
  clusterId: number;
  isCentroid: boolean;
  originalValue?: string; // Para dados categóricos
  numericValue?: number; // Valor convertido para uso em KNN
}

export interface Cluster {
  id: number;
  centroid: Point;
  points: Point[];
}