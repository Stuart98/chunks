import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';

// TYPES
import { RootState } from '../store';


export const activeSlice = createSlice({
  name: 'active',
  initialState: {
    activeFolderId: null,
    activeChunkId: null,
  },
  reducers: {
    makeFolderActive: (state: RootState, { payload: folderId }: PayloadAction<string>) => {
        state.activeFolderId = folderId;
    },
    makeChunkActive: (state: RootState, { payload: chunkId }: PayloadAction<string>) => {
        state.activeChunkId = chunkId;
    },
  },
});


// Selectors


export const { makeFolderActive, makeChunkActive } = activeSlice.actions;

export const selectActiveFolderId = createSelector(
    (state: RootState) => state.activeFolderId,
    (activeFolderId) => activeFolderId
);

export const selectActiveChunkId = createSelector(
    (state: RootState) => state.activeChunkId,
    (activeChunkId) => activeChunkId
);

export default activeSlice.reducer;
