import {useState} from 'react';
import useStoreData from '../hooks/useStoreData';
import {deleteTalk} from '../store/slices/talksSlice';
import {useAppDispatch} from '../store';
import {DeleteButton} from './submit-button';
import {ToastContainer, toast} from 'react-toastify';

interface ITalkTopic {
  id: string;
  topicTitle: string;
  date: Date;
  time: string;
  location: string;
  speakerId: string;
  createdAt?: string;
  updatedAt?: string;
  appliedTalk?: [];
}

export function ViewTopics() {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const dispatch = useAppDispatch();

  //** get data from store */
  const {getStoreTalks, getStoreSpeakerById} = useStoreData();

  const talks: ITalkTopic[] = getStoreTalks;

  const handleDelete = async (id: string) => {
    try {
      setLoadingId(id);
      await dispatch(deleteTalk(id));
      toast.success(`Success`, {
        position: 'top-right',
        autoClose: 2500,
        closeOnClick: true,
      });
    } catch {
      toast.error('Error please try again', {
        position: 'top-right',
        autoClose: 2500,
        closeOnClick: true,
      });
    }
  };

  return (
    <div className='container p-4'>
      <h2 className='text-2xl font-semibold mb-4 ml-32 text-center'>Topics List</h2>
      <ToastContainer />
      <div className='overflow-x-auto'>
        <table className='w-full bg-slate-100 border border-gray-200 rounded-lg shadow-lg'>
          <thead>
            <tr>
              <th className='px-4 py-2 border-b text-left text-gray-700'>Topic Title</th>
              <th className='px-4 py-2 border-b text-left text-gray-700'>Date</th>
              <th className='px-4 py-2 border-b text-left text-gray-700'>Time</th>
              <th className='px-4 py-2 border-b text-left text-gray-700'>Location</th>
              <th className='px-4 py-2 border-b text-left text-gray-700'>Speaker</th>
              <th className='px-4 py-2 border-b text-left text-gray-700'>Applicants</th>
              <th className='px-4 py-2 border-b text-left text-gray-700'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {talks?.map((talk) => (
              <tr key={talk.id} className='hover:bg-gray-100'>
                <td className='px-4 py-2 border-b'>{talk.topicTitle}</td>

                <td className='px-4 py-2 border-b'>{new Date(talk.date).toLocaleDateString()}</td>

                <td className='px-4 py-2 border-b'>{talk.time}</td>

                <td className='px-4 py-2 border-b'>{talk.location}</td>

                <td className='px-4 py-2 border-b'>
                  {getStoreSpeakerById(talk.speakerId)?.firstName +
                    ' ' +
                    getStoreSpeakerById(talk.speakerId)?.lastName}
                </td>

                <td className='px-12 py-2 border-b'>{talk.appliedTalk ? talk?.appliedTalk.length : 0}</td>

                <td className='px-4 py-2 border-b'>
                  <DeleteButton
                    isLoading={loadingId === talk.id}
                    itemCount={talk.appliedTalk ? talk?.appliedTalk.length > 0 : false}
                    value='Delete'
                    type='button'
                    onClick={() => handleDelete(talk.id)}
                    loadingText='Processing...'
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
