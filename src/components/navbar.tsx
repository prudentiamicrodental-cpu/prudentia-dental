"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import ServicesDropdown from './ServicesDropdown';
import MobileServicesDropdown from './MobileServiceDropDown';
import { useChatbot } from './chatbotContext';

interface NavLink {
  label: string;
  href: string;
  type?: 'link' | 'contact';
}

interface NavLinks {
  before: NavLink[];
  after: NavLink[];
}

const CONTACT_SECTION_ID = 'contact';

const Navbar = () => {
  const { handleOpenChatbot } = useChatbot();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [navLinks, setNavLinks] = useState<NavLinks>({ before: [], after: [] });
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;
    fetch('/data/home/nav-links.json')
      .then((res) => res.json())
      .then((data: NavLinks) => {
        if (isMounted) setNavLinks(data);
      })
      .catch((err) => console.error('Failed to load nav links:', err));
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  // Effect to handle scrolling in mobile menu
  useEffect(() => {
    const mobileMenu = mobileMenuRef.current;
    if (!mobileMenu) return;

    const handleMobileScroll = (e: WheelEvent) => {
      e.preventDefault();
      mobileMenu.scrollTop += e.deltaY;
    };

    if (isOpen) {
      mobileMenu.addEventListener('wheel', handleMobileScroll);
    }

    return () => {
      mobileMenu.removeEventListener('wheel', handleMobileScroll);
    };
  }, [isOpen]);

  // Scrolls to the contact section, polling briefly in case it hasn't
  // rendered/hydrated yet (e.g. right after navigating from another page).
  const scrollToContact = useCallback(() => {
    let attempts = 0;
    const maxAttempts = 20; // ~2s total
    const tryScroll = () => {
      const el = document.getElementById(CONTACT_SECTION_ID);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
      attempts += 1;
      if (attempts < maxAttempts) {
        setTimeout(tryScroll, 100);
      }
    };
    tryScroll();
  }, []);

  // If we land on the homepage with #contact in the URL (after navigating
  // from another page), scroll to the contact section once it's ready.
  useEffect(() => {
    if (pathname === '/' && window.location.hash === `#${CONTACT_SECTION_ID}`) {
      scrollToContact();
    }
  }, [pathname, scrollToContact]);

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (pathname === '/') {
      // Already on the homepage: just smooth-scroll, no navigation needed.
      window.history.pushState(null, '', `#${CONTACT_SECTION_ID}`);
      scrollToContact();
    } else {
      // Navigate to the homepage; the effect above scrolls once it mounts.
      router.push(`/#${CONTACT_SECTION_ID}`);
    }
    setIsOpen(false);
  };

  const renderLink = (link: NavLink, className: string) => {
    if (link.type === 'contact') {
      return (
        <a key={link.href} href={link.href} onClick={handleContactClick} className={className}>
          {link.label}
        </a>
      );
    }
    return (
      <Link
        key={link.href}
        href={link.href}
        className={className}
        onClick={() => setIsOpen(false)}
      >
        {link.label}
      </Link>
    );
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-white/90 backdrop-blur-sm py-3'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <div className="flex items-center space-x-2">
            <Link href="/" className="flex items-center">
              <Image 
                src="/logo.svg" 
                alt="Prudentia Micro Dental Care Logo"
                width={50} 
                height={50}
                className="h-12 w-auto"
              />
              <div className="ml-2">
                <h1 className="text-2xl font-bold text-purple-800 tracking-tight">
                  PRUDENTIA
                </h1>
                <h2 className="text-sm font-medium text-purple-600 tracking-wider">
                  MICRO DENTAL CARE
                </h2>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.before.map((link) =>
              renderLink(link, "text-gray-800 hover:text-purple-700 font-medium transition-colors duration-200")
            )}
            <ServicesDropdown />
            {navLinks.after.map((link) =>
              renderLink(link, "text-gray-800 hover:text-purple-700 font-medium transition-colors duration-200")
            )}
            <button 
              onClick={handleOpenChatbot}
              className="bg-gradient-to-r from-purple-600 to-purple-800 text-white px-5 py-2.5 rounded-md hover:from-purple-700 hover:to-purple-900 transition-all duration-300 shadow-md hover:shadow-lg font-medium"
            >
              Book Appointment
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-800 focus:outline-none p-2 rounded-md hover:bg-gray-100 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div 
          ref={mobileMenuRef}
          className={`lg:hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[80vh] opacity-100 py-4 overflow-y-auto' : 'max-h-0 opacity-0 overflow-hidden'}`}
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: '#9f7aea #f3f4f6'
          }}
        >
          <div className="px-2 pt-2 pb-4 space-y-2">
            {navLinks.before.map((link) =>
              renderLink(link, "block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:bg-gray-100")
            )}
            <MobileServicesDropdown onClick={() => setIsOpen(false)} />
            {navLinks.after.map((link) =>
              renderLink(link, "block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:bg-gray-100")
            )}
            <button 
              onClick={() => {
                handleOpenChatbot();
                setIsOpen(false);
              }}
              className="w-full mt-2 bg-gradient-to-r from-purple-600 to-purple-800 text-white px-4 py-2.5 rounded-md hover:from-purple-700 hover:to-purple-900 transition-all duration-300 font-medium"
            >
              Book Appointment
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;