import { useRef, useState } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import axios from "axios";
import { BACKEND_URL } from "../config";

enum ContentType {
  Youtube = "youtube",
  Twitter = "twitter"
}

export function CreateContentModal({ open, onClose }) {
  const titleRef = useRef<HTMLInputElement>();
  const linkRef = useRef<HTMLInputElement>();

  const [type, setType] = useState(ContentType.Youtube);

  async function addContent() {
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;

    await axios.post(`${BACKEND_URL}/api/v1/content`, {
      link,
      title,
      type
    }, {
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    })
    onClose();
  }

  return (
    <div>
      {open && (
        <div className="w-screen h-screen bg-slate-500 bg-opacity-75 fixed top-0 left-0 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="cursor-pointer text-gray-500 hover:text-gray-800 transition duration-300"
                aria-label="Close"
              >
                <CrossIcon />
              </button>
            </div>

            <h2 className="text-xl font-semibold text-center mb-4">Add Content</h2>

            <div className="space-y-4">
              <Input reference={titleRef} placeholder="Enter title" />
              <Input reference={linkRef} placeholder="Enter link" />
            </div>

            <div className="flex justify-center items-center mt-6 space-x-4">
              <h3 className="text-gray-700">Type:</h3>
              <Button
                text="Youtube"
                variant={type === ContentType.Youtube ? "primary" : "secondary"}
                onClick={() => setType(ContentType.Youtube)}
                className={`py-2 px-4 rounded-lg ${type === ContentType.Youtube ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
                  }`}
              />
              <Button
                text="Twitter"
                variant={type === ContentType.Twitter ? "primary" : "secondary"}
                onClick={() => setType(ContentType.Twitter)}
                className={`py-2 px-4 rounded-lg ${type === ContentType.Twitter ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
                  }`}
              />
            </div>

            <div className="flex justify-center mt-8">
              <Button
                onClick={addContent}
                text="Submit"
                variant="primary"
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


