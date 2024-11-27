import { FaShareAlt } from 'react-icons/fa'; // Importing a share icon from react-icons
import { FaLink } from 'react-icons/fa';  // Importing a link icon from react-icons

interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube";
}

export function Card({ title, link, type }: CardProps) {
  return (
    <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="flex justify-between items-center text-lg font-semibold text-gray-800 mb-4">
        <div className="flex items-center space-x-2 text-gray-600">
          <FaShareAlt className="w-5 h-5" /> {/* Replace ShareIcon with FaShareAlt */}
          <span>{title}</span>
        </div>
        <div className="flex items-center space-x-3">
          <a href={link} target="_blank" rel="noopener noreferrer">
            <FaLink className="w-5 h-5 text-blue-500 hover:text-blue-700 transition-colors duration-300" /> {/* Replace ShareIcon with FaLink */}
          </a>
          <div className="text-gray-400 hover:text-gray-600">
            <FaShareAlt className="w-5 h-5" /> {/* Replace ShareIcon with FaShareAlt */}
          </div>
        </div>
      </div>
      <div className="pt-4">
        {type === "youtube" && (
          <iframe
            className="w-full h-64 rounded-md shadow-md"
            src={link.replace("watch", "embed").replace("?v=", "/")}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        )}
        {type === "twitter" && (
          <blockquote className="twitter-tweet">
            <a href={link.replace("x.com", "twitter.com")}></a>
          </blockquote>
        )}
      </div>
    </div>
  );
}

