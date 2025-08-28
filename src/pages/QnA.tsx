import React, { useRef, useEffect, useState } from "react";
import { qna } from "../constants/qna";
import gsap from "gsap";

const QnA = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;
        const allAnswers = containerRef.current.querySelectorAll<HTMLDivElement>(
            ".answer"
        );
        //set all answer div height 0 i.e hide it
        allAnswers.forEach((answer) => {
            gsap.set(answer, { height: 0, opacity: 0, overflow: "hidden" });
        });
    }, []);

    const toggleAnswer = (index: number) => {
        const allAnswers = containerRef.current!.querySelectorAll<HTMLDivElement>(
            ".answer"
        );
        //if cliced on opened answer
        if (openIndex === index) {
            gsap.to(allAnswers[index], { height: 0, opacity: 0, duration: 0.4 });
            setOpenIndex(null);
        } else {  //opening new answer
                //closing already opened answer
            if (openIndex !== null) {
                gsap.to(allAnswers[openIndex], { height: 0, opacity: 0, duration: 0.4 });
            }
            //opening new answer
            const element = allAnswers[index];
            gsap.to(element, { height: "auto", opacity: 1, duration: 0.4 });
            setOpenIndex(index);
        }
    };

    return (
        <div ref={containerRef} className="wrapper py-12">
            <div className="container space-y-8">
                <header className="text-center space-y-2 mb-12">
                    <h1 className="title-h2 text-gradient">Q&A</h1>
                    <p className="max-w-2xl mx-auto">
                        Ask questions and get answers from instructors and fellow learners.
                    </p>
                </header>

                <div className="space-y-4">
                    {qna.map((item, index) => (
                        <div
                            key={index}
                            className="p-4 border rounded-lg cursor-pointer"
                            onClick={() => toggleAnswer(index)}
                        >
                            <h3 className="font-medium text-lg">{item.question}</h3>
                            <div className="answer mt-2 text-gray-200">{item.answer}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default QnA;
