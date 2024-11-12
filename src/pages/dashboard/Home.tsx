import {HomePage} from '../../components/home';
import DashboardDataProvider from './Dashboard.DataProvider';

export default function Chat() {
  return (
    <DashboardDataProvider>
      <HomePage />
    </DashboardDataProvider>
  );
}
