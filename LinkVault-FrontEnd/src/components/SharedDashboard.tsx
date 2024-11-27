import { useState, useEffect } from "react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { CreateContentModal } from "../components/CreateContentModal";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { Sidebar } from "../components/Sidebar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useContent } from "../hooks/useContent";

export function SharedDashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const { contents, loading, error } = useContent();

  const handleShare = async () => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const response = await axios.post(
          `${BACKEND_URL}/api/v1/brain/share`,
          { share: true },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const shareUrl = `http://localhost:5173/share/${response.data.hash}`;
        alert(`Share your link: ${shareUrl}`);
      } catch (error) {
        console.error("Error sharing the brain:", error);
        alert("Failed to share your brain.");
      }
    } else {
      alert("Please login to share your brain.");
    }
  };

  return (
    <div>
      <Sidebar />
      <div className="p-4 ml-72 min-h-screen bg-gray-100 border-2">
        <CreateContentModal
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
          }}
        />

        <div className="flex justify-end gap-4">
          <Button
            onClick={() => {
              setModalOpen(true);
            }}
            variant="primary"
            text="Add Content"
            startIcon={<PlusIcon />}
          />

          <Button
            onClick={handleShare}
            variant="secondary"
            text="Share Brain"
            startIcon={<ShareIcon />}
          />
        </div>

        {/* Display loading and error messages */}
        {loading && <p>Loading content...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {/* Display the contents if available */}
        <div className="flex gap-4 flex-wrap">
          {contents.length > 0 ? (
            contents.map(({ type, link, title }) => (
              <Card key={title} type={type} link={link} title={title} />
            ))
          ) : (
            <p>No content available to display.</p>
          )}
        </div>
      </div>
    </div>
  );
}
