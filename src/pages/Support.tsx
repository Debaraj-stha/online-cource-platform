import ContactCardContainer from "../components/ContactCardContainer";
import FAQ from "../components/FAQ";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useLoginSignupAnimation from "../hooks/useLoginSignupAnimation";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";

const Support = () => {
    const ref = useRef<HTMLDivElement>(null)
    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger)
        const current = ref.current
        if (!current) return
        const h = current.querySelector("header h1")
        const p = current.querySelector("header p")
        if (h)
            gsap.from(h, {
                opacity: 0,
                y: 30,
                ease: "power1.inOut gsap"
            })
        if (p)
            gsap.from(p, {
                opacity: 0,
                y: 30,
                delay: 0.1,
                ease: "power1.inOut"
            })
        const resources = current.querySelector(".resources")
        if (resources)
            gsap.from(
                resources,
                {
                    opacity: 0,
                    y: 50,
                    duration: 0.2,
                    ease: "power1.inOut",
                    scrollTrigger: {
                        trigger: resources,
                        start: "top 80%",
                        end: "top 70%",
                        scrub: true
                    }
                })
         

    }, {scope:ref})

    const { containerRef, gifRef, formRef } = useLoginSignupAnimation()
    return (
        <div className="wrapper">
            <div className="container py-12 space-y-12" ref={ref}>
                {/* Hero */}
                <header className="text-center space-y-4">
                    <h1 className="title-h2 text-gradient">Support</h1>
                    <p className="max-w-2xl mx-auto">
                        Need help? Browse our FAQs, or reach out to our support team.
                    </p>
                </header>

                {/* FAQ */}
                <h3 className="title m-0">Frequently Asked Questions</h3>
                <FAQ includeHeader={false} />

                {/* Contact Form */}
                {/* Card Container */}
                <ContactCardContainer
                    containerRef={containerRef}
                    formRef={formRef}
                    gifRef={gifRef}
                    message=""

                />
                {/* Extra Resources */}
                <section className="resources">
                    <h2 className="title mb-4">Helpful Resources</h2>
                    <ul className="list-disc list-inside space-y-2 text-gray-100">
                        <li>
                            <a href="/guides/getting-started" className="text-purple-600 hover:underline">
                                Getting Started Guide
                            </a>
                        </li>
                        <li>
                            <a href="/policies/refund" className="text-purple-600 hover:underline">
                                Refund Policy
                            </a>
                        </li>
                    </ul>
                </section>
            </div>
        </div>
    );
};

export default Support;
