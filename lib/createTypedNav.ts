// import { getPathParams } from './helpers';

// type ExtractParams<T extends string> =
//   T extends `${string}:${infer Param}/${infer Rest}`
//     ? { [K in Param | keyof ExtractParams<Rest>]: string }
//     : T extends `${string}:${infer Param}`
//       ? { [K in Param]: string }
//       : null;

// type RouteMethodsWithoutChildren = {
//   _get(): string
// }

// type RouteMethodsWithChildren<SubDefinitions extends Record<string, any>> =
//   RouteMethodsWithoutChildren
//   & CreateTypedNav<SubDefinitions>

// type RouteMethods<Definitions extends Record<string, any>, Name extends keyof Definitions> = Definitions[Name]['children'] extends Record<string, any>
//   ? RouteMethodsWithChildren<Definitions[Name]['children']>
//   : RouteMethodsWithoutChildren

// type CreateTypedNav<Definitions extends Record<string, any>> = {
//   [Name in keyof Definitions]: ExtractParams<Definitions[Name]['path']> extends null
//     ? (() => RouteMethods<Definitions, Name>)
//     : ((params: ExtractParams<Definitions[Name]['path']>) => RouteMethods<Definitions, Name>)
// }

// export default function createTypedNav<T extends Record<string, any>>(routes: T, baseUrl: string = '') {
//   return Object.entries(routes).reduce((all, [name, route]) => {
//     return {
//       ...all,
//       [name]: (params: any) => {
//         const url = baseUrl + getPathParams(route.path).reduce((url, key) => url.replace(':' + key, params[key]), route.path);
//         return {
//           _get: () => url,
//           _queryString: () => {
//           },
//           ...(route.children ? createTypedNav(route.children, url) : {})
//         };
//       }
//     };
//   }, {}) as CreateTypedNav<T>;
// }
