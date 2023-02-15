import { createSlice, createEntityAdapter, createSelector } from '@reduxjs/toolkit';

// TYPES
import Chunk from '@/types/Chunk.type';
import { RootState } from '../store';
import data from '@/data/chunks';

const chunksAdapter = createEntityAdapter<Chunk>({
  selectId: (chunk) => chunk.id,
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

export const chunksSlice = createSlice({
  name: 'chunks',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState: chunksAdapter.getInitialState(),
  reducers: {
    setAll: chunksAdapter.setAll,
  },
});


// Selectors
export const { selectAll, selectById, selectEntities } = chunksAdapter.getSelectors((state: RootState) => state.chunks);

// export const selectByParent = (state: RootState, folderId: string) => selectEntities(state).find((c) => c.parentId === folderId) : [];

export const xselectChunksByFolderId = createSelector([selectAll, (items, folderId: string) => folderId], (items, folderId) => {
    return items.filter((i) => i.folderId === folderId);
});

export const selectChunksByFolderId = createSelector(
    [
        (state: RootState) => state.chunks,
        (chunks: Chunk[], folderId) => folderId
    ],
    (entities: Chunk[], folderId: string) => {
        return Object.values(entities.entities).filter(entity => entity.folderId === folderId);
    }
);

export const selectChunkBySlug = createSelector(
    (state: RootState) => state.chunks,
    (entities: Chunk[], slug: string) => Object.values(entities).find(entity => entity.slug === slug)
);
  


export const { setAll } = chunksSlice.actions;

export default chunksSlice.reducer;
