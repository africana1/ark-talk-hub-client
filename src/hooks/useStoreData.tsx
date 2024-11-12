import {useSelector} from 'react-redux';
import {RootState} from '../store';
import _ from 'lodash';

const useStoreData = () => {
  //** get admin auth from store state */
  const getAdminAuth = useSelector((state: RootState) => state?.auth?.admin);

  //** get attendee auth from store state */
  const getAttendeeAuth = useSelector((state: RootState) => state?.auth?.attendee);

  //** get speakers from store state */
  const speakers = useSelector((state: RootState) => state?.speakers?.speakers);

  //** sort speakers */
  const getStoreSpeakers = _.orderBy(speakers, ['createdAt'], ['asc']);

  //** get talks from talks state */
  const talks = useSelector((state: RootState) => state?.talks?.talks);

  //** sort talks */
  const getStoreTalks = _.orderBy(talks, ['createdAt'], ['desc']);

  //** get applied talks from store state */
  const appliedTalks = useSelector((state: RootState) => state?.appliedTalks?.appliedTalks);

  //** sort attendees */
  const getStoreAppliedTalks = _.orderBy(appliedTalks, ['createdAt'], ['asc']);

  const getStoreSpeakerById = (id: string) => {
    return speakers?.find((speaker) => speaker?.id === id);
  };

  //** get attendees from store state */
  const attendees = useSelector((state: RootState) => state.attendees.attendees);

  //** sort attendees */
  const getStoreAttendees = _.orderBy(attendees, ['createdAt'], ['asc']);

  return {
    getAdminAuth,
    getAttendeeAuth,
    getStoreSpeakers,
    getStoreTalks,
    getStoreAppliedTalks,
    getStoreSpeakerById,
    getStoreAttendees,
  };
};

export default useStoreData;
