import {AddTopic} from '../../components/add-topic';
import TalkTopicsDataProvider from './TalkTopics.DataProvider';
export default function Topic() {
  return (
    <TalkTopicsDataProvider>
      <AddTopic />;
    </TalkTopicsDataProvider>
  );
}
