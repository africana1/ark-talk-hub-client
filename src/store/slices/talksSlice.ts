import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {GetTalks, CreateTalk, DeleteTalkById} from '../../services/Talk.service';
import {ITalk} from '../../services/service.interface';

interface TalkState {
  talks: ITalk[];
}

type INewTalk = Omit<ITalk, 'id' | 'appliedTalk'>;

export const getTalks = createAsyncThunk('talk/get', async () => {
  const res = await GetTalks();
  return res;
});

export const createTalk = createAsyncThunk('talk/create', async (data: INewTalk) => {
  const res = await CreateTalk(data);
  return res;
});

export const deleteTalk = createAsyncThunk('talk/delete', async (id: string) => {
  await DeleteTalkById(id);
  return id;
});

// Initial State
const initialState: TalkState = {
  talks: [],
};

// Slice
const talksSlice = createSlice({
  name: 'talks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTalks.fulfilled, (state, {payload}) => {
      state.talks = payload;
    });
    builder.addCase(createTalk.fulfilled, (state, {payload}: PayloadAction<ITalk>) => {
      state.talks.push(payload);
    });
    builder.addCase(deleteTalk.fulfilled, (state, {payload}: PayloadAction<string>) => {
      state.talks = state.talks.filter((talk) => talk.id !== payload);
    });
  },
});

export default talksSlice.reducer;
