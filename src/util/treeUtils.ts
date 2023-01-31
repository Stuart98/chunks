import Folder from "../types/Folder.type";
import Chunk from "../types/Chunk.type";

export type FindKeys = 'id' | 'slug';

export function isFolder(item: Folder | Chunk): item is Folder {
  return (item as Folder).children !== undefined;
}

function findTreeNode (key: FindKeys = 'id', value: any, currentNode: Folder | Chunk) : Folder | Chunk | false {
    if (value == currentNode[key]) {
        return currentNode;
    } else if (isFolder(currentNode)) { // only try and dive into Folders

        // loop children nodes and call findNode
        for (let i = 0; currentNode.children && i < currentNode.children.length; i += 1) {
            let currentChild = currentNode.children[i];

            // Search in the current child
            let result = findTreeNode(key, value, currentChild);

            // Return the result if the node has been found
            if (result !== false) {
                return result;
            }
        }
    }

    // The node has not been found and we have no more options
    return false;
}

export function findNode(data: Folder[] | Chunk[], key: FindKeys = 'id', value: any) {
    return findTreeNode(key, value, {
        children: data,
    } as Folder);
}

export function createFindNode(data: Folder[] | Chunk[]) {
    return (key: FindKeys = 'id', value: any) => findTreeNode(key, value, {
        children: data,
    } as Folder);
}