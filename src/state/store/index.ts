import { configureStore } from '@reduxjs/toolkit';

// STATE
import chunksReducer from '@/state/reducers/chunksSlice';
import {
  localStorageMiddleware,
  reHydrateStore,
} from '@/state/middleware/localStorage';

const store = configureStore({
  reducer: {
    chunks: chunksReducer,
  },
  preloadedState: reHydrateStore(),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
