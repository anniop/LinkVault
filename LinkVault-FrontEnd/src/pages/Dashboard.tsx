import { useEffect, useState } from 'react';
import '../App.css';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { CreateContentModal } from '../components/CreateContentModal';
import { PlusIcon } from '../icons/PlusIcon';
import { ShareIcon } from '../icons/ShareIcon';
import { Sidebar } from '../components/Sidebar';
import { useContent } from '../hooks/useContent';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import { LogoutButton } from '../components/LogoutButton';

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const { contents, refresh } = useContent();

  useEffect(() => {
    refresh();
  }, [modalOpen]);

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-4 ml-72 min-h-screen bg-gray-100 border-2 w-full">
        <CreateContentModal open={modalOpen} onClose={() => setModalOpen(false)} />

        <div className="flex justify-between items-center mb-6">
          <Button
            onClick={() => setModalOpen(true)}
            variant="primary"
            text="Add Content"
            startIcon={<PlusIcon />}
          />

          <Button
            onClick={async () => {
              try {
                const response = await axios.post(
                  `${BACKEND_URL}/api/v1/brain/share`,
                  { share: true },
                  {
                    headers: {
                      Authorization: localStorage.getItem('token')
                    }
                  }
                );
                const shareurl = `http://localhost:5173/share/${response.data.hash}`;
                alert(shareurl);
              } catch (error) {
                console.error('Error sharing brain:', error);
                alert('Failed to share the brain.');
              }
            }}
            variant="secondary"
            text="Share Brain"
            startIcon={<ShareIcon />}
          />
        </div>

        <div className="flex justify-end mb-6">
          <LogoutButton />         </div>

        <div className="flex gap-4 flex-wrap">
          {contents.map(({ type, link, title }) => (
            <Card type={type} link={link} title={title} key={title} />
          ))}
        </div>
      </div>
    </div>
  );
}

