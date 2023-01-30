import ChunkItemType from './ChunkItemType';

interface ChunkType {
    id: number;
    name: string;
    slug: string;
    children: ChunkType[];
    item: ChunkItemType|null;
}

export default ChunkType;