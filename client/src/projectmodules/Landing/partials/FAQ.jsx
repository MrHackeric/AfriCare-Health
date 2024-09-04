import { useState } from "react";

function FAQ() {
  const [openQuestion, setOpenQuestion] = useState(null);

  const faqs = [
    {
      question: "How often should I visit the doctor during my pregnancy?",
      answer:
        "During pregnancy, the frequency of your doctor visits typically changes as your pregnancy progresses. Generally, you'll have appointments every four weeks until 28 weeks, then every two to three weeks until 36 weeks, and weekly after 36 weeks until delivery. However, the exact schedule can vary depending on your specific needs.",
    },
    {
      question: "Is it safe to exercise during pregnancy?",
      answer:
        "Yes, exercising during pregnancy is generally safe and beneficial. It helps maintain a healthy weight, improves mood, and can prepare your body for labor. However, it's essential to consult your healthcare provider to determine the type and intensity of exercise that is safe for you.",
    },
    {
      question: "What vaccinations are recommended during pregnancy?",
      answer:
        "It is recommended to get the influenza (flu) vaccine and the Tdap vaccine (tetanus-diphtheria-pertussis) during pregnancy. These vaccinations help protect both you and your baby. It's also advisable for close family members and caregivers to be up-to-date with these vaccinations.",
    },
    {
      question: "What should I do if I experience bleeding during pregnancy?",
      answer:
        "Bleeding during pregnancy can be a sign of various conditions, some of which may require immediate medical attention. If you experience any bleeding, contact your healthcare provider right away to determine the cause and receive the appropriate care.",
    },
    {
      question: "What can I do to manage nausea and vomiting during pregnancy?",
      answer:
        "Nausea and vomiting, often referred to as morning sickness, are common during pregnancy. To manage these symptoms, try eating small, frequent meals, avoiding foods that trigger nausea, and staying hydrated. If symptoms are severe or persistent, consult your healthcare provider for additional treatment options.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  return (
    <section className="faq bg-gray-100 dark:bg-gray-700 px-4 pb-20 pt-10">
      <div className="max-w-[1200px] mx-auto">
        <h2 className="text-4xl font-bold text-center dark:text-gray-200 text-gray-800 mb-[2.5rem]">
          Frequently Asked Questions
          <span className="block w-20 h-[3px] dark:bg-gray-200 bg-gray-800 mx-auto mt-2"></span>
        </h2>
        <div className="space-y-8">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-b border-gray-300 dark:border-gray-100 pb-4"
            >
              <div
                className="flex justify-between items-center text-xl font-semibold dark:text-gray-200 cursor-pointer"
                onClick={() => toggleFAQ(index)}
              >
                <h3 className="dark:text-gray-200 text-gray-800">{faq.question}</h3>
                <span className="text-2xl">
                  {openQuestion === index ? "-" : "+"}
                </span>
              </div>
              {openQuestion === index && (
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQ;
