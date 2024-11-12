import {useState} from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from './ui/card';

import {Input} from './ui/input';
import {Label} from './ui/label';
import {Link, useNavigate} from 'react-router-dom';
import {adminSignIn} from '../store/slices/authSlice';
import {useAppDispatch} from '../store';
import {ToastContainer, toast} from 'react-toastify';
import {SubmitButton} from './submit-button';
import {useAuth} from '../hooks/useAuth';

type Attendee = {
  role?: string;
  email: string;
  password: string;
};

const initialState = {
  role: 'admin',
  email: '',
  password: '',
};

export function AdminLoginForm() {
  const [formData, setFormData] = useState<Attendee>(initialState);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {setToken} = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      setIsLoading(true);

      const data = await dispatch(adminSignIn({email: formData.email, password: formData.password}));

      if (data && data.payload.status === 201) {
        localStorage.removeItem('token');
        localStorage.setItem('user', JSON.stringify(data.payload.data.user));
        setToken(data.payload.data.accessToken.token);
        toast.success(`Success`, {
          position: 'top-right',
          autoClose: 3500,
          closeOnClick: true,
        });

        setTimeout(() => {
          setFormData(initialState);
          setIsLoading(false);
          navigate('/ark-talk-hub');
        }, 2000);
      } else if (data.payload.status !== 201) {
        toast.error('Error please again', {
          position: 'top-right',
          autoClose: 2500,
          closeOnClick: true,
        });
        setIsLoading(false);
      }
    } catch {
      toast.error('Error please again', {
        position: 'top-right',
        autoClose: 2500,
        closeOnClick: true,
      });
      setIsLoading(false);
    }
  };

  //** handle input change */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  return (
    <div className='flex h-screen'>
      <ToastContainer />
      {/* Left Side - Image (2/3 of screen) */}
      <div className='flex flex-1 basis-2/3 items-center justify-center bg-gray-100'>
        <img src='/login.jpg' alt='Conference Illustration' className='h-full w-full object-cover' />
      </div>

      {/* Right Side - Login Form (1/3 of screen) */}
      <div className='flex-1 basis-1/3 justify-center bg-slate-200 py-10 lg:py-0'>
        <Card className='mx-auto max-w-sm mt-10'>
          <CardHeader className='text-center'>
            <CardTitle className='text-3xl font-semibold'>Site Admin</CardTitle>
            <CardDescription className='text-gray-500 mt-2'>
              Enter the Hub of Management Excellence
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className='grid gap-4' onSubmit={handleSubmit}>
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
              <div className='grid gap-2'>
                <div className='flex items-center'>
                  <Label htmlFor='password'>Password</Label>
                </div>
                <Input
                  id='password'
                  name='password'
                  type='password'
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <SubmitButton isLoading={isLoading} value='Submit' loadingText='Signing In...' />
            </form>
            <div className='mt-4 text-center text-sm'>
              Don&apos;t have an account?{' '}
              <Link to='/register' className='underline'>
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
