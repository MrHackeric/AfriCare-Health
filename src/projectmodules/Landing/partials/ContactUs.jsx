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
    <section className="px-4 py-8 sm:px-6 lg:px-8 bg-[#f7f0f7]">
      <div className="max-w-[1200px] mx-auto">
        <h2 className="text-4xl font-bold text-center dark:text-[#874c78] mb-4">Contact Us
        <span className="block w-20 h-[3px] bg-[#f2b1d0] mx-auto mt-2"></span>
        </h2>
        <h3 className="text-2xl font-bold text-center text-[#a06e91] mb-8">
          We'd love to hear from you! Get in touch with us today.
        </h3>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2 text-gray-700 dark:text-[#874c78] space-y-4">
            <p><strong>Address:</strong> 1234 Kenyatta Avenue, Nairobi, Kenya</p>
            <p><strong>Email:</strong> contact@africare.com</p>
            <p><strong>Phone:</strong> +254 100 559 654</p>
            <p><strong>Hours:</strong> Mon-Fri: 8am - 10pm</p>
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
                      className="w-full p-3 rounded border-2 dark:border-[#a06e91] dark:bg-[white] dark:text-[#874c78] placeholder-pink"
                    />
                    <ErrorMessage name="name" component="div" className="text-[#a06e91] text-sm mt-1" />
                  </div>
                  <div>
                    <Field
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      className="w-full p-3 rounded border-2 dark:border-[#a06e91] dark:bg-[white] dark:text-[#874c78] placeholder-pink"
                    />
                    <ErrorMessage name="email" component="div" className="text-[#a06e91] text-sm mt-1" />
                  </div>
                  <div>
                    <Field
                      type="text"
                      name="subject"
                      placeholder="Subject"
                      className="w-full p-3 rounded border-2 dark:border-[#a06e91] dark:bg-[white] dark:text-[#874c78] placeholder-pink"
                    />
                    <ErrorMessage name="subject" component="div" className="text-[#a06e91] text-sm mt-1" />
                  </div>
                  <div>
                    <Field
                      as="textarea"
                      name="message"
                      placeholder="Your Message"
                      rows="4"
                      className="w-full p-3 rounded border-2 dark:border-[#a06e91] dark:bg-[white] dark:text-[#874c78] placeholder-pink"
                    />
                    <ErrorMessage name="message" component="div" className="text-[#a06e91] text-sm mt-1" />
                  </div>
                  <button
                    type="submit"
                    className="bg-[#874c78] text-[white] w-full p-3 rounded border-2 hover:bg-[#f2b1d0] hover:border-[#874c78] hover:text-[#874c78] transition duration-300"
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
