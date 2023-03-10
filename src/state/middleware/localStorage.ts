export const localStorageMiddleware =
    ({ getState }: any) =>
    (next: any) =>
    (action: any) => {
        const result = next(action);
        localStorage.setItem('applicationState', JSON.stringify(getState()));
        return result;
    };

export const reHydrateStore = () => {
    if (localStorage.getItem('applicationState') !== null) {
        return JSON.parse(localStorage.getItem('applicationState') as string); // re-hydrate the store
    }

    return {};
};
