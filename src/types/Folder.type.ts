interface Folder {
    id: string;
    name: string;
    slug: string;
    parentId: string | null;
    active: boolean;
    editing: boolean;
}

export default Folder;
