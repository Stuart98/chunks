interface Chunk {
    id: number;
    parentId: number;
    name: string;
    slug: string;
    content: string;
    language: string;
    active: boolean;
}

export default Chunk;