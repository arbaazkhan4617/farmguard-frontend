import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();

  const handleUpload = async () => {
    if (!file) return alert("Please select an image first");
    const formData = new FormData();
    formData.append("file", file);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const res = await axios.post(`${apiUrl}/detect`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      router.push({
        pathname: "/results",
        query: { data: JSON.stringify(res.data) }
      });
    } catch (err) {
      console.error(err);
      alert("Error uploading image");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-4">
      <h1 className="text-4xl font-bold mb-8">FarmGuard</h1>

      <div className="flex gap-4">
        <input
          type="file"
          onChange={e => setFile(e.target.files?.[0] || null)}
          className="block text-sm text-gray-300
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-full file:border-0
                     file:text-sm file:font-semibold
                     file:bg-green-500 file:text-white
                     hover:file:bg-green-600"
        />
        <button
          onClick={handleUpload}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium"
        >
          Detect Disease
        </button>
      </div>
    </div>
  );
}

