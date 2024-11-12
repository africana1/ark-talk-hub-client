import {ViewTopics} from '../../components/view-topics';
import TalkTopicsDataProvider from './TalkTopics.DataProvider';
export default function Topics() {
  return (
    <TalkTopicsDataProvider>
      <ViewTopics />
    </TalkTopicsDataProvider>
  );
}
