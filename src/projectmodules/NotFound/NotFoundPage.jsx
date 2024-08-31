import React from 'react';
import { useNavigate } from 'react-router-dom';
import Lottie from 'react-lottie';
import animationData from '../../images/Animation.json'; // Import your Lottie animation JSON

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-800">
      <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg">
        <div className="mb-8">
          <Lottie
            options={{
              loop: true,
              autoplay: true,
              animationData: animationData,
              rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice',
              },
            }}
            height={200}
            width={200}
          />
        </div>
        <h1 className="font-semibold text-gray-800 dark:text-gray-100 text-[100px] mb-4">
          404
        </h1>
        <p className="font-semibold text-gray-800 dark:text-gray-100 text-[30px] mb-4">
          Oops! The page you’re looking for doesn’t exist.
        </p>
        <button
          onClick={handleGoHome}
          className="bg-gray-800 text-gray-200 dark:bg-gray-200 dark:text-gray-800 font-semibold py-2 px-4 rounded-md shadow-sm"
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
