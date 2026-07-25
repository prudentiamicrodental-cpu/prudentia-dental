'use client';

import Image, { StaticImageData } from 'next/image';
import { useEffect, useState } from 'react';
import Markdown from './markdown';


interface TechnologyCardProps {
  image: StaticImageData | string;
  title: string;
  description: string;
}

const TechnologyCard = ({ image, title, description }: TechnologyCardProps) => {
  return (
    <div className="group relative overflow-hidden rounded-xl bg-gradient-to-b from-purple-400 to-white shadow-lg transition-all duration-300 hover:shadow-xl">
      <div className="aspect-video overflow-hidden">
        <Image
          src={image}
          alt={title}
          width={400}
          height={300}
          className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <Markdown className="mb-2 text-xl font-semibold text-gray-900">{title}</Markdown>
        <Markdown className="text-gray-600">{description}</Markdown>
      </div>
    </div>
  );
};

export default function TechnologySection() {
  const [features, setFeatures] = useState<TechnologyCardProps[]>([]);

useEffect(() => {
    let isMounted = true;

    const GITHUB_URL =
      'https://raw.githubusercontent.com/prudentiamicrodental-cpu/Content/main/home/technology-features.json';
    const LOCAL_URL = '/data/home/technology-features.json';

    const loadLocal = () =>
      fetch(LOCAL_URL)
        .then((res) => {
          if (!res.ok) throw new Error(`Local fetch failed: ${res.status}`);
          return res.json();
        })
        .then((data: TechnologyCardProps[]) => {
          if (isMounted) setFeatures(data);
        })
        .catch((err) => console.error('Failed to load local technology features:', err));

    fetch(GITHUB_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`GitHub fetch failed: ${res.status}`);
        return res.json();
      })
      .then((data: TechnologyCardProps[]) => {
        if (isMounted) setFeatures(data);
      })
      .catch((err) => {
        console.warn('Failed to load technology features from GitHub, falling back to local:', err);
        return loadLocal();
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="bg-gradient-to-b from-purple-100 to-white py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Unique Features
          </h2>
          <p className="text-lg text-gray-600">
            Holistic dentistry that treats the person—not just the teeth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature) => (
            <TechnologyCard key={feature.title} {...feature} />
          ))}
        </div>

        <div className="mt-12 md:mt-16 text-center">
          <p className="text-xl md:text-2xl font-semibold text-purple-600">
            Smarter tools. Smoother care.
          </p>
        </div>
      </div>
    </section>
  );
}
