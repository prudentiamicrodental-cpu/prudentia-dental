
'use client';

import { useEffect, useRef, useState } from 'react';
import ServiceCard from './serviceCard';



interface ServiceCardData {
  mainTitle: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  ctaPrimary: string;
  ctaSecondary: string;
  tagline: string;
  image: string;
}

const ThemeCarousel = () => {
  const cardsTrackRef = useRef<HTMLDivElement>(null);
  const [serviceCards, setServiceCards] = useState<ServiceCardData[]>([]);

useEffect(() => {
    let isMounted = true;

    const GITHUB_URL =
      'https://raw.githubusercontent.com/prudentiamicrodental-cpu/Content/main/home/service-cards.json';
    const LOCAL_URL = '/data/home/service-cards.json';

    const loadLocal = () =>
      fetch(LOCAL_URL)
        .then((res) => {
          if (!res.ok) throw new Error(`Local fetch failed: ${res.status}`);
          return res.json();
        })
        .then((data: ServiceCardData[]) => {
          if (isMounted) setServiceCards(data);
        })
        .catch((err) => console.error('Failed to load local service cards:', err));

    fetch(GITHUB_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`GitHub fetch failed: ${res.status}`);
        return res.json();
      })
      .then((data: ServiceCardData[]) => {
        if (isMounted) setServiceCards(data);
      })
      .catch((err) => {
        console.warn('Failed to load service cards from GitHub, falling back to local:', err);
        return loadLocal();
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    // Duplicate cards for infinite scroll loop
    if (cardsTrackRef.current && serviceCards.length > 0) {
      const originalContent = cardsTrackRef.current.innerHTML;
      cardsTrackRef.current.innerHTML = originalContent + originalContent;
    }
  }, [serviceCards]);

  return (
    <>

      <div className="w-full mx-auto py-12 bg-white">
        <div className="carousel overflow-hidden w-full relative px-4">
          <div
            ref={cardsTrackRef}
            className="cards-track flex gap-6 animate-scroll-horizontal w-max"
            style={{ animationDuration: '40s' }}
          >
            {serviceCards.map((card, index) => (
              <div key={index} className="w-[350px] flex-shrink-0">
                <ServiceCard {...card} />
              </div>
            ))}
          </div>
          
          {/* Gradient fade effects on sides */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10"></div>
        </div>
      </div>
    </>
  );
};

export default ThemeCarousel;
