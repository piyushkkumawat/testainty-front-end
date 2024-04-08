import { Link } from 'react-router-dom';
const NotFound = () => {
  return (
    <div className='h-screen'>
      <nav className='w-full shadow-md z-0 bg-white'>
        <div className="flex justify-between items-center py-1 px-4">
          <img src='/assets/images/Main-logo.svg' className='w-24 lg:w-44 xl:w-44' alt='Logo' />
          <Link to="/"><button className='text-xs lg:text-sm xl:text-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full '>Go Back Login</button></Link>
        </div>
      </nav>

      <div className="flex flex-col items-center justify-center mt-10 h-96">
        <div className="text-center">
          <h2 className="text-5xl lg:text-8xl xl:text-8xl font-bold text-gray-300 font-mono">404</h2>
          <p className='text-2xl lg:text-5xl xl:text-5xl font-bold'>Page not found</p>
          <p className="text-gray-600">Sorry, the page you are looking for does not exist.</p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
