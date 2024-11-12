import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '../components/ui/card';
import {Input} from '../components/ui/input';
import {Label} from '../components/ui/label';
import {attendeeSignUp} from '../store/slices/authSlice';
import {useAppDispatch} from '../store';
import {ToastContainer, toast} from 'react-toastify';
import {SubmitButton} from './submit-button';

type Attendee = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
};

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  phone: '',
};

export function RegistrationForm() {
  const [formData, setFormData] = useState<Attendee>(initialState);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      await dispatch(attendeeSignUp(formData));
      setIsLoading(false);

      toast.success(`Success`, {
        position: 'top-right',
        autoClose: 2500,
        closeOnClick: true,
      });
      setFormData(initialState);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch {
      toast.error('Error please again', {
        position: 'top-right',
        autoClose: 2500,
        closeOnClick: true,
      });
    }
  };

  //** handle input change */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  return (
    <div className='flex h-screen'>
      <ToastContainer />
      {/* Left Side - Image */}
      <div className='flex flex-1 basis-1/2 items-center justify-center bg-gray-100'>
        <img src='/register.jpg' alt='Conference Illustration' className='h-full w-full object-cover' />
      </div>

      {/* Right Side - Registration Form */}
      <div className='flex-1 basis-1/2 justify-center bg-slate-200 py-10 lg:py-0'>
        <Card className='mx-auto max-w-sm mt-10'>
          <CardHeader className='text-center'>
            <CardTitle className='text-3xl font-semibold'>Create an Account</CardTitle>
            <CardDescription className='text-gray-500 mt-2'>
              Join us today to stay updated with all talks and events
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className='grid gap-4'>
              {/* First Name */}
              <div className='grid gap-2'>
                <Label htmlFor='firstName'>First Name</Label>
                <Input
                  id='firstName'
                  name='firstName'
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder='First Name'
                  required
                />
              </div>

              {/* Last Name */}
              <div className='grid gap-2'>
                <Label htmlFor='lastName'>Last Name</Label>
                <Input
                  id='lastName'
                  name='lastName'
                  value={formData.lastName}
                  placeholder='Last Name'
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Email */}
              <div className='grid gap-2'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  name='email'
                  value={formData.email}
                  placeholder='name@example.copm'
                  onChange={handleChange}
                  pattern='[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}'
                  required
                />
              </div>
              {/* Password */}
              <div className='grid gap-2'>
                <Label htmlFor='password'>Password</Label>
                <Input
                  id='password'
                  name='password'
                  type='password'
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Phone */}
              <div className='grid gap-2'>
                <Label htmlFor='phone'>Phone</Label>
                <Input
                  id='phone'
                  name='phone'
                  value={formData.phone}
                  placeholder='123-456-7890'
                  onChange={handleChange}
                />
              </div>

              {/* Submit Button */}
              <SubmitButton isLoading={isLoading} value='Submit' loadingText='Submitting...' />
            </form>
            <div className='mt-4 text-center text-sm text-gray-600'>
              Already have an account?{' '}
              <Link to='/login' className='underline text-blue-600'>
                Login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
