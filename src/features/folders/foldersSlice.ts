import {
    createSlice,
    createEntityAdapter,
    createSelector,
    createAsyncThunk,
    PayloadAction,
    Draft,
} from '@reduxjs/toolkit';

// TYPES
import Folder from '@/types/Folder.type';

// STATE
import type { RootState } from '@/app/store';
import { removeChunksByFolderId } from '@/features/chunksList/chunksSlice';

const foldersAdapter = createEntityAdapter<Folder>({
    selectId: (folder) => folder.id,
    sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const generateSlug = (name: string) =>
    name
        .toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-');

type StateType = {
    activeFolderId: string | null;
}

const foldersSlice = createSlice({
    name: 'folders',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState: foldersAdapter.getInitialState({
        activeFolderId: null,
    } as StateType),
    reducers: {
        setAll: foldersAdapter.setAll,

        makeFolderActive: (
            state,
            { payload: folderId }: PayloadAction<string>
        ) => {
            state.activeFolderId = folderId;
        },

        startEdit: (state, { payload: folderId }: PayloadAction<string>) => {
            Object.values(state.entities).forEach(
                (folder: Draft<Folder> | undefined) => {
                    if (folder) {
                        folder.editing = folder.id === folderId;
                    }
                }
            );
        },

        completeEdit: (
            state,
            {
                payload: { folderId, value },
            }: PayloadAction<{ folderId: string; value: string }>
        ) => {
            const folder = state.entities[folderId];

            if (folder) {
                folder.name = value;
                folder.editing = false;
                folder.slug = generateSlug(value);
            }
        },

        addFolder: foldersAdapter.addOne,
        removeOne: (state, { payload: folderId }: PayloadAction<string>) => {
            foldersAdapter.removeOne(state, folderId);
        },
    },
});

export const removeFolder = createAsyncThunk(
    'folders/removeFolder',
    async (folderId: string, { dispatch }) => {
        // remove folder
        dispatch(foldersSlice.actions.removeOne(folderId));

        // remove all chunks associated with folder
        dispatch(removeChunksByFolderId(folderId));
    }
);

// Selectors
export const { selectAll, selectById } = foldersAdapter.getSelectors(
    (state: RootState) => state.folders
);

export const selectActive = createSelector([selectAll], (items) =>
    items.find((i) => i.active)
);

export const selectFolderByParentId = createSelector(
    [selectAll, (_, parentId: string | null) => parentId],
    (items, parentId) => items.filter((i) => i.parentId === parentId)
);

export const { setAll, addFolder, startEdit, completeEdit, makeFolderActive } =
    foldersSlice.actions;

export default foldersSlice.reducer;
