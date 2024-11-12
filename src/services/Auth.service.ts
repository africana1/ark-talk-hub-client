import http from './http';
import {IAuth, IAttendee} from './service.interface';

type NewAttendee = Omit<IAttendee, 'id'>;

//** admin sign-in */
export const AdminSignIn = async (data: IAuth) => {
  try {
    const res = await http.post('/auth/admin-sign-in', data);
    return res.data;
  } catch (err) {
    return err;
  }
};

//** attendee sign-in */
export const AttendeeSignIn = async (data: IAuth) => {
  try {
    const res = await http.post('/auth/attendee-sign-in', data);
    return res.data;
  } catch (err) {
    return err;
  }
};

//** attendee sign-up */
export const AttendeeSignUp = async (data: NewAttendee) => {
  try {
    const res = await http.post('/auth/attendee-sign-up', data);
    return res.data.data;
  } catch (err) {
    return err;
  }
};
