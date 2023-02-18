import {
    createSlice,
    createEntityAdapter,
    createSelector,
    EntityId,
    PayloadAction,
} from '@reduxjs/toolkit';

// TYPES
import Chunk from '@/types/Chunk.type';
import type { RootState } from '@/app/store';
type StateType = {
    activeChunkId: string | null;
}

const chunksAdapter = createEntityAdapter<Chunk>({
    selectId: (chunk) => chunk.id,
    sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const chunksSlice = createSlice({
    name: 'chunks',
    initialState: chunksAdapter.getInitialState({
        activeChunkId: null,
    } as StateType),
    reducers: {
        setAll: chunksAdapter.setAll,
        addChunks: chunksAdapter.addMany,
        updateChunk: chunksAdapter.updateOne,
        removeChunk: chunksAdapter.removeOne,

        makeChunkActive: (
            state,
            { payload: chunkId }: PayloadAction<string>
        ) => {
            state.activeChunkId = chunkId;
        },

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

export const { setAll, addChunks, updateChunk, removeChunk, makeChunkActive, removeChunksByFolderId } =
    chunksSlice.actions;

export default chunksSlice.reducer;
