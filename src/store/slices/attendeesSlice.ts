import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {GetAttendees, DeleteAttendeeById} from '../../services/Attendee.service';
import {IAttendees} from '../../services/service.interface';

interface AttendeeState {
  attendees: IAttendees[];
}
export const getAttendees = createAsyncThunk('attendee/get', async () => {
  const res = await GetAttendees();
  return res;
});

export const deleteAttendee = createAsyncThunk('attendee/delete', async (id: string) => {
  await DeleteAttendeeById(id);
  return id;
});

// Initial State
const initialState: AttendeeState = {
  attendees: [],
};

// Slice
const attendeesSlice = createSlice({
  name: 'attendees',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAttendees.fulfilled, (state, {payload}) => {
      state.attendees = payload;
    });

    builder.addCase(deleteAttendee.fulfilled, (state, {payload}: PayloadAction<string>) => {
      state.attendees = state.attendees.filter((attendee) => attendee.id !== payload);
    });
  },
});

export default attendeesSlice.reducer;
