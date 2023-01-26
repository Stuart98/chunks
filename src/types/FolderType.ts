interface FolderType {
    id: number;
    name: string;
    slug: string;
    children: FolderType[];
}

export default FolderType;