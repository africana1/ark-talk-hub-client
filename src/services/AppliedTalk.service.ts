import http from './http';
import {IAppliedTalk} from './service.interface';

type NewAppliedTalk = Omit<IAppliedTalk, 'id'>;

//** get applied talks */
export const GetAppliedTalks = async () => {
  try {
    const res = await http.get(`/applied-talks`);
    return res.data.data;
  } catch (err) {
    return err;
  }
};

//** create applied talk */
export const CreateAppliedTalk = async (data: NewAppliedTalk) => {
  try {
    const res = await http.post('/applied-talks', data);
    return res.data.data;
  } catch (err) {
    return err;
  }
};

//** delete applied talk by id */
export const DeleteAppliedTalkById = async (id: string) => {
  try {
    const res = await http.delete(`/talks/${id}`);
    return res.data.data;
  } catch (err) {
    return err;
  }
};
