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
    <div className="flex items-center justify-center min-h-screen bg-[#fff]">
      <div className="text-center p-8 bg-white rounded-lg">
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
        <h1 className="text-[100px] font-bold text-[#a06e91] mb-4">
          404
        </h1>
        <p className="text-[30px] text-[#a06e91] mb-6">
          Oops! The page you’re looking for doesn’t exist.
        </p>
        <button
          onClick={handleGoHome}
          className="bg-[#a06e91] text-white font-semibold py-2 px-4 rounded-md shadow-sm"
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
