import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {GetSpeakers, CreateSpeaker, DeleteSpeakerById} from '../../services/Speaker.service';
import {IBaseInterface as ISpeaker} from '../../services/service.interface';

interface SpeakerState {
  speakers: ISpeaker[];
}

type INewSpeaker = Omit<ISpeaker, 'id'>;

export const getSpeakers = createAsyncThunk('speaker/get', async () => {
  const res = await GetSpeakers();
  return res;
});

export const createSpeaker = createAsyncThunk('speaker/create', async (data: INewSpeaker) => {
  const res = await CreateSpeaker(data);
  return res;
});

export const deleteSpeaker = createAsyncThunk('speaker/delete', async (id: string) => {
  await DeleteSpeakerById(id);
  return id;
});

// Initial State
const initialState: SpeakerState = {
  speakers: [],
};

// Slice
const speakersSlice = createSlice({
  name: 'speakers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSpeakers.fulfilled, (state, {payload}) => {
      state.speakers = payload;
    });
    builder.addCase(createSpeaker.fulfilled, (state, {payload}: PayloadAction<ISpeaker>) => {
      state.speakers.push(payload);
    });
    builder.addCase(deleteSpeaker.fulfilled, (state, {payload}: PayloadAction<string>) => {
      state.speakers = state.speakers.filter((speaker) => speaker.id !== payload);
    });
  },
});

export default speakersSlice.reducer;
