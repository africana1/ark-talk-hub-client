import http from './http';
import {IAttendee} from './service.interface';

type UpdateAttendee = Partial<IAttendee>;

//** get attendee by Id */
export const GetAttendees = async () => {
  try {
    const res = await http.get(`/attendees`);
    return res.data.data;
  } catch (err) {
    return err;
  }
};

//** get attendee by Id */
export const GetAttendeeById = async (id: string) => {
  try {
    const res = await http.get(`/attendees/${id}`);
    return res.data.data;
  } catch (err) {
    return err;
  }
};

//** create attendee */
export const CreateAttendee = async (data: IAttendee) => {
  try {
    const res = await http.post('/attendees', data);
    return res.data.data;
  } catch (err) {
    return err;
  }
};

//** update attendee by id */
export const UpdateAttendeeById = async (id: string, data: UpdateAttendee) => {
  try {
    const res = await http.patch(`/attendees/${id}`, data);
    return res.data.data;
  } catch (err) {
    return err;
  }
};

//** delete attendee by id */
export const DeleteAttendeeById = async (id: string) => {
  try {
    const res = await http.delete(`/attendees/${id}`);
    return res.data.data;
  } catch (err) {
    return err;
  }
};
