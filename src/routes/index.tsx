import {lazy} from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import {ALLOWED_ROLE} from '../constants/app.config';

// suspense components
import Loadable from '../components/loadable';

//lazy loading components
const AdminLogin = Loadable(lazy(() => import('../pages/auth/LoginAdmin')));
const AttendeeLogin = Loadable(lazy(() => import('../pages/auth/LoginAttendee')));
const Register = Loadable(lazy(() => import('../pages/auth/Register')));
const Layout = Loadable(lazy(() => import('../pages/auth/Layout')));
const HomePage = Loadable(lazy(() => import('../pages/dashboard/Home')));
const Dashboard = Loadable(lazy(() => import('../pages/dashboard/Dashboard')));
const AddSpeaker = Loadable(lazy(() => import('../pages/speakers/AddSpeaker')));
const ViewSpeakers = Loadable(lazy(() => import('../pages/speakers/ViewSpeakers')));
const AddTopic = Loadable(lazy(() => import('../pages/talks/AddTalkTopic')));
const ViewTopics = Loadable(lazy(() => import('../pages/talks/ViewTalkTopics')));
const ViewAttendees = Loadable(lazy(() => import('../pages/attendees/ViewAttendees')));
const AvailableTopics = Loadable(lazy(() => import('../pages/available-topics/AvailableTopics')));
const Chat = Loadable(lazy(() => import('../pages/chat/Chat')));
const ProtectedRouteAndAccessAuth = Loadable(lazy(() => import('../pages/auth/ProtectedRoutes')));
const Logout = Loadable(lazy(() => import('../pages/auth/Logout')));

export function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route index element={<AttendeeLogin />} />
      <Route path='/login' element={<AttendeeLogin />} />
      <Route path='/admin' element={<AdminLogin />} />
      <Route path='/logout' element={<Logout />} />
      <Route path='/register' element={<Register />} />
      {/* Protected Routes */}
      <Route>
        <Route path='/' element={<Layout />}>
          <Route
            path='/ark-talk-hub'
            element={
              <ProtectedRouteAndAccessAuth allowedRoles={[ALLOWED_ROLE.ADMIN, ALLOWED_ROLE.ATTENDEE]}>
                <HomePage />
              </ProtectedRouteAndAccessAuth>
            }
          />

          <Route
            path='/dashboard'
            element={
              <ProtectedRouteAndAccessAuth allowedRoles={[ALLOWED_ROLE.ADMIN]}>
                <Dashboard />
              </ProtectedRouteAndAccessAuth>
            }
          />

          <Route
            path='/add-speaker'
            element={
              <ProtectedRouteAndAccessAuth allowedRoles={[ALLOWED_ROLE.ADMIN]}>
                <AddSpeaker />
              </ProtectedRouteAndAccessAuth>
            }
          />
          <Route
            path='/view-speakers'
            element={
              <ProtectedRouteAndAccessAuth allowedRoles={[ALLOWED_ROLE.ADMIN]}>
                <ViewSpeakers />
              </ProtectedRouteAndAccessAuth>
            }
          />
          <Route
            path='/add-topic'
            element={
              <ProtectedRouteAndAccessAuth allowedRoles={[ALLOWED_ROLE.ADMIN]}>
                <AddTopic />
              </ProtectedRouteAndAccessAuth>
            }
          />
          <Route
            path='/view-topics'
            element={
              <ProtectedRouteAndAccessAuth allowedRoles={[ALLOWED_ROLE.ADMIN]}>
                <ViewTopics />
              </ProtectedRouteAndAccessAuth>
            }
          />
          <Route
            path='/view-attendees'
            element={
              <ProtectedRouteAndAccessAuth allowedRoles={[ALLOWED_ROLE.ADMIN]}>
                <ViewAttendees />
              </ProtectedRouteAndAccessAuth>
            }
          />
          <Route
            path='/view-attendees'
            element={
              <ProtectedRouteAndAccessAuth allowedRoles={[ALLOWED_ROLE.ADMIN]}>
                <ViewAttendees />
              </ProtectedRouteAndAccessAuth>
            }
          />
          <Route
            path='/available-topics'
            element={
              <ProtectedRouteAndAccessAuth allowedRoles={[ALLOWED_ROLE.ATTENDEE]}>
                <AvailableTopics />
              </ProtectedRouteAndAccessAuth>
            }
          />
          <Route
            path='/chat'
            element={
              <ProtectedRouteAndAccessAuth allowedRoles={[ALLOWED_ROLE.ATTENDEE]}>
                <Chat />
              </ProtectedRouteAndAccessAuth>
            }
          />
        </Route>
      </Route>
      {/* Catch all route */}
      <Route path='*' element={<Navigate to='/login' replace />} />
    </Routes>
  );
}
