import {ViewAttendees} from '../../components/view-attendees';
import AttendeesDataProvider from './Attendee.DataProvider';
export default function Attendees() {
  return (
    <AttendeesDataProvider>
      <ViewAttendees />
    </AttendeesDataProvider>
  );
}
