import Chunk from './Chunk.type';

interface Folder {
    id: number;
    parentId: number | null;
    name: string;
    slug: string;
    children: Folder[] | Chunk[];
    active: boolean;
}

export default Folder;