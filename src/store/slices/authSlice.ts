import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {AdminSignIn, AttendeeSignIn, AttendeeSignUp} from '../../services/Auth.service';
import {IAuth, IAttendee} from '../../services/service.interface';

interface IAuthState {
  admin: IAuth[];
  attendee: IAuth[];
}

type NewAttendee = Omit<IAttendee, 'id'>;

export const adminSignIn = createAsyncThunk('admin/get', async (data: IAuth) => {
  const res = await AdminSignIn(data);
  return res;
});

export const attendeeSignIn = createAsyncThunk('attendee/get', async (data: IAuth) => {
  const res = await AttendeeSignIn(data);
  return res;
});

export const attendeeSignUp = createAsyncThunk('attendeen/create', async (data: NewAttendee) => {
  const res = await AttendeeSignUp(data);
  return res;
});

// Initial State
const initialState: IAuthState = {
  admin: [],
  attendee: [],
};

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.admin = [];
      state.attendee = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(adminSignIn.fulfilled, (state, {payload}) => {
      const admin = payload?.data?.user;
      state.admin = admin;
    });
    builder.addCase(attendeeSignIn.fulfilled, (state, {payload}) => {
      const user = payload?.data?.user;
      state.attendee = user;
    });
  },
});

export const {logout} = authSlice.actions;
export default authSlice.reducer;
