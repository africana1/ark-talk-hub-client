import {useEffect} from 'react';
import {useAppDispatch} from '../../store';
import {getSpeakers} from '../../store/slices/speakersSlice';

const SpeakersDataProvider = ({children}: {children: React.ReactNode}) => {
  const dispatch = useAppDispatch();
  async function fetchData() {
    try {
      await dispatch(getSpeakers()).unwrap();
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
export default SpeakersDataProvider;
