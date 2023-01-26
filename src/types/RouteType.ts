interface RouteType {
    path: string;
    component: React.ComponentType;
    exact?: boolean;
    routes?: RouteType[];
}

export default RouteType;