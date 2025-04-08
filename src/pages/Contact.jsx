// src/components/Contact.jsx
import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { toast } from "sonner";
import Footer from "../components/Footer";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.subject || !form.message) {
      toast.error("All fields are required.");
      return;
    }

    setLoading(true);

    try {
      await addDoc(collection(db, "contactMessages"), {
        ...form,
        timestamp: Timestamp.now(),
      });
      toast.success("Message sent successfully!");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      toast.error("Failed to send message. Try again.");
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <>
      <section className="bg-[#fdfdfd] py-16 px-4 sm:px-8" id="contact">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-[#2e2e2e]">Contact Us</h2>
          <p className="text-gray-600 mb-10">
            We’d love to hear from you. Send us a message!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-2xl shadow-md">
              <form onSubmit={handleSubmit} className="space-y-6 text-left">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={form.name}
                    onChange={handleChange}
                    className="border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9d9577]"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    className="border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9d9577]"
                  />
                </div>
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={form.subject}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9d9577]"
                />
                <textarea
                  name="message"
                  rows="5"
                  placeholder="Your message"
                  value={form.message}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9d9577]"
                ></textarea>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#9d9577] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#88816a] transition duration-200 cursor-pointer"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
            {/* Google map iframe */}
            <div className="overflow-hidden rounded-2xl shadow-md">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3962.99104884665!2d3.3224909736684927!3d6.648029993346613!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b914c3d5340eb%3A0x6c74ed41d7f0a1b9!2s5%20Bucknor%20Savage%20Blvd%2C%20Ojodu%2C%20Lagos%20101232%2C%20Lagos!5e0!3m2!1sen!2sng!4v1744125063736!5m2!1sen!2sng"
                width="100%"
                height="100%"
                className="w-full h-full min-h-[400px] border-0"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Contact;
