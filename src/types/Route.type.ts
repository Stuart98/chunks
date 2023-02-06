interface Route {
    path: string;
    component: React.ComponentType;
    exact?: boolean;
    routes?: Route[];
}

export default Route;
