import React, { useState } from "react";
import Wave from "../assets/svg/wave1.svg?react";
import Giff from "../assets/videos/Contact us.gif";
import PositionedInpute from "../components/PositionedInput";
import ContactForm from "../components/ContactForm";
import ContactInfo from "../components/ContactInfo";

const Contact = () => {
  const [message, setMessage] = useState("");



  return (
    <div className="min-h-screen relative bg-gradient-to-br from-purple-700 to-orange-700 flex items-center justify-center p-6">

      {/* Card Container */}
      <div className="bg-gray-900 rounded-2xl shadow-2xl flex flex-col sm:flex-row  container overflow-hidden mt-16 py-16 px-20 ">
        {/* Left Side: Form */}
        <div className="sm:w-1/2 p-8 flex flex-col justify-center">
          {/* Header */}
          <h1 className="text-3xl font-bold text-white mb-4">Contact Us</h1>
          <p className="text-gray-300 mb-6">
            Have questions about our courses, instructors, or platform? We’d
            love to hear from you. Reach out using the form below or contact us
            directly.
          </p>

          {/* Form */}
          <ContactForm />
          <ContactInfo />

          {/* Message Feedback */}
          {message && (
            <p className="mt-4 text-sm text-gray-300 text-center">{message}</p>
          )}
        </div>

        {/* Right Side: GIF / Illustration */}
        <div className="sm:w-1/2 flex justify-center items-center p-4">
          <img
            src={Giff}
            alt="Contact Illustration"
            className="h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;
