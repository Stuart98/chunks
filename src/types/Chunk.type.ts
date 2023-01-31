interface Chunk {
    id: number;
    parentId: number;
    name: string;
    slug: string;
    content: string;
    language: string;
}

export default Chunk;