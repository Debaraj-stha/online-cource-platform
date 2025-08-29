import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import QnAList from "../components/QnAList";
import AskQuestionForm from "../components/AskQuestionForm";
import { useGSAP } from "@gsap/react";

const QnA = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleAnswer = (index: number) => {
        setOpenIndex(index)
        const answers = containerRef.current!.querySelectorAll(".answer")
        if (openIndex === index) {
            gsap.set(answers[index], {
                height: 0, opacity: 0, overflow: "hidden", duration: 0.4
            })
            setOpenIndex(null)
        }
        else {
            if (openIndex !== null) {
                gsap.to(answers[index], {
                    height: 0,
                    opacity: 0,
                    duration: 0.4,
                });
            }
            gsap.to(answers[index], {
                opacity: 1,
                height: "auto",
                duration: 0.4
            })
            setOpenIndex(index)

        }
    }


    useEffect(() => {
        const current = containerRef.current
        if (!current) return
        const answers = current.querySelectorAll(".answer")
        answers.forEach((answer) => {
            gsap.set(answer, { height: 0, opacity: 0, overflow: "hidden" });
        });
    }, [containerRef])


    useGSAP(() => {
        const current = containerRef.current

        gsap.from(current?.querySelector("header h1")!, {
            opacity: 0,
            y: 50,
            ease: "power1.inOut"
        })

        gsap.from(current?.querySelector("header p")!, {
            opacity: 0,
            y: 50,
            delay: 0.1,
            ease: "power1.inOut"
        })
        gsap.from(current?.querySelector("form")!, {
            opacity: 0,
            y: 50,
            delay: 0.2,
            ease: "power1.inOut"
        })
        const question = current?.querySelectorAll(".question")
        if (question)
            gsap.from(question, {
                opacity: 0,
                y: 50,
                delay: 0.2,

                stagger: 0.1,
                duration: 0.6,
                ease: "power1.inOut"
            })
    }, [containerRef])


    return (
        <div ref={containerRef} className="wrapper py-12">
            <div className="container space-y-8">
                <header className="text-center space-y-2 mb-12">
                    <h1 className="title-h2 text-gradient">Q&A</h1>
                    <p className="max-w-2xl mx-auto">
                        Ask questions and get answers from instructors and fellow learners.
                    </p>
                </header>
                {/* Input Form */}
                <AskQuestionForm />

                {/* Q&A List */}
                <QnAList toggleAnswer={toggleAnswer} />
            </div>
        </div>
    );
};

export default QnA;
