import { lazy } from 'react';

import Index from './pages/index';
import NotFound from './pages/404';

const routes = [
  {
    name: 'home',
    path: '/',
    component: Index,
  },
  {
    name: 'about',
    path: '/about',
    component: lazy(() => import('./pages/about')),
  },
  {
    name: 'me',
    path: '/me',
    children: [
      {
        name: 'index',
        path: '/',
        component: lazy(() => import('./pages/profile')),
      },
      {
        name: 'posts',
        path: '/posts',
        component: lazy(() => import('./pages/posts')),
      },
      {
        name: 'post',
        path: '/posts/:slug',
        component: lazy(() => import('./pages/post/layout')),
        children: [
          {
            name: 'index',
            path: '/',
            component: lazy(() => import('./pages/post')),
          },
          {
            name: 'comments',
            path: '/comments',
            component: lazy(() => import('./pages/post-comments')),
          },
          {
            name: 'other',
            path: '/*',
            component: lazy(() => import('./pages/other')),
          },
        ],
      },
    ],
  },
  {
    name: '404',
    path: '/*',
    component: NotFound,
  },
];

export default routes;
