// REACT
import { useLocation } from 'react-router-dom';

// STATE
import { useAppSelector } from '@/state/hooks';
import { selectChunkBySlug } from '@/state/reducers/chunksSlice';
import { selectFolderBySlug } from '@/state/reducers/foldersSlice';

// TYPES
import Chunk from '@/types/Chunk.type';
import Folder from '@/types/Folder.type';

/* eslint-disable import/prefer-default-export */
export const getChunkFromRoute = (): Chunk | undefined => {
  const loc = useLocation();

  const params = loc.pathname.replace(/^(\/view\/)/, '');
  const spl = params.split('/');
  const slug = spl.pop() || '';

  return useAppSelector((state) => selectChunkBySlug(state, slug));
};

/* eslint-disable import/prefer-default-export */
export const getFolderFromRoute = (): Folder | undefined => {
    const loc = useLocation();
  
    const params = loc.pathname.replace(/^(\/view\/)/, '');
    const spl = params.split('/');
    const slug = spl[0] || '';
  
    return useAppSelector((state) => selectFolderBySlug(state, slug));
  };