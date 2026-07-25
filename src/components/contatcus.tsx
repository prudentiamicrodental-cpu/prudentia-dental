'use client';
import { useEffect, useState } from "react";
import { Clock, Mail, MapPin, MessageCircleCode, Phone } from "lucide-react";
import { useChatbot } from '@/components/chatbotContext';
import Markdown from "./markdown";

interface ContactInfo {
  heading: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  hours: string;
  mapEmbedUrl: string;
  locationName: string;
  directionsUrl: string;
}

const ContactUs = () => {
  const { handleOpenChatbot } = useChatbot();
  const [info, setInfo] = useState<ContactInfo | null>(null);

useEffect(() => {
    let isMounted = true;

    const GITHUB_URL =
      'https://raw.githubusercontent.com/prudentiamicrodental-cpu/Content/main/contact/contact-info.json';
    const LOCAL_URL = '/data/contact/contact-info.json';

    const loadLocal = () =>
      fetch(LOCAL_URL)
        .then((res) => {
          if (!res.ok) throw new Error(`Local fetch failed: ${res.status}`);
          return res.json();
        })
        .then((data: ContactInfo) => {
          if (isMounted) setInfo(data);
        })
        .catch((err) => console.error('Failed to load local contact info:', err));

    fetch(GITHUB_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`GitHub fetch failed: ${res.status}`);
        return res.json();
      })
      .then((data: ContactInfo) => {
        if (isMounted) setInfo(data);
      })
      .catch((err) => {
        console.warn('Failed to load contact info from GitHub, falling back to local:', err);
        return loadLocal();
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (!info) return null;

    return (
      <section id="contact" className="mt-10 py-5 px-10 bg-purple-100">
      <div className="container bg-white justify-center mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Contact Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-purple-50  py-12 rounded-xl shadow-sm  ">
            <Markdown className="text-3xl font-bold text-center text-gray-800 mb-8">
              {info.heading}
            </Markdown>

            <div className="space-y-6">
              {/* Phone */}
              <div className="flex items-start">
                <div className="bg-purple-100 p-3 rounded-full mr-4">
                  <Phone className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Phone</p>
                  <Markdown className="text-xl font-semibold text-gray-800">
                    {info.phone}
                  </Markdown>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <MessageCircleCode className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    WhatsApp
                  </p>
                  <Markdown className="text-xl font-semibold text-gray-800">
                    {info.whatsapp}
                  </Markdown>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-full mr-3 sm:mr-4 shrink-0">
                  <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                </div>
                <div className="min-w-0">
                  {" "}
                  {/* Added min-w-0 to prevent overflow */}
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <a
                    href={`mailto:${info.email}`}
                    className="text-base sm:text-xl font-semibold text-gray-800 
    hover:text-blue-600 transition-colors break-all"
                  >
                    {info.email}
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start">
                <div className="bg-red-100 p-3 rounded-full mr-4">
                  <MapPin className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Address</p>
                  <p className="text-lg font-medium text-gray-800 leading-relaxed">
                    {info.address}
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start">
                <div className="bg-amber-100 p-3 rounded-full mr-4">
                  <Clock className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Working Hours
                  </p>
                  <Markdown className="text-xl font-semibold text-gray-800">
                    {info.hours}
                  </Markdown>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="mt-10 text-center">
              <button
                onClick={handleOpenChatbot}
                className="inline-flex items-center px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors shadow-md"
              >
                Book an Appointment
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="relative w-full overflow-hidden rounded-xl shadow-xl border border-gray-200 dark:border-gray-700">
            <div className="aspect-w-16 aspect-h-9 w-full">
              <iframe
                src={info.mapEmbedUrl}
                className="w-full h-[400px] border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                aria-label="Location of Prudentia Micro Dental Care on Google Maps"
              />
            </div>
            <div className="bg-white dark:bg-gray-800 p-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                Our Location
              </h3>
              <Markdown className="text-gray-600 dark:text-gray-300 mt-1">
                {info.locationName}
              </Markdown>
              <a
                href={info.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center mt-3 text-blue-600 dark:text-blue-400 hover:underline"
              >
                Get Directions
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
    );
}

export default ContactUs;