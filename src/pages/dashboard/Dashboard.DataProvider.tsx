import {useEffect} from 'react';
import {useAppDispatch} from '../../store';
import {getSpeakers} from '../../store/slices/speakersSlice';
import {getTalks} from '../../store/slices/talksSlice';
import {getAttendees} from '../../store/slices/attendeesSlice';
import {getAppliedTalks} from '../../store/slices/appliedTalksSlice';
import {useAuth} from '../../hooks/useAuth';
import {ROLE} from '../../constants/app.config';

const DashboardDataProvider = ({children}: {children: React.ReactNode}) => {
  const dispatch = useAppDispatch();
  const {user} = useAuth();

  async function fetchData() {
    try {
      if (user?.role === ROLE.ADMIN) {
        await dispatch(getSpeakers()).unwrap();
        await dispatch(getTalks()).unwrap();
        await dispatch(getAttendees()).unwrap();
        await dispatch(getAppliedTalks()).unwrap();
      } else if (user?.role === ROLE.ATTENDEE) {
        await dispatch(getTalks()).unwrap();
        await dispatch(getSpeakers()).unwrap();
      }
    } catch (err) {
      return err;
    }
  }

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return <div>{children}</div>;
};
export default DashboardDataProvider;
