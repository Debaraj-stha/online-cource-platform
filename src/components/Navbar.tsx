import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { navLinksNavbar } from '../constants/common';
import BrandLogo from './BrandLogo';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CgMoreVerticalAlt } from 'react-icons/cg';
import UserOptionsCard from './UserOptionsCard';
import Searchbar from './Searchbar';

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
    const navRef = useRef<HTMLElement | null>(null);
    const [showUserCard, setShowUserCard] = useState(false)
    const [isSearchbarOpen, setSearchbarOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState<string>()
    const SMALL_DEVICE_WIDTH = 765

    useEffect(() => {
        const hero = document.querySelector('.hero-section');
        const links = document.querySelectorAll('.navbar-link');
        if (!navRef.current || !hero) return;
        gsap.to("nav", {
            backgroundColor: "#0f172a",
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

        gsap.to(".brand", {
            opacity: 0.5,
            stagger: 0.2,
            duration: 0.4,
            ease: "power2.out",
            scrollTrigger: {
                trigger: hero,
                start: "bottom top",  // when bottom of hero hits top of viewport
                end: "+=100",         // optional: adds a small scroll range
                toggleActions: "play none none reverse",
            }
        })


    }, []);

    const handleSearchbarClick = () => {
        if (window.innerWidth > SMALL_DEVICE_WIDTH) return
        setSearchbarOpen((prev) => !prev)
        console.log("called")
    }

    const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value)
    }


    return (
        <nav
            ref={navRef}
            id="navbar"
            className={`navbar bg-gray-900`}
        >
            {!isSearchbarOpen &&
                <BrandLogo isHeader={true} />
            }
            {
                !isSearchbarOpen &&
                <ul className="navbar-links">
                    {navLinksNavbar.map((link, index) => (
                        <li key={index}>
                            <Link to={link.path} className="navbar-link">
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            }
            <div className={`relative gap-6 items-center ${isSearchbarOpen ? 'w-full' : 'flex justify-between'}`}>
                <Searchbar
                    onMouseClick={handleSearchbarClick}
                    value={searchQuery}
                    onChange={handleQueryChange}
                />
                {
                    !isSearchbarOpen &&
                    <div className='flex justify-between items-center'>
                        <p className='hidden md:block '>Jhon Doe</p>
                        <button className='hover:animate-pulse' onClick={() => setShowUserCard((prev) => !prev)}>
                            <CgMoreVerticalAlt size={20} />
                        </button>
                        {showUserCard &&
                            <UserOptionsCard />
                        }
                    </div>
                }


            </div>
        </nav>
    );
};

export default Navbar;
