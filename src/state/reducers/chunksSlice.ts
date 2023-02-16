import {
    createSlice,
    createEntityAdapter,
    createSelector,
    EntityState,
} from '@reduxjs/toolkit';

// TYPES
import Chunk from '@/types/Chunk.type';
import type { RootState } from '@/state/store';

const chunksAdapter = createEntityAdapter<Chunk>({
    selectId: (chunk) => chunk.id,
    sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const chunksSlice = createSlice({
    name: 'chunks',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState: chunksAdapter.getInitialState(),
    reducers: {
        setAll: chunksAdapter.setAll,
        addChunks: chunksAdapter.addMany,

        updateChunk: chunksAdapter.updateOne,
    },
});

// Selectors
export const { selectAll, selectById, selectEntities } =
    chunksAdapter.getSelectors((state: RootState) => state.chunks);

export const selectChunksByFolderId = createSelector(
    [selectAll, (_, folderId: string | null) => folderId],
    (items, folderId) => items.filter((i) => i.folderId === folderId)
);


export const { setAll, addChunks, updateChunk } = chunksSlice.actions;

export default chunksSlice.reducer;
