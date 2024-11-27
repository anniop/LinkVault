import { useState, useEffect } from "react";
import { Logo } from "../icons/Logo";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { SidebarItem } from "./Sidebaritem";
import { useContent } from "../hooks/useContent"; // Import useContent hook

export function Sidebar() {
  // State to track the selected platform
  const [selectedPlatform, setSelectedPlatform] = useState<string>("");

  // Fetch content data from useContent hook
  const { contents, loading, error } = useContent();

  const handlePlatformChange = (platform: string) => {
    setSelectedPlatform(platform);
  };

  // Filter content based on the selected platform
  const filteredContent = contents.filter(
    (content) => content.type.toLowerCase() === selectedPlatform.toLowerCase()
  );

  return (
    <div className="h-screen bg-white border-r w-72 fixed left-0 top-0 pl-6 shadow-md">
      {/* Sidebar Header */}
      <div className="flex items-center text-2xl font-semibold pt-8">
        <div className="pr-2 text-purple-600">
          <Logo />
        </div>
        <span className="text-gray-800">LinkVault</span>
      </div>

      {/* Sidebar Items */}
      <div className="pt-8">
        <SidebarItem
          text="Twitter"
          icon={<TwitterIcon />}
          onClick={() => handlePlatformChange("twitter")}
          className="hover:bg-purple-100 hover:text-purple-600 rounded-lg p-3 transition-all duration-300"
        />
        <SidebarItem
          text="Youtube"
          icon={<YoutubeIcon />}
          onClick={() => handlePlatformChange("youtube")}
          className="hover:bg-purple-100 hover:text-purple-600 rounded-lg p-3 transition-all duration-300"
        />
      </div>

      {/* Content Section (conditionally rendered based on selected platform) */}
      <div className="pt-8 pl-6">
        {loading && <p>Loading content...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {selectedPlatform === "twitter" && (
          <div>
            <h2 className="text-lg font-semibold">Twitter Links</h2>
            {filteredContent.length > 0 ? (
              <ul>
                {filteredContent.map(({ title, link }, index) => (
                  <li key={index} className="py-2">
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {title}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No content available for Twitter.</p>
            )}
          </div>
        )}

        {selectedPlatform === "youtube" && (
          <div>
            <h2 className="text-lg font-semibold">YouTube Links</h2>
            {filteredContent.length > 0 ? (
              <ul>
                {filteredContent.map(({ title, link }, index) => (
                  <li key={index} className="py-2">
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {title}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No content available for YouTube.</p>
            )}
          </div>
        )}

        {/* Default Message */}
        {selectedPlatform === "" && (
          <p className="text-gray-600">Please select a platform to view content.</p>
        )}
      </div>
    </div>
  );
}


