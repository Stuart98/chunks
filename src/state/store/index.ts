import { configureStore } from '@reduxjs/toolkit';

// STATE
//import chunksReducer from '@/state/reducers/xchunksSlice';
import foldersReducer from '@/state/reducers/foldersSlice';
import chunksSlice from '@/state/reducers/chunksSlice';
import activeSlice from '@/state/reducers/activeSlice'
import {
  localStorageMiddleware,
  reHydrateStore,
} from '@/state/middleware/localStorage';

const store = configureStore({
  reducer: {
    //chunks: chunksReducer,
    folders: foldersReducer,
    chunks: chunksSlice,
    active: activeSlice,
  },
  preloadedState: reHydrateStore(),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
