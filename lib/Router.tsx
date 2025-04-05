import { JSX, ReactNode, useEffect, useState } from 'react';

import { RouteArrayItem, RoutesConfig } from './types';
import { RouterContext } from './context';
import { getCurrentUrl, getUrlFor } from './helpers';
import Routes from './Routes';

type Props = {
  children?: (content: JSX.Element) => JSX.Element;
  routes: RoutesConfig;
};

export default function Router(props: Props) {
  const { children: customize, routes } = props;

  const routesArray = convertRoutesObjectToArray(routes);

  return (
    <RenderRouter>
      {customize ? customize(<Routes routes={routesArray} />) : <Routes routes={routesArray} />}
    </RenderRouter>
  );
}

function RenderRouter({ children }: { children: ReactNode }) {
  const [url, setUrl] = useState(() => getCurrentUrl());

  useEffect(() => {
    const onLocationChange = () => setUrl(getCurrentUrl());
    window.addEventListener('popstate', onLocationChange);
    return () => window.removeEventListener('popstate', onLocationChange);
  }, []);

  const navigate = (to: string) => {
    window.history.pushState({}, '', to);
    setUrl(getUrlFor(to));
  };

  return <RouterContext.Provider value={{ url, navigate, params: {} }}>{children}</RouterContext.Provider>;
}

function convertRoutesObjectToArray(routes: RouteArrayItem[], pathPrefix?: string): RouteArrayItem[] {
  return routes.map((route) => {
    const next: RouteArrayItem = {
      ...route,
      // name: namePrefix ? `${namePrefix}.${route.name}` : route.name,
      path: pathPrefix ? `${pathPrefix}${route.path}` : route.path,
    };

    if (route.children) {
      next.children = convertRoutesObjectToArray(route.children, next.path);
    }

    return next;
  });
}
