import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import Folder from '../../types/Folder.type'
import Node from '../../types/Node.type';
import TreeItem from '../../types/TreeItem.type'
import TreeState from '../../types/TreeState.type'

import type { RootState } from '../store'

import { isFolder } from '../../util/isFolder';
import { data } from '../../data/';

interface AddPayload {
    node: Node;
    parent: Folder;
}


const initialState: TreeState = {
  nodes: data,
}

const isRootState = (state: RootState | TreeState): state is RootState => {
  return (state as RootState).chunks !== undefined;
}


const getAllDescendantIds = (state: TreeState, nodeId: string): string[] => {
  let node: Node = state.nodes[nodeId];
  
  if (isFolder(node)) {
    return node.childIds.reduce((acc: string[], childId: string) => (
      [ ...acc, childId, ...getAllDescendantIds(state, childId) ] as string[]
    ), [])
  }

  return [];
}

const deleteMany = (state: TreeState, ids: string[]) => {
  state = { ...state }

  ids.forEach((id: string) => delete state.nodes[id]);

  return state;
}

export const chunksSlice = createSlice({
  name: 'chunks',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    makeActive: (state, { payload: folder }: PayloadAction<Folder>) => {
      const node = selectNodeByActive(state)(true);

      if (node) {
        state.nodes[node.id] = {
          ...node,
          active: false,
        }
      }

      state.nodes[folder.id] = {
        ...folder,
        active: true,
      };
    },

    addChild: (state, { payload: node }: PayloadAction<Node>) => {
      let parent = selectNodeByActive(state)(true);

      if (!parent) {
        parent = selectRootNode(state);
      }

      if (isFolder(parent)) {
        state.nodes[parent.id] = {
          ...parent,
          childIds: [
            ...parent.childIds,
            node.id
          ]
        } as Node;

        state.nodes[node.id] = node;
      }
    },

    removeNode: (state, { payload: nodeId }: PayloadAction<string>) => {
      const descendantIds = getAllDescendantIds(state, nodeId);

      state = deleteMany(state, [ nodeId, ...descendantIds ]);

      // find any that reference it as a child
      Object.keys(state.nodes).forEach((id: string) => {
        const node = state.nodes[id];

        state.nodes[node.id] = isFolder(node) ? {
          ...node,
          childIds: node.childIds.filter((id: string) => id !== nodeId),
        } : { ...node };
      });
    },

    startEdit: (state, { payload: nodeId }: PayloadAction<string>) => {
      const node = state.nodes[nodeId];

      const currentlyEditingNode = createSelectByProperty(state, 'editing')(true);
      
      if (currentlyEditingNode) {
        currentlyEditingNode.editing = false;
      }

      if (node) {
        node.editing = true;
      }
    },

    completeEdit: (state, { payload: { id, value } }: PayloadAction<{ id: string, value: string }>) => {
      const node = state.nodes[id];

      node.name = value;
      node.editing = false;
    },

    updateNode: (state, { payload: node } : PayloadAction<Node>) => {
      state.nodes[node.id] = node;
    }
  }
})

export const { makeActive, addChild, removeNode, updateNode, startEdit, completeEdit } = chunksSlice.actions


const createSelectByProperty = (state: RootState | TreeState, property: 'id' | 'slug' | 'active' | 'editing') => {
  return (value: string | boolean) : Node | null => {
    for (const [key, node] of Object.entries(isRootState(state) ? state.chunks.nodes : state.nodes)) {
      if (node[property] === value) {
        return node as Node;
      }
    }
    return null;
  }
};

// Other code such as selectors can use the imported `RootState` type
export const selectNodes = (state: RootState) => state.chunks.nodes;
export const selectRootNode = (state: RootState | TreeState) => (isRootState(state) ? state.chunks.nodes : state.nodes)['0'] as Folder;
export const selectNodeById = (state: RootState) : (id: string) => Node | null => createSelectByProperty(state, 'id');
export const selectNodeBySlug = (state: RootState) : (slug: string) => Node | null => createSelectByProperty(state, 'slug');
export const selectNodeByActive = (state: RootState | TreeState) : (active: boolean) => Node | null => createSelectByProperty(state, 'active');


export type { TreeState };

export default chunksSlice.reducer