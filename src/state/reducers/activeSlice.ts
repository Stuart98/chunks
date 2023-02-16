import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';

// TYPES
import type { RootState } from '../store';

const activeSlice = createSlice({
    name: 'active',
    initialState: {
        activeFolderId: null,
        activeChunkId: null,
    },
    reducers: {
        makeFolderActive: (
            state,
            { payload: folderId }: PayloadAction<string>
        ) => {
            state.activeFolderId = folderId;
        },
        makeChunkActive: (
            state,
            { payload: chunkId }: PayloadAction<string>
        ) => {
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
