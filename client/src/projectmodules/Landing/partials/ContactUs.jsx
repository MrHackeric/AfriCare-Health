import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const handleFormSubmit = async (values, actions) => {
  try {
    /* --------ADD THE API ENDPOINT FOR SUBMITTING CONTACT DATA -------- */
    const response = await axios.post("http://yourapiendpoint.com/contact", values);
    actions.setStatus({ success: "Your message has been sent successfully!" });
    actions.resetForm();
  } catch (error) {
    console.error("Contact form error:", error);
    actions.setStatus({ error: "Failed to send your message. Please try again later." });
  } finally {
    actions.setSubmitting(false);
  }
};

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  subject: Yup.string().required("Subject is required"),
  message: Yup.string().required("Message is required"),
});

function ContactUs() {
  return (
    <section className="px-4 py-8 sm:px-6 lg:px-8 dark:bg-gray-800 bg-gray-200">
      <div className="max-w-[1200px] mx-auto">
        <h2 className="text-4xl font-bold text-center dark:text-gray-200 text-gray-800 mb-4">Contact Us
        <span className="block w-20 h-[3px] bg-gray-200 dark:bg-gray-400 mx-auto mt-2"></span>
        </h2>
        <h3 className="text-2xl font-bold text-center dark:text-gray-200 mb-8">
          We'd love to hear from you! Get in touch with us today.
        </h3>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2 text-gray-700 dark:text-gray-200 space-y-4">
            <p><strong>Address:</strong> Nairobi, Kenya</p>
            <p><strong>Email:</strong> africare254@gmail.com</p>
            <p><strong>Phone:</strong> +254 701 770 765</p>
            <p><strong>Hours:</strong> Mon-Fri: 8a.m. - 4p.m.</p>
          </div>
          <div className="md:w-1/2">
            <Formik
              initialValues={{ name: "", email: "", subject: "", message: "" }}
              validationSchema={validationSchema}
              onSubmit={handleFormSubmit}
            >
              {({ status }) => (
                <Form className="space-y-4">
                  <div>
                    <Field
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      className="w-full p-3 rounded border-2 dark:border-gray-200 dark:bg-gray-600 dark:text-gray-200 placeholder-gray-200"
                    />
                    <ErrorMessage name="name" component="div" className="text-red-800 text-sm mt-1" />
                  </div>
                  <div>
                    <Field
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      className="w-full p-3 rounded border-2 dark:border-gray-200 dark:bg-gray-600 dark:text-gray-200 placeholder-gray-200"
                    />
                    <ErrorMessage name="name" component="div" className="text-red-800 text-sm mt-1" />
                    </div>
                  <div>
                    <Field
                      type="text"
                      name="subject"
                      placeholder="Subject"
                      className="w-full p-3 rounded border-2 dark:border-gray-200 dark:bg-gray-600 dark:text-gray-200 placeholder-gray-200"
                    />
                    <ErrorMessage name="name" component="div" className="text-red-800 text-sm mt-1" />
                    </div>
                  <div>
                    <Field
                      as="textarea"
                      name="message"
                      placeholder="Your Message"
                      rows="4"
                      className="w-full p-3 rounded border-2 dark:border-gray-200 dark:bg-gray-600 dark:text-gray-200 placeholder-gray-200"
                    />
                    <ErrorMessage name="name" component="div" className="text-red-800 text-sm mt-1" />
                    </div>
                  <button
                    type="submit"
                    className="dark:bg-blue-800 text-gray-200 w-full p-3 rounded dark:hover:bg-gray-200 hover:text-blue-800 transition duration-300"
                  >
                    Send Message
                  </button>
                  {status && status.success && (
                    <div className="text-green-500 mt-2">{status.success}</div>
                  )}
                  {status && status.error && (
                    <div className="text-red-500 mt-2">{status.error}</div>
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
