import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';

// TYPES
import { isFolder } from '@/types/typeUtils';
import Folder from '@/types/Folder.type';
import Node from '@/types/Node.type';
import TreeState from '@/types/TreeState.type';
import { RootState } from '../store';

// DATA
import data from '@/data';

import { createSelectByProperty, selectNodeByActive, selectRootNode } from '@/state/selectors/chunks';
import TreeItem from '@/types/TreeItem.type';

const initialState: TreeState = {
  nodes: data,
  lastAddedNode: null,
};

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

const generateSlug = (name: string) => (name.toLowerCase()
  .replace(/[^\w ]+/g, '')
  .replace(/ +/g, '-'));

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

        newState.nodes[node.id] = {
          ...node,
          slug: generateSlug(parent.name),
        };

        newState.lastAddedNode = newState.nodes[node.id];
      }
    },

    removeNode: (state, { payload: nodeId }: PayloadAction<string>) => {
      const newState = { ...state };
      const descendantIds = getAllDescendantIds(state, nodeId);

      // delete node and descendants
      [nodeId, ...descendantIds].forEach((id: string) => delete newState.nodes[id]);

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
      node.slug = generateSlug(value);
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
