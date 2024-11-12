import {Fragment} from 'react';
import {Navbar} from '../../components/navbar';
import {AdminLoginForm} from '../../components/login-admin';

export default function AdminLogin() {
  return (
    <Fragment>
      <Navbar />
      <AdminLoginForm />;
    </Fragment>
  );
}
