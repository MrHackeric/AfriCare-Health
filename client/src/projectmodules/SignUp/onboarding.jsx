import React, { useState, useEffect } from 'react';
import { db, auth } from '../Auth/firebase-config'; // Firestore and Auth config
import { collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { onAuthStateChanged } from 'firebase/auth'; // Import Firebase Auth
import Select from 'react-select';
import countryList from 'country-list'; // Import country-list

function Onboarding() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const countries = countryList.getData().map((country) => ({
    value: country.code,
    label: country.name,
  }));

  const questions = [
    { question: "What is your age?", type: "text" },
    { question: "What is your current location?", type: "country" },
    { question: "Are you currently pregnant?", type: "yesno" },
    { question: "How many children do you have?", type: "text" },
    { question: "Do you have any pre-existing medical conditions?", type: "yesno" },
    { question: "What is your preferred language?", type: "text" },
    { question: "Are you taking any medications?", type: "yesno" },
    { question: "Do you have a birth plan?", type: "yesno" },
    { question: "When is your due date (if pregnant)?", type: "date" },
    { question: "Do you have access to prenatal care?", type: "yesno" }
  ];

  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [progress, setProgress] = useState(0);

  const handleAnswerChange = (question, answer) => {
    setAnswers((prevAnswers) => ({ ...prevAnswers, [question]: answer }));
  };

  const handleNext = async () => {
    const totalSets = Math.ceil(questions.length / 4);
    const nextSetIndex = currentSetIndex + 1;

    // Update progress
    setProgress((nextSetIndex / totalSets) * 100);

    if (nextSetIndex * 4 >= questions.length) {
      try {
        if (user) {
          const usersCollection = collection(db, "users");
          const userDocRef = doc(usersCollection, user.uid);
          const subCollection = collection(userDocRef, "preferencemessages");
          await addDoc(subCollection, { ...answers });

          alert('Thank you! Your data has been saved.');
          navigate("/Community");
        } else {
          alert('No user is logged in.');
          navigate("/signin");
        }
      } catch (error) {
        console.error('Error saving data: ', error);
      }
    } else {
      // Clear inputs for the next set of questions
      setAnswers({});
      setCurrentSetIndex(nextSetIndex);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        navigate("/signin");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const currentQuestions = questions.slice(currentSetIndex * 4, (currentSetIndex + 1) * 4);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 max-w-lg mx-auto transition duration-300 ease-in-out transform hover:scale-105">
        <h1 className="text-2xl font-semibold text-pink-600 text-center mb-6">
          Almost there! Let’s get to know you a little more 😊
        </h1>

        <div className="mt-4">
          {currentQuestions.map((q, index) => (
            <div key={index} className="mb-4">
              <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">{q.question}</label>

              {q.type === "text" && (
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-300"
                  onChange={(e) => handleAnswerChange(q.question, e.target.value)}
                  value={answers[q.question] || ""}
                />
              )}

              {q.type === "country" && (
                <Select
                  options={countries}
                  onChange={(selected) => handleAnswerChange(q.question, selected)}
                  className="w-full"
                  placeholder="Select your country"
                />
              )}

              {q.type === "yesno" && (
                <select
                  className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-300"
                  onChange={(e) => handleAnswerChange(q.question, e.target.value)}
                  value={answers[q.question] || ""}
                >
                  <option value="">Select an option</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              )}

              {q.type === "date" && (
                <DatePicker
                  selected={answers[q.question] ? new Date(answers[q.question]) : null}
                  onChange={(date) => handleAnswerChange(q.question, date)}
                  className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-300"
                  dateFormat="yyyy/MM/dd"
                  placeholderText="Select a date"
                />
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center mt-4">
          <button
            className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600 transition duration-300"
            onClick={handleNext}
          >
            Next
          </button>
          <div className="text-gray-700 dark:text-gray-300">Progress: {Math.floor(progress)}%</div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 dark:bg-gray-600 mt-4 rounded-full h-4">
          <div
            className="bg-pink-500 h-4 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default Onboarding;
