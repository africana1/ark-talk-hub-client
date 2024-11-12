import {Fragment} from 'react/jsx-runtime';
import {Navbar} from '../../components/navbar';
import {RegistrationForm} from '../../components/register';

export default function Register() {
  return (
    <Fragment>
      <Navbar />
      <RegistrationForm />;
    </Fragment>
  );
}
