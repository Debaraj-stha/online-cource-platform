import { useEffect, useRef, useState } from 'react';
import { faq } from '../constants/home';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const FAQ = ({ includeHeader = true }: { includeHeader?: boolean }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    if (openIndex === null) return;

    gsap.registerPlugin(SplitText);

    const currentAnswer = document.getElementById(`faq-answer-${openIndex}`);
    if (!currentAnswer) return;

    const split = new SplitText(currentAnswer, { type: "words" });

    // Reset opacity and y before animation
    gsap.set(split.words, { opacity: 0 });

    gsap.to(split.words, {
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

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger)
    const faq = ref.current?.querySelectorAll(".faqs .faq");
    if (!faq) return;

    gsap.from(faq, {
      opacity: 0,
      y: -30,
      delay: 0.1,
      stagger: 0.1,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: ref.current,
        start: "top 80%",
        end: "top 50%",
        scrub: true,
      },
    });
  }, { scope: ref });



  return (
    <div className="" ref={ref}>
      {
        includeHeader && <div className="container">
          <h2 className="title-h2">Frequently Asked Questions</h2>
        </div>
      }

      <div className='container-grid faqs' >
        {faq.map((item, index) => (
          <div key={index} className="border border-gray-200 rounded-lg shadow-sm bg-transparent mb-4 faq">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full text-left p-4 flex justify-between items-center font-medium  transition text-para"
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
                className="p-4 pt-0 text-sm text-gary-300 faq-text"
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
