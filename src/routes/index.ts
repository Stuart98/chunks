// All components mapping with path for internal routes

import { lazy } from 'react'

import Route from '../types/Route.type';

const ChunkDisplay = lazy(() => import('../components/ChunkDisplay'))


const routes = [
  {
    path: '/view/*', // the url
    component: ChunkDisplay, // view rendered
  } as Route,
] as Route[]

export default routes;
