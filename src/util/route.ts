// REACT
import { useLocation } from 'react-router-dom';

// STATE
import { useAppSelector } from '@/state/hooks';
import { selectNodeBySlug } from '@/state/selectors/chunks';

// TYPES
import Node from '@/types/Node.type';

/* eslint-disable import/prefer-default-export */
export const getChunkFromRoute = (): Node | null => {
  const loc = useLocation();

  const params = loc.pathname.replace(/^(\/view\/)/, '');
  const spl = params.split('/');
  const slug = spl.pop() || '';

  return useAppSelector(selectNodeBySlug)(slug);
};
