export function HomePage() {
  const getRandLink = () => {
    const imageURL = 'https://cdn.pixabay.com/photo/2020/08/28/00/00/people-5523172_1280.png';
    return `url('${imageURL}')`;
  };

  return (
    <div
      className='relative container mx-auto p-4 bg-cover bg-center min-h-screen flex items-center justify-center'
      style={{
        backgroundImage: getRandLink(),
      }}
    >
      {/* Overlay */}
      <div className='absolute inset-0 bg-black opacity-30'></div>

      {/* Welcome Content */}
      <div className='relative z-10 text-center text-white p-6 rounded-lg max-w-xl bg-opacity-60 bg-gray-800'>
        <h2 className='text-4xl font-bold mb-4'>Welcome to Ark Talk Hub</h2>
        <p className='text-lg mb-6'>
          Join us to stay updated with the latest talks and insights from industry experts. Connect, learn,
          and grow with a community passionate about knowledge and networking.
        </p>
        <button className='mt-4 px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded'>
          Explore Talks
        </button>
      </div>
    </div>
  );
}
