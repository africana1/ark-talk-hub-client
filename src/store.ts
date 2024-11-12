import {configureStore} from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import {useDispatch} from 'react-redux';
import authSlice from './store/slices/authSlice';
import speakersSlice from './store/slices/speakersSlice';
import talksSlice from './store/slices/talksSlice';
import appliedTalksSlice from './store/slices/appliedTalksSlice';
import attendeesSlice from './store/slices/attendeesSlice';

const reducers = combineReducers({
  auth: authSlice,
  speakers: speakersSlice,
  talks: talksSlice,
  appliedTalks: appliedTalksSlice,
  attendees: attendeesSlice,
});

//** redux persist config */
const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export type RootState = ReturnType<typeof store.getState>;
export default store;
