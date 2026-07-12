"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Markdown from "./markdown";


interface ServiceItem {
  name: string;
  href: string;
}

interface ServiceCategory {
  category: string;
  iconPaths: string[];
  items: ServiceItem[];
}

export default function ServicesDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [services, setServices] = useState<ServiceCategory[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    let isMounted = true;
    fetch("/data/home/services-menu.json")
      .then((res) => res.json())
      .then((data: ServiceCategory[]) => {
        if (isMounted) setServices(data);
      })
      .catch((err) => console.error("Failed to load services menu:", err));
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center text-gray-800 hover:text-blue-600 font-medium px-4 py-3 transition-colors duration-200"
      >
        <span className="mr-2">Services</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-1 w-[300px] rounded-xl shadow-xl bg-white border border-gray-100 z-50">
          <div className="max-h-[70vh] overflow-y-auto">
            <div className="flex flex-col divide-y divide-gray-100">
              {services.map((section) => (
                <div key={section.category} className="p-4">
                  <div className="flex items-center mb-3 sticky top-0 bg-white py-2 z-10">
                    <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {section.iconPaths.map((d, i) => (
                        <path key={i} strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={d} />
                      ))}
                    </svg>
                    <Markdown className="ml-2 text-lg font-semibold text-gray-900">{section.category}</Markdown>
                  </div>
                  <ul className="space-y-2">
                    {section.items.map((service) => (
                      <li key={service.name}>
                        <Link
                          href={service.href}
                          className="block px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors duration-150"
                          onClick={() => setIsOpen(false)}
                        >
                          <Markdown>{service.name}</Markdown>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 sticky bottom-0">
            <Link
              href="https://blog.prudentiamicrodental.in/"
              className="text-blue-600 font-medium text-sm hover:underline flex items-center"
              onClick={() => setIsOpen(false)}
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