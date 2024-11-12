import {Button} from './ui/button';

interface SubmitButtonProps {
  value?: string;
  isLoading: boolean;
  itemCount?: boolean;
  loadingText?: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  onClick?: () => void;
}

export function SubmitButton({isLoading, value, loadingText, type, onClick, itemCount}: SubmitButtonProps) {
  return (
    <Button
      type={type || 'submit'}
      className=' text-white w-full'
      disabled={isLoading || itemCount}
      onClick={onClick}
    >
      {isLoading ? (
        <span className='flex items-center justify-center'>
          <svg
            className='animate-spin h-5 w-5 mr-2'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
          >
            <circle
              className='opacity-25'
              cx='12'
              cy='12'
              r='10'
              stroke='currentColor'
              strokeWidth='4'
            ></circle>
            <path
              className='opacity-75'
              fill='currentColor'
              d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z'
            ></path>
          </svg>
          {loadingText || 'Loading...'}
        </span>
      ) : (
        `${value}`
      )}
    </Button>
  );
}

export function DeleteButton({isLoading, value, loadingText, type, onClick, itemCount}: SubmitButtonProps) {
  return (
    <Button
      type={type || 'submit'}
      className=' text-white w-full'
      disabled={isLoading || itemCount}
      onClick={onClick}
    >
      {isLoading ? (
        <span className='flex items-center justify-center'>
          <svg
            className='animate-spin h-5 w-5 mr-2'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
          >
            <circle
              className='opacity-25'
              cx='12'
              cy='12'
              r='10'
              stroke='currentColor'
              strokeWidth='4'
            ></circle>
            <path
              className='opacity-75'
              fill='currentColor'
              d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z'
            ></path>
          </svg>
          {loadingText || 'Loading...'}
        </span>
      ) : (
        `${value}`
      )}
    </Button>
  );
}
