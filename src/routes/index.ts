// All components mapping with path for internal routes

import { lazy } from 'react'

import RouteType from '../types/RouteType';

const Welcome = lazy(() => import('../pages/Welcome'))


const routes = [
  {
    path: '/', // the url
    component: Welcome, // view rendered
  } as RouteType,
] as RouteType[]

export default routes;
