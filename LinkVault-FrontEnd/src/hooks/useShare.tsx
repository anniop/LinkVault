import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

export function useContent() {
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios
        .get(`${BACKEND_URL}/api/v1/content`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setContents(response.data.content);
          setLoading(false);
        })
        .catch((err) => {
          setError("Failed to load content");
          setLoading(false);
        });
    } else {
      setError("No token found, please log in.");
      setLoading(false);
    }
  }, []);

  return { contents, loading, error };
}
