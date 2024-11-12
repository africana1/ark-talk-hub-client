import {useState} from 'react';
import useStoreData from '../hooks/useStoreData';
import {deleteAttendee} from '../store/slices/attendeesSlice';
import {useAppDispatch} from '../store';
import {DeleteButton} from './submit-button';
import {ToastContainer, toast} from 'react-toastify';

export function ViewAttendees() {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  //** get data from store */
  const {getStoreAttendees} = useStoreData();

  const attendees = getStoreAttendees;

  const handleDelete = async (id: string) => {
    try {
      setLoadingId(id);
      await dispatch(deleteAttendee(id));
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
      <div className='overflow-x-auto'>
        <h2 className='text-2xl font-semibold mb-4 ml-96'>Attendees List</h2>
        <ToastContainer />
        <table className='w-auto bg-slate-100 border border-gray-200 rounded-lg shadow-lg '>
          <thead>
            <tr>
              <th className='px-4 py-2 border-b text-left text-gray-700'>Name</th>

              <th className='px-4 py-2 border-b text-left text-gray-700'>Email</th>

              <th className='px-4 py-2 border-b text-left text-gray-700'>Phone</th>

              <th className='px-4 py-2 border-b text-left text-gray-700'>Registration Id</th>

              <th className='px-4 py-2 border-b text-left text-gray-700'>Talks Applied</th>

              <th className='px-4 py-2 border-b text-left text-gray-700'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {attendees?.map((attendee) => (
              <tr key={attendee.id} className='hover:bg-gray-100'>
                <td className='px-4 py-2 border-b'>
                  {attendee.firstName} {attendee.lastName}
                </td>

                <td className='px-4 py-2 border-b'>{attendee.email}</td>

                <td className='px-4 py-2 border-b'>{attendee.phone}</td>

                <td className='px-4 py-2 border-b'>{attendee?.registrationId}</td>

                <td className='px-12 py-2 border-b'>
                  {attendee?.appliedTalk ? attendee.appliedTalk.length : 0}
                </td>

                <td className='px-4 py-2 border-b'>
                  <DeleteButton
                    isLoading={loadingId === attendee.id}
                    itemCount={attendee?.appliedTalk ? attendee?.appliedTalk?.length > 0 : false}
                    value='Delete'
                    type='button'
                    onClick={() => handleDelete(attendee.id)}
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
