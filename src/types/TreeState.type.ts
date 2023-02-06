import TreeItem from '@/types/TreeItem.type';
import Node from '@/types/Node.type';

interface TreeState {
    nodes: TreeItem;
    lastAddedNode: Node | null;
}

export default TreeState;
