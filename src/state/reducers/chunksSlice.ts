import {
    createSlice,
    createEntityAdapter,
    createSelector,
    EntityId,
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
    initialState: chunksAdapter.getInitialState(),
    reducers: {
        setAll: chunksAdapter.setAll,
        addChunks: chunksAdapter.addMany,
        updateChunk: chunksAdapter.updateOne,
        removeChunk: chunksAdapter.removeOne,

        removeChunksByFolderId: (
            state,
            { payload: folderId }: { payload: string }
        ) => {
            const ids = Object.values(state.entities)
                .filter((chunk) => chunk?.folderId === folderId)
                .map((chunk) => chunk?.id);

            chunksAdapter.removeMany(state, [
                ...(ids.filter(Boolean) as EntityId[]),
            ]);
        },
    },
});

// Selectors
export const { selectAll, selectById, selectEntities } =
    chunksAdapter.getSelectors((state: RootState) => state.chunks);

export const selectChunksByFolderId = createSelector(
    [selectAll, (_, folderId: string | null) => folderId],
    (items, folderId) => items.filter((i) => i.folderId === folderId)
);

export const { setAll, addChunks, updateChunk, removeChunk, removeChunksByFolderId } =
    chunksSlice.actions;

export default chunksSlice.reducer;
