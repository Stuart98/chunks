interface Chunk {
    id: string;
    name: string;
    slug: string;
    content: string;
    language: string;
    active: boolean;
    editing: boolean;
}

export default Chunk;