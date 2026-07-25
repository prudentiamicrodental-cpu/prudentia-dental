
'use client';
import { useEffect, useState } from 'react';
import BeforeAfterSlider from "./slider";

interface SlidePair {
  beforeImage: string;
  afterImage: string;
}

export default function SmileSection() {
  const [pairs, setPairs] = useState<SlidePair[]>([]);

useEffect(() => {
    let isMounted = true;

    const GITHUB_URL =
      'https://raw.githubusercontent.com/prudentiamicrodental-cpu/Content/main/home/smile-transformations.json';
    const LOCAL_URL = '/data/home/smile-transformations.json';

    const loadLocal = () =>
      fetch(LOCAL_URL)
        .then((res) => {
          if (!res.ok) throw new Error(`Local fetch failed: ${res.status}`);
          return res.json();
        })
        .then((data: SlidePair[]) => {
          if (isMounted) setPairs(data);
        })
        .catch((err) => console.error('Failed to load local smile transformations:', err));

    fetch(GITHUB_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`GitHub fetch failed: ${res.status}`);
        return res.json();
      })
      .then((data: SlidePair[]) => {
        if (isMounted) setPairs(data);
      })
      .catch((err) => {
        console.warn('Failed to load smile transformations from GitHub, falling back to local:', err);
        return loadLocal();
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div>
      <section id="smile" className="py-2">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            Our Smile Transformations
          </h2>
        </div>
      </section>
      {/* *Before and after Slider */}
      <section className="py-1 px-4 bg-white ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {pairs.map((pair, index) => (
            <BeforeAfterSlider
              key={index}
              beforeImage={pair.beforeImage}
              afterImage={pair.afterImage}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
