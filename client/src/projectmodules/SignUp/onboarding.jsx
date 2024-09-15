import React, { useState, useEffect } from 'react';
import { db, auth } from '../Auth/firebase-config'; // Firestore and Auth config
import { collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { onAuthStateChanged } from 'firebase/auth'; // Import Firebase Auth

function Onboarding() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null); // State to hold the authenticated user
  const [loading, setLoading] = useState(true); // State for checking if auth state is loading

  const questions = [
    { question: "What is your age?", type: "text" },
    { question: "What is your current location?", type: "text" },
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

  // Handle answer changes for each question
  const handleAnswerChange = (question, answer) => {
    setAnswers((prevAnswers) => ({ ...prevAnswers, [question]: answer }));
  };

  // Function to handle moving to the next set of questions
  const handleNext = async () => {
    const totalSets = Math.ceil(questions.length / 4);
    const nextSetIndex = currentSetIndex + 1;

    // Update progress
    setProgress((nextSetIndex / totalSets) * 100);

    if (nextSetIndex * 4 >= questions.length) {
      // Save data to Firestore when all questions are completed
      try {
        if (user) {
          const usersCollection = collection(db, "users");
          const userDocRef = doc(usersCollection, user.uid); // Use logged-in user's UID
          const subCollection = collection(userDocRef, "preferencemessages");
          await addDoc(subCollection, { ...answers });

          alert('Thank you! Your data has been saved.');
          navigate("/Community"); // Redirect after submission
        } else {
          alert('No user is logged in.');
          navigate("/signin");
        }
      } catch (error) {
        console.error('Error saving data: ', error);
      }
    } else {
      // Move to the next set of questions
      setCurrentSetIndex(nextSetIndex);
    }
  };

  // Function to check if the user is authenticated
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user); // Set the authenticated user
      } else {
        navigate("/signin"); // Redirect to sign-in page if no user is logged in
      }
      setLoading(false); // Set loading to false after auth check
    });

    return () => unsubscribe();
  }, [navigate]);

  // If loading, show a loading message
  if (loading) {
    return <div>Loading...</div>;
  }

  // Display only 4 questions at a time
  const currentQuestions = questions.slice(currentSetIndex * 4, (currentSetIndex + 1) * 4);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="col-span-full xl:col-span-12 bg-white dark:bg-gray-800 shadow-sm rounded-xl p-6 max-w-lg mx-auto">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white text-center">
          Almost there! Let’s get to know you a little more 😊
        </h1>

        <div className="mt-4">
          {currentQuestions.map((q, index) => (
            <div key={index} className="mb-4">
              <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">{q.question}</label>

              {/* Render different inputs based on the question type */}
              {q.type === "text" && (
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => handleAnswerChange(q.question, e.target.value)}
                />
              )}

              {q.type === "yesno" && (
                <select
                  className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => handleAnswerChange(q.question, e.target.value)}
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
                  className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  dateFormat="yyyy/MM/dd"
                  placeholderText="Select a date"
                />
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center mt-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            onClick={handleNext}
          >
            Next
          </button>
          <div className="text-gray-700 dark:text-gray-300">Progress: {Math.floor(progress)}%</div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 dark:bg-gray-600 mt-4 rounded-full h-4">
          <div
            className="bg-blue-500 h-4 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default Onboarding;
// import React, { useState } from 'react';
// import { db } from '../projectmodules/Auth/firebase-config'; // Firestore config
// import { collection, addDoc, doc } from 'firebase/firestore';
// import { useNavigate } from 'react-router-dom';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';

// function Onboarding() {
//   const navigate = useNavigate(); // For redirecting to /Community
  
//   const questions = [
//     { question: "What is your age?", type: "text" },
//     { question: "What is your current location?", type: "text" },
//     { question: "Are you currently pregnant?", type: "yesno" },
//     { question: "How many children do you have?", type: "text" },
//     { question: "Do you have any pre-existing medical conditions?", type: "yesno" },
//     { question: "What is your preferred language?", type: "text" },
//     { question: "Are you taking any medications?", type: "yesno" },
//     { question: "Do you have a birth plan?", type: "yesno" },
//     { question: "When is your due date (if pregnant)?", type: "date" },
//     { question: "Do you have access to prenatal care?", type: "yesno" }
//   ];

//   const [currentSetIndex, setCurrentSetIndex] = useState(0);
//   const [answers, setAnswers] = useState({});
//   const [progress, setProgress] = useState(0);

//   const handleAnswerChange = (question, answer) => {
//     setAnswers((prevAnswers) => ({ ...prevAnswers, [question]: answer }));
//   };

//   const handleNext = async () => {
//     const totalSets = Math.ceil(questions.length / 4);
//     const nextSetIndex = currentSetIndex + 1;

//     // Update progress
//     setProgress((nextSetIndex / totalSets) * 100);

//     if (nextSetIndex * 4 >= questions.length) {
//       // Save data to Firestore when all questions are completed
//       try {
//         const usersCollection = collection(db, "users");
//         const userDocRef = doc(usersCollection, "USER_ID"); // Replace with actual user ID
//         const subCollection = collection(userDocRef, "preferencemessages");
//         await addDoc(subCollection, { ...answers });

//         alert('Thank you! Your data has been saved.');
//         navigate("/Community"); // Redirect after submission
//       } catch (error) {
//         console.error('Error saving data: ', error);
//       }
//     } else {
//       // Move to the next set of questions
//       setCurrentSetIndex(nextSetIndex);
//     }
//   };

//   const currentQuestions = questions.slice(currentSetIndex * 4, (currentSetIndex + 1) * 4);

//   return (
//     <div className="flex justify-center items-center min-h-screen">
//       <div className="col-span-full xl:col-span-12 bg-white dark:bg-gray-800 shadow-sm rounded-xl p-6 max-w-lg mx-auto">
//         <h1 className="text-2xl font-semibold text-gray-800 dark:text-white text-center">
//           Almost there! Let’s get to know you a little more 😊
//         </h1>
        
//         <div className="mt-4">
//           {currentQuestions.map((q, index) => (
//             <div key={index} className="mb-4">
//               <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">{q.question}</label>
              
//               {/* Render different inputs based on the question type */}
//               {q.type === "text" && (
//                 <input
//                   type="text"
//                   className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   onChange={(e) => handleAnswerChange(q.question, e.target.value)}
//                 />
//               )}

//               {q.type === "yesno" && (
//                 <select
//                   className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   onChange={(e) => handleAnswerChange(q.question, e.target.value)}
//                 >
//                   <option value="">Select an option</option>
//                   <option value="Yes">Yes</option>
//                   <option value="No">No</option>
//                 </select>
//               )}

//               {q.type === "date" && (
//                 <DatePicker
//                   selected={answers[q.question] ? new Date(answers[q.question]) : null}
//                   onChange={(date) => handleAnswerChange(q.question, date)}
//                   className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   dateFormat="yyyy/MM/dd"
//                   placeholderText="Select a date"
//                 />
//               )}
//             </div>
//           ))}
//         </div>

//         <div className="flex justify-between items-center mt-4">
//           <button
//             className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
//             onClick={handleNext}
//           >
//             Next
//           </button>
//           <div className="text-gray-700 dark:text-gray-300">Progress: {Math.floor(progress)}%</div>
//         </div>

//         {/* Progress Bar */}
//         <div className="w-full bg-gray-200 dark:bg-gray-600 mt-4 rounded-full h-4">
//           <div
//             className="bg-blue-500 h-4 rounded-full"
//             style={{ width: `${progress}%` }}
//           ></div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Onboarding;
