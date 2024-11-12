import {useState} from 'react';
import {Input} from './ui/input';
import {Label} from './ui/label';
import {SubmitButton} from './submit-button';
import {createSpeaker} from '../store/slices/speakersSlice';
import {useAppDispatch} from '../store';
import {ToastContainer, toast} from 'react-toastify';

type Speaker = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
};

export function AddSpeaker() {
  const [formData, setFormData] = useState<Speaker>(initialState);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      await dispatch(createSpeaker(formData));
      setIsLoading(false);

      toast.success(`Success`, {
        position: 'top-right',
        autoClose: 2500,
        closeOnClick: true,
      });
      setFormData(initialState);
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
    <div className='container w-full max-w-md	 shadow-lg p-4 mt-5 border rounded-lg'>
      <h3 className='text-2xl text-center'>Add Speaker</h3>
      <ToastContainer />
      <form onSubmit={handleSubmit} className='grid gap-4'>
        <div>
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
        <div>
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
        <div>
          <Label htmlFor='email'>Email</Label>
          <Input
            id='email'
            name='email'
            value={formData.email}
            placeholder='name@example.com'
            onChange={handleChange}
            pattern='[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}'
            required
          />
        </div>
        <div>
          <Label htmlFor='phone'>Phone</Label>
          <Input
            id='phone'
            name='phone'
            value={formData.phone}
            placeholder='Phone'
            onChange={handleChange}
            required
          />
        </div>

        <SubmitButton isLoading={isLoading} value='Submit' loadingText='Submitting...' />
      </form>
    </div>
  );
}
