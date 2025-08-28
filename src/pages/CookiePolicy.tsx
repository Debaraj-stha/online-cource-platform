
import { cookiePolicySections } from "../constants/cookie-policy";
import useCookieAndTermAnimation from "../hooks/useCookieAndTermAnimation";


const CookiePolicy = () => {
    const {containerRef}=useCookieAndTermAnimation()
    return (
        <div className="wrapper">
            <div className="container space-y-12 py-12" ref={containerRef}>
                {/* Hero */}
                <header className="text-center space-y-4">
                    <h1 className="title-h2 text-gradient">Cookie Policy</h1>
                    <p className="max-w-3xl text-justify mx-auto">
                        This Cookie Policy explains how we use cookies and similar
                        technologies to improve your browsing experience, personalize
                        content, and analyze traffic.
                    </p>
                </header>

                {/* Dynamic Sections */}
                {cookiePolicySections.map((section, i) => (
                    <section key={i} className="space-y-4">
                        <h2 className="title">{section.title}</h2>

                        {/* Paragraph content */}
                        {section.content && section.content.map((p, idx) => (
                            <p key={idx} className="body-text">{p}</p>
                        ))}

                        {/* List content */}
                        {section.list && (
                            <ul className="list-disc list-inside space-y-2 body-text">
                                {section.list.map((item, idx) => (
                                    <li key={idx}>
                                        <strong>{item.name}:</strong> {item.desc}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </section>
                ))}
            </div>
        </div>
    );
};

export default CookiePolicy;
