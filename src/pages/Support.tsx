import ContactCardContainer from "../components/ContactCardContainer";
import { faq } from "../constants/home";
import useLoginSignupAnimation from "../hooks/useLoginSignupAnimation";

const Support = () => {
    const { containerRef, gifRef, formRef } = useLoginSignupAnimation()
    return (
        <div className="wrapper">
            <div className="container py-12 space-y-12">
                {/* Hero */}
                <header className="text-center space-y-4">
                    <h1 className="title-h2 text-gradient">Support</h1>
                    <p className="max-w-2xl mx-auto">
                        Need help? Browse our FAQs, or reach out to our support team.
                    </p>
                </header>

                {/* FAQ */}
                <section className="space-y-5 ">
                    <h2 className="title mb-4">Frequently Asked Questions</h2>
                    {
                        faq.slice(6).map((fa, index) => (
                            <details key={index} className="p-4 border rounded-lg max-w-4xl">
                                <summary className="font-medium cursor-pointer">
                                    {fa.question}
                                </summary>
                                <p className="mt-2 ">
                                    {fa.answer}
                                </p>
                            </details>
                        ))
                    }

                </section>

                {/* Contact Form */}
                {/* Card Container */}
                <ContactCardContainer
                    containerRef={containerRef}
                    formRef={formRef}
                    gifRef={gifRef}

                />
                {/* Extra Resources */}
                <section>
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
