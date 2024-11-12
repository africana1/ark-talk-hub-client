import {useEffect} from 'react';
import {useAppDispatch} from '../../store';
import {getAttendees} from '../../store/slices/attendeesSlice';

const AttendeesDataProvider = ({children}: {children: React.ReactNode}) => {
  const dispatch = useAppDispatch();
  async function fetchData() {
    try {
      await dispatch(getAttendees()).unwrap();
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
export default AttendeesDataProvider;
