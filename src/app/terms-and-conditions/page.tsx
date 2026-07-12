"use client";

import { useEffect, useState } from "react";

interface Section {
  heading: string;
  body: string;
  list?: string[];
}

interface TermsData {
  title: string;
  lastUpdated: string;
  sections: Section[];
}

// Primary source — your live API
const API_URL = "https://raw.githubusercontent.com/prudentiamicrodental-cpu/Content/main/home/privacy-policy.json";
// Fallback source — bundled/local copy, e.g. inside public/data/
const LOCAL_URL = "/data/home/terms-and-conditions.json";

export default function TermsAndConditionsPage() {
  const [data, setData] = useState<TermsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchFrom(url: string): Promise<TermsData> {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Request to ${url} failed: ${res.status}`);
      }
      return res.json();
    }

    async function fetchData() {
      setLoading(true);
      setError(null);

      try {
        // 1. Try the API first
        const json = await fetchFrom(API_URL);
        if (isMounted) setData(json);
      } catch (apiErr) {
        console.warn("API fetch failed, falling back to local data:", apiErr);

        try {
          // 2. Fall back to the local copy
          const json = await fetchFrom(LOCAL_URL);
          if (isMounted) setData(json);
        } catch (localErr) {
          if (isMounted) {
            setError(
              localErr instanceof Error ? localErr.message : "Something went wrong"
            );
          }
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[50vh]">
        <div className="h-8 w-8 border-4 border-gray-300 border-t-gray-800 rounded-full animate-spin mb-4" />
        <p className="text-gray-500">Loading Terms and Conditions...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-12">
        <p className="text-red-600">Failed to load Terms and Conditions: {error}</p>
      </main>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-12 pt-24">
      <h1 className="text-3xl font-bold mb-6">{data.title}</h1>
      <p className="text-sm text-gray-500 mb-8">Last updated: {data.lastUpdated}</p>

      {data.sections.map((section) => (
        <section key={section.heading} className="mb-8">
          <h2 className="text-xl font-semibold mb-2">{section.heading}</h2>
          <p>{section.body}</p>
          {section.list && (
            <ul className="list-disc list-inside space-y-1 mt-2">
              {section.list.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </main>
  );
}