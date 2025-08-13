import { useRouter } from "next/router";

export default function ResultPage() {
  const router = useRouter();
  const data = router.query.data ? JSON.parse(router.query.data as string) : null;

  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-green-100 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No Results Found</h2>
          <p className="text-gray-600 mb-6">
            No result data found. Please go back and upload an image for disease detection.
          </p>
          <button
            onClick={() => router.push("/")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Upload New Image
          </button>
        </div>
      </div>
    );
  }

  const getDiseaseColor = (label: string) => {
    if (label === 'healthy') return 'text-green-600 bg-green-100';
    if (label.includes('blight')) return 'text-red-600 bg-red-100';
    if (label.includes('rust')) return 'text-orange-600 bg-orange-100';
    if (label.includes('mildew')) return 'text-purple-600 bg-purple-100';
    return 'text-gray-600 bg-gray-100';
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence > 0.8) return 'text-green-600';
    if (confidence > 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getConfidenceBarColor = (confidence: number) => {
    if (confidence > 0.8) return '#10b981'; // green-500
    if (confidence > 0.6) return '#d97706'; // yellow-600
    return '#dc2626'; // red-600
  };

  const getAdviceIcon = (label: string) => {
    if (label === 'healthy') return '🌱';
    if (label.includes('blight')) return '🦠';
    if (label.includes('rust')) return '🟠';
    if (label.includes('mildew')) return '🍄';
    return '💡';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-green-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl font-bold">🌱</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">FarmGuard</h1>
            </div>
            <div className="text-sm text-gray-600">
              AI-Powered Plant Disease Detection
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Disease Detection Results</h2>
          <p className="text-gray-600">AI analysis completed successfully</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Results Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Analysis Results</h3>
            
            <div className="space-y-6">
              {/* Disease Type */}
              <div>
                <label className="text-sm font-medium text-gray-500 block mb-2">
                  Detected Condition
                </label>
                <div className={`inline-flex items-center px-3 py-2 rounded-full text-sm font-medium ${getDiseaseColor(data.result?.label || 'unknown')}`}>
                  {data.result?.label ? data.result.label.replace(/_/g, ' ').toUpperCase() : 'UNKNOWN'}
                </div>
              </div>

              {/* Confidence Score */}
              <div>
                <label className="text-sm font-medium text-gray-500 block mb-2">
                  AI Confidence Score
                </label>
                <div className="space-y-3">
                  {/* Progress Bar */}
                  <div className="flex items-center space-x-3">
                    <div className="flex-1 bg-gray-200 rounded-full h-4 overflow-hidden">
                      <div 
                        className="h-4 rounded-full transition-all duration-700 ease-out"
                        style={{ 
                          width: `${Math.max((data.result?.confidence || 0) * 100, 5)}%`,
                          backgroundColor: getConfidenceBarColor(data.result?.confidence || 0)
                        }}
                      ></div>
                    </div>
                    <span className={`text-lg font-semibold min-w-[4rem] text-right ${getConfidenceColor(data.result?.confidence || 0)}`}>
                      {((data.result?.confidence || 0) * 100).toFixed(1)}%
                    </span>
                  </div>
                  
                  {/* Confidence Level Indicator */}
                  <div className="text-center">
                    <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                      (data.result?.confidence || 0) > 0.8 ? 'bg-green-100 text-green-800' :
                      (data.result?.confidence || 0) > 0.6 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {((data.result?.confidence || 0) > 0.8 ? 'High' : 
                        (data.result?.confidence || 0) > 0.6 ? 'Medium' : 'Low')} Confidence
                    </span>
                  </div>
                </div>
              </div>

              {/* Timestamp */}
              <div>
                <label className="text-sm font-medium text-gray-500 block mb-2">
                  Analysis Time
                </label>
                <p className="text-gray-900">
                  {new Date(data.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* Advice Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Expert Recommendations</h3>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="text-2xl">{getAdviceIcon(data.result?.label || 'unknown')}</div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Treatment Advice</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {data.result?.advice || 'No specific treatment advice available for this condition. Please consult with a local agricultural expert for personalized recommendations.'}
                  </p>
                </div>
              </div>

              {/* Additional Tips */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h5 className="font-medium text-blue-900 mb-2">💡 Pro Tips</h5>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Take photos in good lighting for better accuracy</li>
                  <li>• Include both healthy and affected areas in your photos</li>
                  <li>• Monitor your plants regularly for early detection</li>
                  <li>• Consider preventive measures for future protection</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Image Display */}
        <div className="mt-8 bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">Analyzed Image</h3>
          <div className="max-w-md mx-auto">
            <img 
              src={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/uploads/${data.image_url.split('/').pop()}`} 
              alt="Uploaded plant for analysis" 
              className="w-full h-64 object-cover rounded-xl shadow-lg"
            />
            <p className="text-center text-sm text-gray-500 mt-3">
              Image analyzed by FarmGuard AI
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => router.push("/")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
          >
            Analyze Another Image
          </button>
          <button
            onClick={() => window.open('https://github.com/arbaazkhan4617/farmguard-frontend', '_blank')}
            className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
          >
            View Source Code
          </button>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>Built for The Syrotech MVP Hackathon 2025</p>
          <p className="mt-1">Making Agriculture Smarter, One Plant at a Time 🌱</p>
        </div>
      </div>
    </div>
  );
}

