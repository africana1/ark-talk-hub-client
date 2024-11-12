import {useEffect} from 'react';
import {useAppDispatch} from '../../store';
import {getTalks} from '../../store/slices/talksSlice';
import {getSpeakers} from '../../store/slices/speakersSlice';

const AppliedAvailableDataProvider = ({children}: {children: React.ReactNode}) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchData() {
      try {
        await dispatch(getTalks()).unwrap();
        await dispatch(getSpeakers()).unwrap();
      } catch (err) {
        return err;
      }
    }
    fetchData();
  }, [dispatch]);

  return <div>{children}</div>;
};
export default AppliedAvailableDataProvider;
