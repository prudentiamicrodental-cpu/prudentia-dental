import { Image } from '@imagekit/next';
import { CheckCircleIcon } from 'lucide-react';
import Markdown from './markdown';

const ServiceCard = ({
  mainTitle,
  title,
  subtitle,
  description,
  features,
  tagline,
  image
}: {
  mainTitle: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  tagline: string;
  image: string;
}) => {

  return (
    <div className="group h-full overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:shadow-lg">
      {/* Image section */}
      <div className="relative h-70 w-full">
        <Image
          urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
          src={image}
          alt={title}
          fill
          className=" object-contain transition-transform duration-500 group-hover:scale-105"
          quality={90}
        />
        <div className="absolute inset-0 "></div>
        <div className="absolute bottom-4 left-4">
    
        </div>
      </div>

      {/* Content section */}
      <div className="p-6">
        <div className="mb-3 flex items-center gap-2">
          <div className="h-1 w-8 bg-blue-600"></div>
          <Markdown className="text-sm font-medium uppercase tracking-wider text-blue-600">
            {mainTitle}
          </Markdown>
        </div>
        
        <Markdown className="mb-2 text-xl font-bold text-gray-900">{title}</Markdown>
        
        <Markdown className="mb-3 text-lg font-semibold text-gray-700">{subtitle}</Markdown>
        
        <Markdown className="mb-4 text-gray-600">{description}</Markdown>
        
        <ul className="mb-6 space-y-2 text-gray-600">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <CheckCircleIcon className="mr-2 h-5 w-5 flex-shrink-0 text-blue-500" />
              <Markdown>{feature}</Markdown>
            </li>
          ))}
        </ul>
        
        <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0">
            <div className="border-4 w-full border-purple-600 border-solid ..."></div>  
        </div>
        
        <Markdown className="mt-4 text-sm  font-medium text-gray-500">{tagline}</Markdown>
      </div>
    </div>
  );
};

export default ServiceCard;