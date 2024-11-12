import {useState} from 'react';
import useStoreData from '../hooks/useStoreData';
import {Input} from './ui/input';
import {Label} from './ui/label';
import {SubmitButton} from './submit-button';
import {createTalk} from '../store/slices/talksSlice';
import {useAppDispatch} from '../store';
import {ToastContainer, toast} from 'react-toastify';

type Topic = {
  topicTitle: string;
  date: Date;
  time: string;
  location: string;
  speakerId: string;
  appliedTalk?: [];
};

const formatDate = (date: Date): string => {
  return new Date(date).toISOString().split('T')[0];
};

const initialState = {
  topicTitle: '',
  date: new Date(),
  time: '',
  location: '',
  speakerId: '',
};

export function AddTopic() {
  const [formData, setFormData] = useState<Topic>(initialState);
  const [isLoading, setIsLoading] = useState(false);

  //** get data from store */
  const {getStoreSpeakers} = useStoreData();

  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      await dispatch(createTalk(formData));
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

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  return (
    <div className='container w-full max-w-md	 shadow-lg p-4 mt-5 border rounded-lg'>
      <h3 className='text-2xl text-center'>Add Topic</h3>
      <ToastContainer />
      <form onSubmit={handleSubmit} className='grid gap-4'>
        <div className='grid gap-2'>
          <label htmlFor='speakerId'>Speaker</label>
          <select
            id='speakerId'
            name='speakerId'
            value={formData.speakerId}
            onChange={handleSelectChange}
            className='block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-1 px-4 pr-8 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-100 focus:border-slate-100'
          >
            <option>Select speaker</option>
            {getStoreSpeakers &&
              getStoreSpeakers?.map((speaker) => (
                <option key={speaker.id} value={speaker.id}>
                  {speaker.firstName} {speaker.lastName}
                </option>
              ))}
          </select>

          <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-gray-700'>
            <svg
              className='w-5 h-5'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 9l-7 7-7-7' />
            </svg>
          </div>
        </div>

        <div>
          <Label htmlFor='topicTitle'>Topic Title</Label>
          <Input
            id='topicTitle'
            name='topicTitle'
            value={formData.topicTitle}
            onChange={handleChange}
            placeholder='Topic Title'
            required
          />
        </div>

        <div>
          <Label htmlFor='date'>Date</Label>
          <Input
            id='date'
            name='date'
            type='date'
            value={formatDate(formData.date)}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor='time'>Time</Label>
          <Input
            id='time'
            name='time'
            value={formData.time}
            onChange={handleChange}
            placeholder='AM | PM'
            required
          />
        </div>

        <div>
          <Label htmlFor='location'>Location</Label>
          <Input
            id='location'
            name='location'
            value={formData.location}
            onChange={handleChange}
            placeholder='Location'
            required
          />
        </div>

        <SubmitButton isLoading={isLoading} value='Submit' loadingText='Processing...' />
      </form>
    </div>
  );
}
