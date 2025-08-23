import React, { useEffect, useState,  } from 'react';
import { faq } from '../constants/home';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    if (openIndex === null) return;

    gsap.registerPlugin(SplitText);

    const currentAnswer = document.getElementById(`faq-answer-${openIndex}`);
    if (!currentAnswer) return;

    const split = new SplitText(currentAnswer, { type: "words,chars" });

    // Reset opacity and y before animation
    gsap.set(split.chars, { opacity: 0 });

    gsap.to(split.chars, {
      opacity: 1,
      y: 0,
      ease: "power2.out",
      duration: 0.3,
      stagger: 0.05,
    });

    return () => {
      split.revert();
    };
  }, [openIndex]);


  return (
    <div className="wrapper">
      <div className="container">
        <h2 className="title-h2">Frequently Asked Questions</h2>
      </div>
      <div className='container' >
        {faq.map((item, index) => (
          <div key={index} className="border border-gray-200 rounded-lg shadow-sm bg-transparent mb-4">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full text-left p-4 flex justify-between items-center font-medium text-gray-800 hover:bg-gray-50 transition"
              aria-expanded={openIndex === index}
              aria-controls={`faq-answer-${index}`}
              id={`faq-question-${index}`}
            >
              <span>{item.question}</span>
              <span>{openIndex === index ? '−' : '+'}</span>
            </button>
            {openIndex === index && (
              <div
                id={`faq-answer-${index}`}
                role="region"
                aria-labelledby={`faq-question-${index}`}
                className="p-4 pt-0 text-sm text-gray-600 faq-text"
              >
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
