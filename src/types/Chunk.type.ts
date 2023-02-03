interface Chunk {
    id: string;
    name: string;
    slug: string;
    content: string;
    language: string;
    selected: boolean;
    editing: boolean;
}

export default Chunk;