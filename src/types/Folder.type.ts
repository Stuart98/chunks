import Node from './Node.type';

interface Folder {
    id: number;
    parentId: number | null;
    name: string;
    slug: string;
    children: Node[];
    active: boolean;
}

export default Folder;