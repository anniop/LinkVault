import { ReactElement, useState } from "react";

// SidebarItem Component
export function SidebarItem({
  text,
  icon,
  onClick,
}: {
  text: string;
  icon: ReactElement;
  onClick: () => void;
}) {
  return (
    <div
      className="flex items-center text-gray-700 py-3 px-4 cursor-pointer hover:bg-gray-200 hover:text-gray-900 rounded-lg transition-all duration-200"
      onClick={onClick}
    >
      <div className="pr-3 text-lg">{icon}</div>
      <div className="font-medium text-base truncate">{text}</div>
    </div>
  );
}

// Parent Component to manage the state and content
export function Sidebar() {
  const [selected, setSelected] = useState<string>("");

  // Handler to set the active link
  const handleSidebarItemClick = (platform: string) => {
    setSelected(platform);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-4">
        <SidebarItem
          text="YouTube"
          icon={<span role="img" aria-label="youtube">📺</span>}
          onClick={() => handleSidebarItemClick("youtube")}
        />
        <SidebarItem
          text="Twitter"
          icon={<span role="img" aria-label="twitter">🐦</span>}
          onClick={() => handleSidebarItemClick("twitter")}
        />
      </div>

      {/* Content */}
      <div className="flex-grow p-4">
        {selected === "youtube" && (
          <div>
            <h2>YouTube Content</h2>
            {/* Replace with actual YouTube links/content */}
            <ul>
              <li><a href="https://youtube.com" target="_blank" rel="noopener noreferrer">YouTube Link 1</a></li>
              <li><a href="https://youtube.com" target="_blank" rel="noopener noreferrer">YouTube Link 2</a></li>
            </ul>
          </div>
        )}

        {selected === "twitter" && (
          <div>
            <h2>Twitter Content</h2>
            {/* Replace with actual Twitter content */}
            <ul>
              <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter Link 1</a></li>
              <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter Link 2</a></li>
            </ul>
          </div>
        )}

        {/* Display a message if no platform is selected */}
        {selected === "" && <p>Select a platform to view content.</p>}
      </div>
    </div>
  );
}

