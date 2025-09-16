import React, { memo } from "react";
import type { CourseFAQ } from "../@types/course";


interface FAQProps {
  faqs: CourseFAQ[];
}

const CourseFAQCard = memo(({ faqs }: FAQProps) => {
  if (!faqs || faqs.length === 0) {
    return <p className="text-gray-500">No FAQs available for this course.</p>;
  }

  return (
    <div className="bg-white shadow-md rounded-xl p-6 space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">❓ Frequently Asked Questions</h2>
      <div className="space-y-2">
        {faqs.map((faq) => (
          <details
            key={faq.id}
            className="border rounded-lg p-4 bg-gray-50 cursor-pointer hover:bg-gray-100 transition"
          >
            <summary className="font-semibold text-gray-800">{faq.question}</summary>
            <p className="mt-2 text-gray-600">{faq.answer}</p>
          </details>
        ))}
      </div>
    </div>
  );
});

export default CourseFAQCard;
