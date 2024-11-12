import useStoreData from '../hooks/useStoreData';

export function Dashboard() {
  //** get data from store */
  const {getStoreTalks, getStoreSpeakers, getStoreAttendees, getStoreAppliedTalks} = useStoreData();

  return (
    <div className='container mx-auto p-4'>
      <h2 className='text-3xl font-semibold mb-6'>Dashboard</h2>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
        {/* Card for Total Topics */}
        <div className='bg-white p-6 rounded-lg shadow-md border border-gray-200'>
          <h3 className='text-lg font-medium text-gray-700'>Total Topics</h3>
          <p className='text-4xl font-bold text-blue-500 mt-2'>{getStoreTalks?.length}</p>
        </div>

        {/* Card for Total Speakers */}
        <div className='bg-white p-6 rounded-lg shadow-md border border-gray-200'>
          <h3 className='text-lg font-medium text-gray-700'>Total Speakers</h3>
          <p className='text-4xl font-bold text-green-500 mt-2'>{getStoreSpeakers?.length}</p>
        </div>

        {/* Card for Total Attendees */}
        <div className='bg-white p-6 rounded-lg shadow-md border border-gray-200'>
          <h3 className='text-lg font-medium text-gray-700'>Total Attendees</h3>
          <p className='text-4xl font-bold text-red-500 mt-2'>{getStoreAttendees?.length}</p>
        </div>

        <div className='bg-white p-6 rounded-lg shadow-md border border-gray-200'>
          <h3 className='text-lg font-medium text-gray-700'>Total Applied Talks</h3>
          <p className='text-4xl font-bold text-red-500 mt-2'>{getStoreAppliedTalks?.length}</p>
        </div>
      </div>
    </div>
  );
}
