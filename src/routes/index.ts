// REACT
import { lazy } from 'react';

// TYPES
import Route from '@/types/Route.type';

// COMPONENTS
const ChunkDisplay = lazy(() => import('@/components/ChunkDisplay'));

const routes = [
    {
      path: '/view/*', // the url
      component: ChunkDisplay, // view rendered
    } as Route,
] as Route[];

export default routes;
