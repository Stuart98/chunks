// REACT
import { lazy } from 'react';

// TYPES
import Route from '@/types/Route.type';

// COMPONENTS
const ChunkLayout = lazy(() => import('@/layouts/ChunkLayout'));

const routes = [
    {
        path: '/view/*', // the url
        component: ChunkLayout, // view rendered
    } as Route,
] as Route[];

export default routes;
