import {ViewSpeakers} from '../../components/view-speakers';
import SpeakersDataProvider from './Speaker.DataProvider';
export default function Speaker() {
  return (
    <SpeakersDataProvider>
      <ViewSpeakers />
    </SpeakersDataProvider>
  );
}
