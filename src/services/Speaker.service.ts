import http from './http';
import {IBaseInterface as ISpeaker} from './service.interface';

type NewSpeaker = Omit<ISpeaker, 'id'>;
type UpdateSpeaker = Partial<ISpeaker>;

//** get speaker by Id */
export const GetSpeakers = async () => {
  try {
    const res = await http.get(`/speakers`);
    return res.data.data;
  } catch (err) {
    return err;
  }
};

//** get speaker by Id */
export const GetSpeakerById = async (id: string) => {
  try {
    const res = await http.get(`/speakers/${id}`);
    return res.data.data;
  } catch (err) {
    return err;
  }
};

//** create speaker */
export const CreateSpeaker = async (data: NewSpeaker) => {
  try {
    const res = await http.post('/speakers', data);
    return res.data.data;
  } catch (err) {
    return err;
  }
};

//** update speaker by id */
export const UpdateSpeakerById = async (id: string, data: UpdateSpeaker) => {
  try {
    const res = await http.patch(`/speakers/${id}`, data);
    return res.data.data;
  } catch (err) {
    return err;
  }
};

//** delete speaker by id */
export const DeleteSpeakerById = async (id: string) => {
  try {
    const res = await http.delete(`/speakers/${id}`);
    return res.data.data;
  } catch (err) {
    return err;
  }
};
