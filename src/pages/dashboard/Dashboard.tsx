import {Dashboard} from '../../components/dashboard';
import DashboardDataProvider from './Dashboard.DataProvider';
export default function Chat() {
  return (
    <DashboardDataProvider>
      <Dashboard />
    </DashboardDataProvider>
  );
}
