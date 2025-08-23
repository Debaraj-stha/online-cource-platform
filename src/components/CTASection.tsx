import React from 'react';
import { Link } from 'react-router-dom';

const CTASection = () => {
  return (
    <section className="bg-blue-600 text-white py-12 px-6 text-center">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Start Learning?
        </h2>
        <p className="text-lg md:text-xl mb-6 text-white">
          Join thousands of students and gain access to expert-led courses, quizzes, and more!
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            to="/signup"
            className="bg-white text-blue-600 px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition"
          >
            Get Started for Free
          </Link>
          <Link
            to="/courses"
            className="border border-white px-6 py-3 rounded-md font-semibold hover:bg-white hover:text-blue-600 transition"
          >
            Browse Courses
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
