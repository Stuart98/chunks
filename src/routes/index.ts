// All components mapping with path for internal routes

import { lazy } from 'react'

import RouteType from '../types/RouteType';

const Chunk = lazy(() => import('../components/Chunk'))


const routes = [
  {
    path: '/view/*', // the url
    component: Chunk, // view rendered
  } as RouteType,
] as RouteType[]

export default routes;
