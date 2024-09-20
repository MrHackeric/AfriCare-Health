import React from 'react';
import CountUp from 'react-countup';

function Statistics() {
  return (
    <section className="bg-gradient-to-r from-pink-50 via-purple-50 to-pink-100 py-12">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-extrabold text-pink-700 mb-8">
          Maternal Health Statistics
        </h2>
        <p className="text-lg text-gray-600 mb-12">
          These statistics highlight the state of maternal healthcare in Sub-Saharan Africa, based on data from the World Health Organization (WHO).
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Maternal Mortality Rate */}
          <div className="bg-white p-8 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <h3 className="text-5xl font-extrabold text-pink-700 mb-2">
              <CountUp start={0} end={533} duration={2.5} /> per 100,000
            </h3>
            <p className="text-gray-700 text-lg">Maternal Mortality Rate</p>
            <p className="text-gray-500 text-sm mt-1">Source: WHO, 2023</p>
          </div>
          {/* Newborn Mortality Rate */}
          <div className="bg-white p-8 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <h3 className="text-5xl font-extrabold text-pink-700 mb-2">
              <CountUp start={0} end={27} duration={2.5} /> per 1,000
            </h3>
            <p className="text-gray-700 text-lg">Newborn Mortality Rate</p>
            <p className="text-gray-500 text-sm mt-1">Source: WHO, 2023</p>
          </div>
          {/* Skilled Birth Attendance */}
          <div className="bg-white p-8 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <h3 className="text-5xl font-extrabold text-pink-700 mb-2">
              <CountUp start={0} end={59} duration={2.5} />%
            </h3>
            <p className="text-gray-700 text-lg">Births Attended by Skilled Personnel</p>
            <p className="text-gray-500 text-sm mt-1">Source: WHO, 2023</p>
          </div>
          {/* Lifetime Risk of Maternal Death */}
          <div className="bg-white p-8 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <h3 className="text-5xl font-extrabold text-pink-700 mb-2">
              <CountUp start={0} end={1} duration={2.5} /> in 37
            </h3>
            <p className="text-gray-700 text-lg">Lifetime Risk of Maternal Death</p>
            <p className="text-gray-500 text-sm mt-1">Source: WHO, 2023</p>
          </div>
        </div>

        <p className="text-lg text-gray-600 my-12">
          AfriCare is also making significant strides in maternal health. Here are some key contributions:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Users Served */}
          <div className="bg-white p-8 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <h3 className="text-5xl font-extrabold text-pink-700 mb-2">
              <CountUp start={0} end={20} duration={2.5} />+
            </h3>
            <p className="text-gray-700 text-lg">Users Served by AfriCare Community</p>
          </div>
          {/* Active Support Groups */}
          <div className="bg-white p-8 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <h3 className="text-5xl font-extrabold text-pink-700 mb-2">
              <CountUp start={0} end={20} duration={2.5} />+
            </h3>
            <p className="text-gray-700 text-lg">Active Support Groups on AfriCare</p>
          </div>
          {/* Emergency Assistance */}
          <div className="bg-white p-8 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <h3 className="text-5xl font-extrabold text-pink-700 mb-2">
              <CountUp start={0} end={80} duration={2.5} />+
            </h3>
            <p className="text-gray-700 text-lg">Emergency Assistance Requests Handled</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Statistics;
