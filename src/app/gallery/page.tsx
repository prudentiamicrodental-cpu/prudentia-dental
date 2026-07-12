'use client';

import { useEffect, useState } from 'react';
import { RowsPhotoAlbum, RenderImageProps, RenderImageContext } from 'react-photo-album';
import Lightbox from 'yet-another-react-lightbox';
import 'react-photo-album/rows.css';
import 'yet-another-react-lightbox/styles.css';

import  { ExtendedPhoto, getPhotos } from '@/components/photos';
import { Image } from '@imagekit/next';
import Head from 'next/head';


export default function GalleryPage() {
  const [index, setIndex] = useState<number>(-1);
  const [photos, setPhotos] = useState<ExtendedPhoto[]>([]);
    useEffect(() => {
      getPhotos().then(setPhotos);
    }, []);


  const renderImage = (
    { sizes }: RenderImageProps,
    { photo, width, height }: RenderImageContext<ExtendedPhoto>
  ) => (
    <div className="flex flex-col items-center gap-3 p-3 bg-purple-100 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-800">{photo.title}</h3>
        {/* {photo.description && <p className="text-sm text-gray-500">{photo.description}</p>} */}
      </div>
      <div
        className="w-full overflow-hidden rounded-xl"
        style={{ position: 'relative', aspectRatio: `${width}/${height}` }}
      >
        <Image
          urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
          src={photo.src}
          alt={photo.alt || photo.title || 'Gallery image'}
          title={photo.title}
          fill
          sizes={sizes}
          className="object-contain transition-transform duration-300 hover:scale-105"
        />
      </div>
    </div>
  );

  return (
    
    <main className="min-h-screen bg-gray-50 py-10 px-4 lg:px-20">
       <Head>
        <title>Gallery</title>
        <meta name="description" content="Gallery of prudentia micro dental" />
      </Head>
      <h1 className="text-3xl py-15 font-bold text-center  text-gray-800">Our Gallery</h1>

      <RowsPhotoAlbum
        photos={photos}
        targetRowHeight={280}
        render={{ image: renderImage }}
        onClick={({ index }) => setIndex(index)}
        spacing={30}
        sizes={{
          size: 'calc(100vw - 64px)',
          sizes: [{ viewport: '(min-width: 1024px)', size: '1024px' }],
        }}
      />

      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        index={index}
        slides={photos.map(photo => ({
          src: `${process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}${photo.src}`,
          alt: photo.alt,
          width: photo.width,
          height: photo.height,
          description: photo.description,
          title: photo.title,
        }))}
        animation={{ swipe: 300 }}
      />
    </main>
  );
}
