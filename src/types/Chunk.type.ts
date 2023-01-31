import ChunkItem from './ChunkItem.type';

interface Chunk {
    id: number;
    name: string;
    slug: string;
    children: Chunk[];
    item: ChunkItem|null;
}

export default Chunk;