import {useState} from 'react';
import useStoreData from '../hooks/useStoreData';
import {createAppliedTalk} from '../store/slices/appliedTalksSlice';
import {useAppDispatch} from '../store';
import {SubmitButton} from './submit-button';
import {ToastContainer, toast} from 'react-toastify';
import {Button} from './ui/button';

export function AvailableTopics() {
  // loading state
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  //** get data from store */
  const {getStoreTalks, getStoreSpeakerById} = useStoreData();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userId = user.id;

  const attendeeId = userId;

  const appliedTalkIds = getStoreTalks
    .filter((talk) =>
      talk?.appliedTalk?.some((applicant: {attendeeId: string}) => applicant.attendeeId === attendeeId)
    )
    ?.map((talk) => talk.id);

  const handleSubmit = async (id: string) => {
    try {
      setLoadingId(id);
      await dispatch(createAppliedTalk({talkId: id, attendeeId: attendeeId}));
      toast.success(`Success`, {
        position: 'top-right',
        autoClose: 2500,
        closeOnClick: true,
      });
      setLoadingId('');
      window.location.reload();
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
      <h2 className='text-2xl font-semibold mb-4 ml-80'>Available Topics</h2>
      <ToastContainer />

      <div className='overflow-x-auto'>
        <table className='w-auto bg-slate-100 border border-gray-200 rounded-lg shadow-lg'>
          <thead>
            <tr>
              <th className='px-4 py-2 border-b text-left text-gray-700'>Topic Title</th>
              <th className='px-4 py-2 border-b text-left text-gray-700'>Date</th>
              <th className='px-4 py-2 border-b text-left text-gray-700'>Time</th>
              <th className='px-4 py-2 border-b text-left text-gray-700'>Location</th>
              <th className='px-4 py-2 border-b text-left text-gray-700'>Speaker</th>
              <th className='px-4 py-2 border-b text-left text-gray-700'>Action</th>
            </tr>
          </thead>
          <tbody>
            {getStoreTalks?.map((talk) => {
              return (
                <tr key={talk.id} className='hover:bg-gray-100'>
                  <td className='px-4 py-2 border-b'>{talk.topicTitle}</td>
                  <td className='px-4 py-2 border-b'>{new Date(talk.date).toLocaleDateString('en-US')}</td>
                  <td className='px-4 py-2 border-b'>{talk.time}</td>
                  <td className='px-4 py-2 border-b'>{talk.location}</td>
                  <td className='px-4 py-2 border-b'>
                    {getStoreSpeakerById(talk.speakerId)?.firstName +
                      ' ' +
                      getStoreSpeakerById(talk.speakerId)?.lastName}
                  </td>
                  <td className='px-4 py-2 border-b'>
                    {!appliedTalkIds.includes(talk.id) && (
                      <SubmitButton
                        isLoading={loadingId === talk.id}
                        value='Apply'
                        type='button'
                        onClick={() => handleSubmit(talk.id)}
                        loadingText='Processing...'
                      />
                    )}
                    {appliedTalkIds.includes(talk.id) && (
                      <Button className='bg-green-700' disabled>
                        Applied
                      </Button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
