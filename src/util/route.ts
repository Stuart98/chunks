// REACT
import { useLocation } from 'react-router-dom';

// STATE
import { useAppSelector } from '@/state/hooks';
import { selectNodeBySlug } from '@/state/reducers/chunksSlice';

// TYPES
import Node from '@/types/Node.type';

export const getChunkFromRoute = (): Node | null => {
    let loc = useLocation();

    const params = loc.pathname.replace(/^(\/view\/)/, '');
    const spl = params.split('/');
    const slug = spl.pop() || '';

    return useAppSelector(selectNodeBySlug)(slug);
};
