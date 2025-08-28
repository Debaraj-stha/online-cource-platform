import { termsSections } from "../constants/terms-conditions";
import useCookieAndTermAnimation from "../hooks/useCookieAndTermAnimation";

const Terms = () => {
    const { containerRef } = useCookieAndTermAnimation()


    return (
        <div className="wrapper">
            <div className="container space-y-12 py-12" ref={containerRef}>
                {/* Hero */}
                <header className="text-center space-y-4">
                    <h1 className="title-h2 text-gradient">Terms & Conditions</h1>
                    <p className="max-w-3xl mx-auto text-justify">
                        By accessing or using our platform, you agree to the following Terms & Conditions.
                        Please read them carefully before using our services.
                    </p>
                </header>

                {/* Dynamic Sections */}
                {termsSections.map((section, i) => (
                    <section key={i} className="space-y-4">
                        <h2 className="title">{section.title}</h2>

                        {/* Paragraphs */}
                        {section.content && section.content.map((p, idx) => (
                            <p key={idx} className="">{p}</p>
                        ))}

                        {/* List */}
                        {section.list && (
                            <ul className="list-disc list-inside space-y-2 body-text">
                                {section.list.map((item, idx) => (
                                    <li key={idx}>{item}</li>
                                ))}
                            </ul>
                        )}
                    </section>
                ))}
            </div>
        </div>
    );
};

export default Terms;
