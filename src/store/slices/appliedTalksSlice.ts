import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {GetAppliedTalks, CreateAppliedTalk, DeleteAppliedTalkById} from '../../services/AppliedTalk.service';
import {IAppliedTalk} from '../../services/service.interface';

interface AppliedTalkState {
  appliedTalks: IAppliedTalk[];
}

type INewAppliedTalk = Omit<IAppliedTalk, 'id'>;

export const getAppliedTalks = createAsyncThunk('appliedTalk/get', async () => {
  const res = await GetAppliedTalks();
  return res;
});

export const createAppliedTalk = createAsyncThunk('appliedTalk/create', async (data: INewAppliedTalk) => {
  const res = await CreateAppliedTalk(data);
  return res;
});

export const deleteAppliedTalk = createAsyncThunk('appliedTalk/delete', async (id: string) => {
  await DeleteAppliedTalkById(id);
  return id;
});

// Initial State
const initialState: AppliedTalkState = {
  appliedTalks: [],
};

// Slice
const appliedTalksSlice = createSlice({
  name: 'appliedTalks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAppliedTalks.fulfilled, (state, {payload}) => {
      state.appliedTalks = payload;
    });
    builder.addCase(createAppliedTalk.fulfilled, (state, {payload}) => {
      const updatedTalks = [
        ...state.appliedTalks.filter((talk) => talk.attendeeId !== payload.attendeeId),
        payload,
      ];

      state.appliedTalks = updatedTalks;
    });
    builder.addCase(deleteAppliedTalk.fulfilled, (state, {payload}: PayloadAction<string>) => {
      state.appliedTalks = state.appliedTalks.filter((appliedTalk) => appliedTalk.id !== payload);
    });
  },
});

export default appliedTalksSlice.reducer;
