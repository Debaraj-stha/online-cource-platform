import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { navLinksNavbar } from '../constants/common';
import BrandLogo from './BrandLogo';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
    const navRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        const hero = document.querySelector('.hero-section');
        const links = document.querySelectorAll('.navbar-link');
        if (!navRef.current || !hero) return;
        gsap.to("nav", {
            backgroundColor: "#F0F0F0",
            padding: "1.5rem 3rem",
            scrollTrigger: {
                trigger: ".hero-section",
                start: "top top",
                end: "+=100",
                scrub: true
            }
        });

        gsap.to(
            links,
            {
                opacity: 0.5,
                stagger: 0.2,
                duration: 0.4,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: hero,
                    start: "bottom top",  // when bottom of hero hits top of viewport
                    end: "+=100",         // optional: adds a small scroll range
                    toggleActions: "play none none reverse",
                    // onEnter: play animation when hero leaves
                    // onLeave: do nothing
                    // onEnterBack: do nothing
                    // onLeaveBack: reverse animation when hero re-enters
                },
            }
        );



    }, []);




    return (
        <nav
            ref={navRef}
            id="navbar"
            className="navbar fixed top-0 left-0 w-full z-50 transition-colors duration-300 overflow-visible"
        >
            <BrandLogo />
            <ul className="navbar-links">
                {navLinksNavbar.map((link, index) => (
                    <li key={index}>
                        <Link to={link.path} className="navbar-link">
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Navbar;
