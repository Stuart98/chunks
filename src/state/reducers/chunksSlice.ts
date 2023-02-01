import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import Folder from '../../types/Folder.type'
import Node from '../../types/Node.type'

import type { RootState } from '../store'

import { createFindNode, findNode } from '../../util/treeUtils';
import { data } from '../../data/';

// Define a type for the slice state
interface ChunksState {
  root: Folder
}

interface AddPayload {
    node: Node;
    parent: Folder;
}


const initialState: ChunksState = {
  root: {
    id: 0,
    name: 'Root',
    active: false,
    children: data,
  } as Folder
}

function updateNode (rootNode: Folder, node: Node): Node[] {
  const parentNode = node.parentId === rootNode.id ? rootNode : findNode(rootNode.children, 'id', node.parentId) as Folder;

  const index = parentNode.children.findIndex((c) => c.id === node.id);

  if (index >= 0) {

      const newChildren = [...parentNode.children] as Node[];

      newChildren[index] = node;

      parentNode.children = newChildren;

      return [...rootNode.children];
  }

  return rootNode.children;
}

export const chunksSlice = createSlice({
  name: 'chunks',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    select: (state, { payload: folder }: PayloadAction<Folder>) => {
      const currentActiveNode = findNode(state.root.children, 'active', true);
console.log('deselect', currentActiveNode)
      let root = state.root;
      let newRoot = {
        ...state.root
      };

      if (currentActiveNode) {
        newRoot.children = updateNode(state.root, {
          ...currentActiveNode,
          active: false,
        });

        console.log('check deselect', findNode(state.root.children, 'active', true))
      }
console.log('select', folder.name)
      newRoot.children = updateNode(root, {
        ...folder,
        active: true,
      });

      state.root = newRoot;
    },

    add: (state, { payload: node }: PayloadAction<Node>) => {
      state.root.children = [
        ...state.root.children,
        node,
      ] as Node[];
    },

    remove: (state, { payload: node }: PayloadAction<Node>) => {
      state.items = state.items.filter((c) => c.id !== node.id);
    },
    
    update: (state, { payload: node }: PayloadAction<Node>) => {
      state.root = updateNode(state.root, node);
    }
  }
})

export const { select, add, remove, update } = chunksSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectChunks = (state: RootState) => state.chunks.root.children;
export const selectNode = (state: RootState) => {
    return createFindNode(state.chunks.root.children);
};

export type { ChunksState };

export default chunksSlice.reducer