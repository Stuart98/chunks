import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

// TYPES
import Folder from '@/types/Folder.type';
import data from '@/data';

const foldersAdapter = createEntityAdapter<Folder>({
  selectId: (folder) => folder.id,
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

export const foldersSlice = createSlice({
  name: 'folders',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState: foldersAdapter.getInitialState(),
  reducers: {
    setAll: foldersAdapter.setAll,
  },
});


// Selectors
export const { selectAll } = foldersAdapter.getSelectors(state => state.folders);

// const { selectAll, selectById } = foldersAdapter.getSelectors();

//export const selectAllFolders = selectAll;
//export const selectFolderById = selectById;

export const { setAll } = foldersSlice.actions;

export default foldersSlice.reducer;
