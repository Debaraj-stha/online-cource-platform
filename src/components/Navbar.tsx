import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { navLinksNavbar } from '../constants/common';
import BrandLogo from './BrandLogo';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CgMoreVerticalAlt } from 'react-icons/cg';
import UserOptionsCard from './UserOptionsCard';
import Searchbar from './Searchbar';
import { useGSAP } from '@gsap/react';
import ThemeToggler from './ThemeToggler';
import { useTranslation } from 'react-i18next';

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
    const navRef = useRef<HTMLElement | null>(null);
    const [showUserCard, setShowUserCard] = useState(false)
    const [isSearchbarOpen, setSearchbarOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState<string>()
    const SMALL_DEVICE_WIDTH = 768
    const location = useLocation()




    const handleSearchbarClick = () => {
        if (window.innerWidth <= SMALL_DEVICE_WIDTH) {
            setSearchbarOpen(true);
        }
    };

    const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value)
    }

    const onSearch = () => {
        setSearchbarOpen(false)
        setSearchQuery("")
    }
    const onBack = () => {
        setSearchbarOpen(false)
    }
    useGSAP(() => {
        const hero = document.querySelector('.hero-section');
        const links = document.querySelectorAll('.navbar-link');
        if (!navRef.current || !hero) return;

        const isSmallDevice = window.innerWidth < 768; // Tailwind's md = 768px
        const navPadding = isSmallDevice ? "1rem 1rem" : "1.5rem 3rem";

        gsap.to("nav", {
            backgroundColor: "#0f172a",
            padding: navPadding,
            scrollTrigger: {
                trigger: ".hero-section",
                start: "top top",
                end: "+=100",
                scrub: true
            }
        });

        gsap.to(links, {
            opacity: 0.5,
            stagger: 0.2,
            duration: 0.4,
            ease: "power2.out",
            scrollTrigger: {
                trigger: hero,
                start: "bottom top",
                end: "+=100",
                toggleActions: "play none none reverse",
            },
        });

        gsap.to(".brand", {
            opacity: 0.5,
            stagger: 0.2,
            duration: 0.4,
            ease: "power2.out",
            scrollTrigger: {
                trigger: hero,
                start: "bottom top",
                end: "+=100",
                toggleActions: "play none none reverse",
            }
        });
    }, { scope: navRef });

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > SMALL_DEVICE_WIDTH) {
                setSearchbarOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    const { t } = useTranslation()

   
    return (
        <nav
            ref={navRef}
            id="navbar"
            className="navbar bg-gray-900 "
        >
            {!isSearchbarOpen &&
                <BrandLogo isHeader={true} />
            }
            {
                !isSearchbarOpen &&
                <ul className="navbar-links">
                    {navLinksNavbar.map((link, index) => {
                        const isActive = (link.path === "/" && location.pathname === "/") ||
                            (link.path !== "/" && location.pathname.startsWith(link.path));
                        return (
                            <li key={index}>
                                <Link to={link.path} state={{ from: location.pathname }} className={`navbar-link ${isActive ? "active_link" : ""}`}>
                                    {t(`nav.${link.label}`)}
                                </Link>
                            </li>
                        )
                    }
                    )}
                </ul>
            }
            <div className={`relative items-center gap-3  lg:max-w-md ${isSearchbarOpen ? 'w-full' : 'flex justify-around md:justify-between'}`}>

                <Searchbar
                    onMouseClick={handleSearchbarClick}
                    value={searchQuery}
                    onChange={handleQueryChange}
                    onSearch={onSearch}
                    onBack={onBack}
                />
                <div>
                    <ThemeToggler />
                </div>
                {
                    !isSearchbarOpen &&
                    <div className='flex justify-between items-center whitespace-nowrap'>
                        <p className='hidden md:block '>Jhon Doe</p>
                        <div className='hover:animate-pulse px-2 cursor-pointer' onClick={() => setShowUserCard((prev) => !prev)}>
                            <CgMoreVerticalAlt size={20} />
                        </div>
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
