import { createSlice, createEntityAdapter, createSelector, PayloadAction } from '@reduxjs/toolkit';

// TYPES
import Folder from '@/types/Folder.type';
import data from '@/data';
import { RootState } from '../store';

const foldersAdapter = createEntityAdapter<Folder>({
  selectId: (folder) => folder.id,
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const generateSlug = (name: string) => (name.toLowerCase()
  .replace(/[^\w ]+/g, '')
  .replace(/ +/g, '-'));

export const foldersSlice = createSlice({
  name: 'folders',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState: foldersAdapter.getInitialState(),
  reducers: {
    setAll: foldersAdapter.setAll,

    makeActive: (state: RootState, { payload: folderId }: PayloadAction<string>) => {
        Object.values(state.entities as Folder[]).forEach((folder: Folder) => {
            folder.active = folder.id === folderId
        });
    },

    startEdit: (state: RootState, { payload: folderId }: PayloadAction<string>) => {
        Object.values(state.entities as Folder[]).forEach((folder: Folder) => {
            folder.editing = folder.id === folderId
        });
    },

    completeEdit: (
        state,
        {
          payload: { folderId, value },
        }: PayloadAction<{ folderId: string; value: string }>,
      ) => {
        const folder = state.entities[folderId];

        if (folder) {
            folder.name = value;
            folder.editing = false;
            folder.slug = generateSlug(value);
        }
    },
  
    addFolder: foldersAdapter.addOne,
  },
});



// Selectors
export const { selectAll, selectById } = foldersAdapter.getSelectors((state: RootState) => state.folders);

export const selectActive = createSelector([selectAll], (items) => {
    return items.find((i) => i.active);
});

export const selectFolderByParentId = createSelector([selectAll, (items: Folder[], parentId: string | null) => parentId], (items, parentId) => {
    return items.filter((i) => i.parentId === parentId);
});

export const selectFolderBySlug = createSelector(
    [
        (state: RootState) => state.folders,
        (folders: Folder[], slug) => slug
    ],
    (entities: Folder[], slug: string) => {
        return Object.values(entities.entities).find(entity => entity.slug === slug);
    }
);

export const { setAll, makeActive, addFolder, startEdit, completeEdit } = foldersSlice.actions;


export default foldersSlice.reducer;
