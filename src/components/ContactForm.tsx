import React from 'react'
import PositionedInput from './PositionedInput';

const ContactForm = () => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // setMessage("✅ Your message has been sent! We will get back to you soon.");
    };
    return (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <PositionedInput
                label="Name"
                name="name"
            // className="bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:ring-2 focus:ring-purple-500"
            />
            <PositionedInput
                label="Email"
                name="email"
                type="email"
            // className="bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:ring-2 focus:ring-purple-500"
            />
            <PositionedInput
                label="Message"
                name="message"
                as="textarea"
            // className="bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:ring-2 focus:ring-purple-500"
            />

            <button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-medium transition"
            >
                Send Message
            </button>
        </form>
    )
}

export default ContactForm
