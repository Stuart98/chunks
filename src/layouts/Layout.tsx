import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { useAppDispatch } from '@/state/hooks';
import {
    makeFolderActive,
} from '@/features/folders/foldersSlice';
import {
    makeChunkActive,
} from '@/features/chunksList/chunksSlice';
import PageContent from '@/layouts/PageContent';
import LeftSidebar from '@/layouts/LeftSidebar';

function Layout() {
    const location = useLocation();
    const dispatch = useAppDispatch();

    useEffect(() => {
        const params = location.pathname.replace(/^(\/view\/)/, '');
        const spl = params.split('/');

        dispatch(makeFolderActive(spl[0]));
        dispatch(makeChunkActive(spl[1]));
    }, [location, dispatch]);

    return (
        <div data-theme="emerald" className="drawer drawer-mobile bg-base-200">
            <input
                id="left-sidebar-drawer"
                type="checkbox"
                className="drawer-toggle"
            />
            <PageContent />
            <LeftSidebar />
        </div>
    );
}

export default Layout;
