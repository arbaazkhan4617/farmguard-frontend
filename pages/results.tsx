import { useRouter } from "next/router";

export default function ResultPage() {
  const router = useRouter();
  const data = router.query.data ? JSON.parse(router.query.data as string) : null;

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <p>No result data found. Please go back and upload an image.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="bg-gray-800 text-white p-8 rounded-2xl shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold mb-6 text-center">Disease Detection Result</h1>

        <div className="space-y-4">
          <div>
            <p className="text-gray-400 text-sm">Disease</p>
            <p className="text-lg font-semibold capitalize">{data.result?.label || 'Unknown'}</p>
          </div>

          <div>
            <p className="text-gray-400 text-sm">Confidence</p>
            <p className="text-lg font-semibold">{((data.result?.confidence || 0) * 100).toFixed(1)}%</p>
          </div>

          <div>
            <p className="text-gray-400 text-sm">Advice</p>
            <p className="text-lg">{data.result?.advice || 'No advice available'}</p>
          </div>

          <div className="text-center">
            <img 
              src={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/uploads/${data.image_url.split('/').pop()}`} 
              alt="Uploaded plant" 
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>
        </div>

        <button
          onClick={() => router.push("/")}
          className="mt-8 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-medium"
        >
          Upload Another Image
        </button>
      </div>
    </div>
  );
}

