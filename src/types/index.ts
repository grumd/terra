export type Point3d = {
  x: number;
  y: number;
  z: number;
};

export type Point2d = {
  x: number;
  y: number;
};

export type Polygon<ParentObject = unknown> = {
  points: Point3d[];
  normalVector: Point3d;
  stroke?: string;
  fill?: string;
  parentObject?: ParentObject;
};

export type ProjectedPolygon<ParentObject = unknown> = Polygon<ParentObject> & {
  points: Point2d[];
  zIndexMin: number;
  zIndexMax: number;
  zIndexAvg: number;
};
