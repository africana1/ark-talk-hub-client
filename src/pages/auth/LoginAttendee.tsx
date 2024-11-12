import {Fragment} from 'react';
import {Navbar} from '../../components/navbar';
import {AttendeeLoginForm} from '../../components/login-attendee';

export default function AttendeeLogin() {
  return (
    <Fragment>
      <Navbar />
      <AttendeeLoginForm />;
    </Fragment>
  );
}
