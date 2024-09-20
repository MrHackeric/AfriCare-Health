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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-pink-100 to-purple-200">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg">
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
        <h1 className="font-bold text-pink-600 text-[100px] mb-4">
          404
        </h1>
        <p className="font-semibold text-gray-800 text-[20px] mb-4">
          Oops! Looks like you found a page that doesn’t exist or you don't have access to.
        </p>
        <button
          onClick={handleGoHome}
          className="bg-pink-600 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-pink-700 transition duration-300"
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
