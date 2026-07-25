"use client";

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Markdown from './markdown';

interface MobileServicesDropdownProps {
  onClick?: () => void;
}

interface ServiceItem {
  name: string;
  href: string;
}

interface ServiceCategory {
  category: string;
  iconPaths: string[];
  items: ServiceItem[];
}

const MobileServicesDropdown = ({ onClick }: MobileServicesDropdownProps) => {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [openSubCategory, setOpenSubCategory] = useState<string | null>(null);
  const [services, setServices] = useState<ServiceCategory[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

useEffect(() => {
    let isMounted = true;

    const GITHUB_URL =
      'https://raw.githubusercontent.com/prudentiamicrodental-cpu/Content/main/home/services-menu.json';
    const LOCAL_URL = '/data/home/service-menu.json';

    const loadLocal = () =>
      fetch(LOCAL_URL)
        .then((res) => {
          if (!res.ok) throw new Error(`Local fetch failed: ${res.status}`);
          return res.json();
        })
        .then((data: ServiceCategory[]) => {
          if (isMounted) setServices(data);
        })
        .catch((err) => console.error('Failed to load local services menu:', err));

    fetch(GITHUB_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`GitHub fetch failed: ${res.status}`);
        return res.json();
      })
      .then((data: ServiceCategory[]) => {
        if (isMounted) setServices(data);
      })
      .catch((err) => {
        console.warn('Failed to load services menu from GitHub, falling back to local:', err);
        return loadLocal();
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const toggleServices = () => {
    setIsServicesOpen(!isServicesOpen);
    setOpenSubCategory(null);
  };

  const toggleSubCategory = (category: string) => {
    setOpenSubCategory(openSubCategory === category ? null : category);
  };

  const handleServiceClick = () => {
    setIsServicesOpen(false);
    setOpenSubCategory(null);
    if (onClick) onClick(); // Call the parent's onClick handler if it exists
  };

  return (
    <div className="w-full" ref={dropdownRef}>
      {/* Main Services Button */}
      <button
        onClick={toggleServices}
        className="flex items-center border-b justify-between w-full px-1 py-3 text-left text-gray-700 hover:bg-gray-50"
      >
        <span className="font-medium">Services</span>
        <svg
          className={`h-5 w-5 transform transition-transform ${
            isServicesOpen ? 'rotate-180' : ''
          }`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Services Submenu */}
      {isServicesOpen && (
        <div className="pl-4 bg-gray-50">
          {services.map(({ category, items }) => (
            <div key={category} className="border-b border-gray-200 last:border-b-0">
              {/* Category Button */}
              <button
                onClick={() => toggleSubCategory(category)}
                className="flex items-center justify-between w-full px-3 py-3 text-left text-gray-700"
              >
                <span className="font-medium text-purple-600">{category}</span>
                <svg
                  className={`h-5 w-5 transform transition-transform ${
                    openSubCategory === category ? 'rotate-180' : ''
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {/* Services List */}
              {openSubCategory === category && (
                <div className="pl-4 pb-2 space-y-2">
                  {items.map((service) => (
                    <Link
                      key={service.name}
                      href={service.href}
                      className="block px-3 py-2.5 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-md transition-colors"
                      onClick={handleServiceClick} // Use the new handler here
                    >
                      <Markdown>{service.name}</Markdown>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 sticky bottom-0">
            <Link
              href="https://blog.prudentiamicrodental.in/"
              className="text-blue-600 font-medium text-sm hover:underline flex items-center"
              onClick={() => setIsServicesOpen(false)}
            >
              All dental services
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default MobileServicesDropdown;