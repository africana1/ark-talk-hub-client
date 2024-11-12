import http from './http';
import {ITalk} from './service.interface';

type NewTalk = Omit<ITalk, 'id' | 'appliedTalk'>;
type UpdateTalk = Partial<ITalk>;

//** get talk by Id */
export const GetTalks = async () => {
  try {
    const res = await http.get(`/talks`);
    return res.data.data;
  } catch (err) {
    return err;
  }
};

//** get talk by Id */
export const GetTalkById = async (id: string) => {
  try {
    const res = await http.get(`/talks/${id}`);
    return res.data.data;
  } catch (err) {
    return err;
  }
};

//** create talk */
export const CreateTalk = async (data: NewTalk) => {
  try {
    const res = await http.post('/talks', data);
    return res.data.data;
  } catch (err) {
    return err;
  }
};

//** update talk by id */
export const UpdateTalkById = async (id: string, data: UpdateTalk) => {
  try {
    const res = await http.patch(`/talks/${id}`, data);
    return res.data.data;
  } catch (err) {
    return err;
  }
};

//** delete talk by id */
export const DeleteTalkById = async (id: string) => {
  try {
    const res = await http.delete(`/talks/${id}`);
    return res.data.data;
  } catch (err) {
    return err;
  }
};
