import {
  createSlice,
  createEntityAdapter,
  createSelector,
  EntityState ,
} from '@reduxjs/toolkit';

// TYPES
import Chunk from '@/types/Chunk.type';
import { RootState } from '@/state/store';

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
    addChunks: chunksAdapter.addMany,

    updateChunk: chunksAdapter.updateOne,
  },
});

// Selectors
export const { selectAll, selectById, selectEntities } = chunksAdapter.getSelectors((state: RootState) => state.chunks);

export const selectChunksByFolderId = createSelector(
  [
    (state: RootState) => state.chunks,
    (chunks: EntityState<Chunk>, folderId: string) => folderId,
  ],
  (entities: EntityState<Chunk>, folderId: string) => Object.values(entities.entities).filter((entity: Chunk | undefined) => entity?.folderId === folderId) || [], // eslint-disable-line max-len
);

export const selectChunkBySlug = createSelector(
  (state: RootState) => state.chunks,
  (entities: Chunk[], slug: string) => Object.values(entities).find((entity: Chunk) => entity.slug === slug) || [],
);

export const { setAll, addChunks, updateChunk } = chunksSlice.actions;

export default chunksSlice.reducer;
