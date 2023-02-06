import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// TYPES
import { isFolder } from '@/types/typeUtils';
import Folder from '@/types/Folder.type';
import Node from '@/types/Node.type';
import TreeState from '@/types/TreeState.type';
import type { RootState } from '@/state/store';

// DATA
import data from '@/data';

const initialState: TreeState = {
  nodes: data,
  lastAddedNode: null,
};

const isRootState = (state: RootState | TreeState): boolean => state && (state as RootState).chunks !== undefined;

const getAllDescendantIds = (state: TreeState, nodeId: string): string[] => {
  const node: Node = state.nodes[nodeId];

  if (isFolder(node)) {
    return node.childIds.reduce(
      (acc: string[], childId: string) => [
        ...acc,
        childId,
        ...getAllDescendantIds(state, childId),
      ] as string[],
      [],
    );
  }

  return [];
};

const deleteMany = (state: TreeState, ids: string[]) => {
  const newState = { ...state };

  ids.forEach((id: string) => delete newState.nodes[id]);

  return newState;
};

/* eslint-disable no-restricted-syntax */
const findParents = (state: RootState, node: Node): Node[] => {
  for (const [, n] of Object.entries(state.chunks.nodes)) {
    if (
      n
            && isFolder(n)
            && n.childIds
            && n.childIds.indexOf(node.id) >= 0
    ) {
      return [n as Folder, ...findParents(state, n)];
    }
  }

  return [];
};

const createSelectByProperty = (
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
export const selectNodes = (state: RootState) => state.chunks.nodes;
export const selectRootNode = (state: RootState | TreeState) => {
  return (
        isRootState(state)
          ? (state as RootState).chunks.nodes
          : (state as TreeState).nodes
    )['0'] as Folder;
};

export const selectNodeById = (
  state: RootState,
): ((id: string) => Node | null) => createSelectByProperty(state, 'id');
export const selectNodeBySlug = (
  state: RootState,
): ((slug: string) => Node | null) => createSelectByProperty(state, 'slug');
export const selectNodeByActive = (
  state: RootState | TreeState,
): ((active: boolean) => Node | null) => createSelectByProperty(state, 'active');
export const selectParents = (state: RootState): ((node: Node) => Node[]) => (node) => findParents(state, node);
export const selectLastAddedNode = (state: RootState) => state.chunks.lastAddedNode;

export const chunksSlice = createSlice({
  name: 'chunks',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    makeActive: (state, { payload: folder }: PayloadAction<Folder>) => {
      const newState = { ...state };
      const node = selectNodeByActive(state)(true);

      if (node) {
        newState.nodes[node.id] = {
          ...node,
          active: false,
        };
      }

      newState.nodes[folder.id] = {
        ...folder,
        active: true,
      };
    },

    addChild: (state, { payload: node }: PayloadAction<Node>) => {
      const newState = { ...state };
      let parent = selectNodeByActive(state)(true);

      if (!parent) {
        parent = selectRootNode(state);
      }

      if (isFolder(parent)) {
        newState.nodes[parent.id] = {
          ...parent,
          childIds: [...parent.childIds, node.id],
        } as Node;

        newState.nodes[node.id] = node;

        newState.lastAddedNode = node;
      }
    },

    removeNode: (state, { payload: nodeId }: PayloadAction<string>) => {
      const descendantIds = getAllDescendantIds(state, nodeId);

      const newState = deleteMany(state, [nodeId, ...descendantIds]);

      // find any that reference it as a child
      Object.keys(state.nodes).forEach((id: string) => {
        const node = state.nodes[id];

        newState.nodes[node.id] = isFolder(node)
          ? {
            ...node,
            childIds: node.childIds.filter(
              (childId: string) => childId !== nodeId,
            ),
          }
          : { ...node };
      });
    },

    startEdit: (state, { payload: nodeId }: PayloadAction<string>) => {
      const node = state.nodes[nodeId];

      const currentlyEditingNode = createSelectByProperty(
        state,
        'editing',
      )(true);

      if (currentlyEditingNode) {
        currentlyEditingNode.editing = false;
      }

      if (node) {
        node.editing = true;
      }
    },

    completeEdit: (
      state,
      {
        payload: { id, value },
      }: PayloadAction<{ id: string; value: string }>,
    ) => {
      const node = state.nodes[id];

      node.name = value;
      node.editing = false;
    },

    updateNode: (state, { payload: node }: PayloadAction<Node>) => {
      const newState = { ...state };

      newState.nodes[node.id] = node;
    },
  },
});

export const {
  makeActive,
  addChild,
  removeNode,
  updateNode,
  startEdit,
  completeEdit,
} = chunksSlice.actions;

export type { TreeState };

export default chunksSlice.reducer;
