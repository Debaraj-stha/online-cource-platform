import { navLinksFooter, SUPPORT_EMAIL, SUPPORT_TEL } from '../constants/common';
import { Link } from 'react-router-dom';
import BrandLogo from './BrandLogo';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Footer = () => {
    const footerRef = useRef<HTMLDivElement | null>(null);
    const currentUserRole = "student"; // Replace with real auth role

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const columns = footerRef.current?.querySelectorAll('.footer-column');

        if (!columns) return;
        gsap.set(columns, { opacity: 0, y: 50 })
        gsap.to(columns, {
            scrollTrigger: {
                trigger: footerRef.current,
                start: "top 80%",
            },
            opacity: 1,
            y: 0,
            stagger: 0.3,
            duration: 0.8,
            ease: "power3.out",
        });

    }, []);

    return (
        <footer className="footer" ref={footerRef}>
            <div className="footer-container flex flex-wrap gap-8">
                {/* Column 1: Logo + About */}
                <div className="footer-column flex-1 min-w-[250px]">
                    <BrandLogo />
                    <p className="footer-description mt-4 max-w-sm">
                        Your go-to platform for learning, teaching, and sharing knowledge.
                        Explore premium courses, interact with instructors, and level up your skills.
                    </p>
                </div>

                {/* Column 2: Quick Links */}
                <div className="footer-column flex-1 min-w-[150px]">
                    <h4 className="footer-heading mb-3">Quick Links</h4>
                    <ul className="footer-links space-y-2">
                        {navLinksFooter
                            .filter(link => link.roles.includes(currentUserRole))
                            .map((link, index) => (
                                <li key={index}>
                                    <Link to={link.path} className="footer-link hover:underline">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                    </ul>
                </div>

                {/* Column 3: Contact / Support */}
                <div className="footer-column flex-1 min-w-[150px]">
                    <h4 className="footer-heading mb-3">Support</h4>
                    <ul className="footer-links space-y-2">
                        <li>
                            <Link to="/support" className="footer-link hover:underline">
                                Help Center
                            </Link>
                        </li>
                        <li>
                            <a href={`mailto:${SUPPORT_EMAIL}`} className="footer-link hover:underline">
                                {SUPPORT_EMAIL}
                            </a>
                        </li>
                        <li>
                            <a href={`tel:${SUPPORT_TEL}`} className="footer-link hover:underline">
                                {SUPPORT_TEL}
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom text-center mt-8 text-sm">
                © {new Date().getFullYear()} New Learning. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
