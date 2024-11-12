import {useState} from 'react';
import useStoreData from '../hooks/useStoreData';
import {deleteSpeaker} from '../store/slices/speakersSlice';
import {useAppDispatch} from '../store';
import {DeleteButton} from './submit-button';
import {ToastContainer, toast} from 'react-toastify';

export function ViewSpeakers() {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  //** get data from store */
  const {getStoreSpeakers} = useStoreData();

  const speakers = getStoreSpeakers;

  const handleDelete = async (id: string) => {
    try {
      setLoadingId(id);
      await dispatch(deleteSpeaker(id));
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
      <h2 className='text-2xl font-semibold mb-4 ml-24'>Speakers List</h2>
      <ToastContainer />
      <div className='overflow-x-auto'>
        <table className='w-auto bg-slate-100 border border-gray-200 rounded-lg shadow-lg'>
          <thead>
            <tr>
              <th className='px-4 py-2 border-b text-left text-gray-700'>Name</th>
              <th className='px-4 py-2 border-b text-left text-gray-700'>Total Topics</th>
              <th className='px-4 py-2 border-b text-left text-gray-700'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {speakers?.map((speaker, index) => (
              <tr key={index} className='hover:bg-gray-100'>
                <td className='px-4 py-2 border-b'>
                  {speaker?.firstName} {speaker?.lastName}
                </td>
                <td className='px-12 py-2 border-b'>{speaker?.talk ? speaker.talk.length : 0}</td>
                <td className='px-4 py-2 border-b'>
                  <DeleteButton
                    isLoading={loadingId === speaker.id}
                    itemCount={speaker?.talk ? speaker?.talk?.length > 0 : false}
                    value='Delete'
                    type='button'
                    onClick={() => handleDelete(speaker.id)}
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
