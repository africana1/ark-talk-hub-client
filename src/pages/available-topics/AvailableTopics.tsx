import {AvailableTopics} from '../../components/available-topics';
import AppliedAvailableDataProvider from './Topics.DataProvider';
export default function ApppliedTopics() {
  return (
    <AppliedAvailableDataProvider>
      <AvailableTopics />
    </AppliedAvailableDataProvider>
  );
}
