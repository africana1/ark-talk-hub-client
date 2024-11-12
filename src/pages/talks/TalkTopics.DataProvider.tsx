import {useEffect} from 'react';
import {useAppDispatch} from '../../store';
import {getSpeakers} from '../../store/slices/speakersSlice';
import {getTalks} from '../../store/slices/talksSlice';

const TalkTopicsDataProvider = ({children}: {children: React.ReactNode}) => {
  const dispatch = useAppDispatch();

  async function fetchData() {
    try {
      await dispatch(getSpeakers()).unwrap();
      await dispatch(getTalks()).unwrap();
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
export default TalkTopicsDataProvider;
