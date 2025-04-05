import { FC, LazyExoticComponent } from 'react';

export type RouteArrayItem = {
  name?: string;
  path: string;
  component?: FC | LazyExoticComponent<FC>;
  children?: RouteArrayItem[];
};

export type RoutesConfig = RouteArrayItem[];
