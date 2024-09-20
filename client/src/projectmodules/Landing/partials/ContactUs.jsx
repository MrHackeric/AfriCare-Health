import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { db } from '../../Auth/firebase-config'; // Adjust the path to your firebase config
import { collection, addDoc } from "firebase/firestore";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  subject: Yup.string().required("Subject is required"),
  message: Yup.string().required("Message is required"),
});

function ContactUs() {
  const handleFormSubmit = async (values, actions) => {
    try {
      // Save data to Firestore
      await addDoc(collection(db, "contacts"), values);
      actions.setStatus({ success: "Your message has been sent successfully!" });
      actions.resetForm();
    } catch (error) {
      console.error("Error saving contact data:", error);
      actions.setStatus({ error: "Failed to send your message. Please try again later." });
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <section className="px-4 py-8 sm:px-6 lg:px-8 bg-pink-50">
      <div className="max-w-[1200px] mx-auto">
        <h2 className="text-4xl font-bold text-center text-pink-600 mb-4">
          Contact Us
          <span className="block w-20 h-[3px] bg-pink-200 mx-auto mt-2"></span>
        </h2>
        <h3 className="text-2xl font-semibold text-center text-gray-700 mb-8">
          We'd love to hear from you! Get in touch with us today.
        </h3>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2 text-gray-700 space-y-4">
            <p><strong>Address:</strong> Nairobi, Kenya</p>
            <p><strong>Email:</strong> africare254@gmail.com</p>
            <p><strong>Phone:</strong> +254 701 770 765</p>
            <p><strong>Hours:</strong> Mon-Fri: 8 a.m. - 4 p.m.</p>
          </div>
          <div className="md:w-1/2">
            <Formik
              initialValues={{ name: "", email: "", subject: "", message: "" }}
              validationSchema={validationSchema}
              onSubmit={handleFormSubmit}
            >
              {({ status, isSubmitting }) => (
                <Form className="space-y-4 bg-white shadow-md rounded-lg p-6">
                  <div>
                    <Field
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      className="w-full p-3 border-2 border-pink-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
                    />
                    <ErrorMessage name="name" component="div" className="text-red-600 text-sm mt-1" />
                  </div>
                  <div>
                    <Field
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      className="w-full p-3 border-2 border-pink-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
                    />
                    <ErrorMessage name="email" component="div" className="text-red-600 text-sm mt-1" />
                  </div>
                  <div>
                    <Field
                      type="text"
                      name="subject"
                      placeholder="Subject"
                      className="w-full p-3 border-2 border-pink-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
                    />
                    <ErrorMessage name="subject" component="div" className="text-red-600 text-sm mt-1" />
                  </div>
                  <div>
                    <Field
                      as="textarea"
                      name="message"
                      placeholder="Your Message"
                      rows="4"
                      className="w-full p-3 border-2 border-pink-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
                    />
                    <ErrorMessage name="message" component="div" className="text-red-600 text-sm mt-1" />
                  </div>

                  <button
                    type="submit"
                    className={`bg-pink-600 text-white w-full p-3 rounded hover:bg-pink-700 transition duration-300 ${
                      isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>

                  {status && status.success && (
                    <div className="text-green-600 mt-2">{status.success}</div>
                  )}
                  {status && status.error && (
                    <div className="text-red-600 mt-2">{status.error}</div>
                  )}
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactUs;
