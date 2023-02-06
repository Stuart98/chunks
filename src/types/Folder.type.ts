interface Folder {
    id: string;
    name: string;
    slug: string;
    childIds: string[];
    active: boolean;
    editing: boolean;
}

export default Folder;