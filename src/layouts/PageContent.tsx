// REACT
import { Suspense, useRef } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

// STATE
import { useAppSelector } from '@/state/hooks';
import { selectNodeBySlug } from '@/state/reducers/chunksSlice';

// TYPES
import Node from '@/types/Node.type';

// COMPONENTS
import routes from '@/routes/index';
import Header from '@/layouts/Header';
import SuspenseContent from './SuspenseContent';

function PageContent() {
    const mainContentRef = useRef(null);

    let loc = useLocation();

    const params = loc.pathname.replace(/^(\/view\/)/, '');
    const spl = params.split('/');
    const slug = spl.pop() || '';
    const chunk: Node | null = useAppSelector(selectNodeBySlug)(slug);

    return (
        <div className="drawer-content flex flex-col rounded-box m-5 md:ml-0 shadow-md">
            <Header title={chunk ? chunk.name : ''} />
            <main className="flex flex-1 bg-base-100" ref={mainContentRef}>
                <Suspense fallback={<SuspenseContent />}>
                    <Routes>
                        {routes.map((route, key) => {
                            return (
                                <Route
                                    key={key}
                                    path={`${route.path}`}
                                    element={<route.component />}
                                />
                            );
                        })}
                    </Routes>
                </Suspense>
                <div className="h-16"></div>
            </main>
        </div>
    );
}

export default PageContent;
