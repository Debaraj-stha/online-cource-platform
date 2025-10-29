import React from "react";
import ContactForm from "./ContactForm";
import ContactInfo from "./ContactInfo";
import Giff from "../assets/videos/Contact us.gif";

interface ContactCardContainerProps {
  message?: string;
  containerRef?: React.Ref<HTMLDivElement>;
  formRef?: React.Ref<HTMLDivElement>;
  gifRef?: React.Ref<HTMLDivElement>;
}

const ContactCardContainer = ({ message, containerRef, formRef, gifRef }: ContactCardContainerProps) => {
  return (
    <div
      className="bg-gray-900 rounded-2xl shadow-2xl flex flex-col sm:flex-row container overflow-hidden mt-16 py-16 px-20"
      ref={containerRef} // parent can control container ref
    >
      
      {/* Left Side: Form */}
      <div className="sm:w-1/2 p-8 flex flex-col justify-center" ref={formRef}>
        <h1 className="text-3xl font-bold text-white mb-4">Contact Us</h1>
        <p className="text-gray-300 mb-6">
          Have questions about our courses, instructors, or platform? We’d
          love to hear from you. Reach out using the form below or contact us
          directly.
        </p>

        {/* Form & Info */}
        <ContactForm />
        <ContactInfo />

        {/* Message Feedback */}
        {message && (
          <p className="mt-4 text-sm text-gray-300 text-center">{message}</p>
        )}
      </div>

      {/* Right Side: GIF / Illustration */}
      <div className="sm:w-1/2 flex justify-center items-center p-4" ref={gifRef}>
        <img
          src={Giff}
          alt="Contact Illustration"
          className="h-full object-contain"
        />
      </div>
    </div>
  );
}


export default ContactCardContainer;
