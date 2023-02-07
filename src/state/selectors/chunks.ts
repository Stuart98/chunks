import { isFolder } from '@/types/typeUtils';
import Folder from '@/types/Folder.type';
import Node from '@/types/Node.type';
import type { RootState } from '@/state/store';
import TreeState from '@/types/TreeState.type';

const isRootState = (state: RootState | TreeState): boolean => state && (state as RootState).chunks !== undefined;

/**
 * findParents
 * Returns an array of all parents of the given node. The first element is the
 * direct parent, the last element is the root node.
 * @param state
 * @param {Node} node The node to find the parents of
 * @returns Node[]
 */
/* eslint-disable no-restricted-syntax */
const findParents = (state: RootState, node: Node): Node[] => {
  for (const [, currentNode] of Object.entries(state.chunks.nodes)) {
    if (
      currentNode
            && isFolder(currentNode)
            && currentNode.childIds
            && currentNode.childIds.indexOf(node.id) >= 0
    ) {
      return [currentNode as Folder, ...findParents(state, currentNode)];
    }
  }

  return [];
};

/**
 * createSelectByProperty
 * Returns a function that returns the Node with the given property value.
 * Used for making selectors for `id`, `slug`, `active` and `editing`.
 * @param {RootState} state
 * @param {'id' | 'slug' | 'active' | 'editing'} property The property to make the selector for
 * @returns (value: string | boolean) => Node | null
 */
export const createSelectByProperty = (
  state: RootState | TreeState,
  property: 'id' | 'slug' | 'active' | 'editing',
) => (value: string | boolean): Node | null => {
  for (const [, node] of Object.entries(
    isRootState(state)
      ? (state as RootState).chunks.nodes
      : (state as TreeState).nodes,
  )) {
    if (node[property] === value) {
      return node as Node;
    }
  }
  return null;
};
/* eslint-enable no-restricted-syntax */

/* eslint-disable arrow-body-style */
/**
 * selectNodes
 * Returns the nodes object
 * @param state
 * @returns {TreeItem}
 */
export const selectNodes = (state: RootState) => state.chunks.nodes;

/**
 * selectRootNode
 * Returns the root node
 * @param state
 * @returns {Folder}
 */
export const selectRootNode = (state: RootState | TreeState) => {
  return (
        isRootState(state)
          ? (state as RootState).chunks.nodes
          : (state as TreeState).nodes
    )['0'] as Folder;
};

/**
 * selectNodeById
 * Returns the Node with the given id
 * @param {RootState} state
 * @returns Node | null
 */
export const selectNodeById = (
  state: RootState,
): ((id: string) => Node | null) => createSelectByProperty(state, 'id');

/**
 * selectNodeBySlug
 * Returns the Node with the given slug
 * @param {RootState} state
 * @returns Node | null
 */
export const selectNodeBySlug = (
  state: RootState,
): ((slug: string) => Node | null) => createSelectByProperty(state, 'slug');

/**
 * selectNodeByActive
 * Returns the Node with `active` flag set to true
 * @param {RootState} state
 * @returns Node | null
 */
export const selectNodeByActive = (
  state: RootState | TreeState,
): ((active: boolean) => Node | null) => createSelectByProperty(state, 'active');

/**
 * selectParents
 * Returns an array of all parents of the given node. The first element is the
 * direct parent, the last element is the root node.
 * @param {RootState} state
 * @returns Node | null
 */
export const selectParents = (state: RootState): ((node: Node) => Node[]) => (node) => findParents(state, node);
export const selectLastAddedNode = (state: RootState) => state.chunks.lastAddedNode;