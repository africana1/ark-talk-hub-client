import {FC} from 'react';
import {Loader2} from 'lucide-react'; // An icon for the spinner

const LoadingSpinner: FC = () => {
  return (
    <div className='flex h-screen items-center justify-center'>
      <Loader2 className='animate-spin text-gray-500 w-10 h-10' />
      <span className='ml-2 text-gray-600 text-lg'>Loading...</span>
    </div>
  );
};

export default LoadingSpinner;
