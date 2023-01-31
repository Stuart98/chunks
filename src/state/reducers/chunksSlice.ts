import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Chunk from '../../types/Chunk.type'
import type { RootState } from '../store'

import { data } from '../../data/';

// Define a type for the slice state
interface ChunksState {
  items: Chunk[]
}


// Define the initial state using that type
const initialState: ChunksState = {
  items: data,
}

export const chunksSlice = createSlice({
  name: 'chunks',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    add: (state, { payload: chunk }: PayloadAction<Chunk>) => {
      state.items = [
        ...state.items,
        chunk,
      ];
    },
    remove: (state, { payload: chunk }: PayloadAction<Chunk>) => {
      state.items = state.items.filter((c) => c.id !== chunk.id);
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    update: (state, { payload: chunk }: PayloadAction<Chunk>) => {
        const index = state.items.findIndex((c) => c.id !== chunk.id);

        if (index >= 0) {
            const newItems = [...state.items];

            newItems[index] = chunk;

            state.items = newItems;
        }
    }
  }
})

export const { add, remove, update } = chunksSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectChunks = (state: RootState) => state.chunks.items;

export type { ChunksState };

export default chunksSlice.reducer