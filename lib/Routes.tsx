import { memo, Suspense, useContext, useMemo } from 'react';
import { RouterContext, RouterContextValue } from './context';
import { matchPath } from './helpers';
import { RouteArrayItem } from './types';
import { ChildRoutes } from './components';

type RenderData = RouterContextValue & {
  component?: RouteArrayItem['component'];
};

type Props = {
  routes: RouteArrayItem[];
};

function Routes(props: Props) {
  const { routes } = props;

  const context = useContext(RouterContext);

  const data = useMemo(() => matchRoutes(routes, context), [routes, context]);

  const tree = [...data];

  let childRoutes = null;

  while (tree.length) {
    const item = tree.pop();
    if (item) {
      childRoutes = <RouteRender {...item} childRoutes={childRoutes} />;
    }
  }

  return childRoutes;
}

export default memo<Props>(Routes);

function matchRoutes(allRoutes: RouteArrayItem[], context: RouterContextValue) {
  function findTree(routes: RouteArrayItem[], initialTree: RenderData[] = []): RenderData[] {
    const tree: RenderData[] = [...initialTree];

    const getTreeLastItem = () => (tree.length > 0 ? tree[tree.length - 1] : context);

    for (const route of routes) {
      const match = matchPath(route.path, context.url.pathname);
      if (match) {
        if (match.exact || route.children || match.wildcard) {
          tree.push({
            ...getTreeLastItem(),
            component: route.component || (() => <ChildRoutes />),
            params: match.params,
          });

          if (match.exact) {
            const indexRoute = route.children?.find((ch) => ch.name === 'index');
            if (indexRoute) {
              tree.push({
                ...getTreeLastItem(),
                component: indexRoute.component,
                params: match.params,
              });
            }
            return tree;
          } else if (route.children) {
            const finalTree = findTree(route.children, tree);
            if (finalTree.length > 0) {
              return finalTree;
            }
          } else if (match.wildcard) {
            return tree;
          }
        }
      }
    }

    return [];
  }

  return findTree(allRoutes);
}

function RouteRender(props: RenderData) {
  const { component: Component, ...context } = props;
  return (
    <RouterContext.Provider value={context}>
      <Suspense fallback={null}>{Component ? <Component /> : null}</Suspense>
    </RouterContext.Provider>
  );
}
