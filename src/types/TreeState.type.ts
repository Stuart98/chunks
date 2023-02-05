import TreeItem from './TreeItem.type';
import Node from './Node.type';

interface TreeState {
    nodes: TreeItem;
    lastAddedNode: Node | null;
}

export default TreeState;