import { useState } from 'react';
import { useRouter } from 'next/router';

interface FertilizerData {
  cropType: string;
  soilType: string;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  ph: number;
}

interface FertilizerRecommendation {
  fertilizer: string;
  deficiency: string;
  application: string;
}

export default function FertilizerGuide() {
  const [formData, setFormData] = useState<FertilizerData>({
    cropType: '',
    soilType: 'Sandy',
    nitrogen: 0,
    phosphorus: 0,
    potassium: 0,
    ph: 6.5
  });
  const [isLoading, setIsLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<FertilizerRecommendation | null>(null);
  const router = useRouter();

  const cropTypes = [
    'Rice', 'Maize', 'Jute', 'Cotton', 'Coconut', 'Papaya', 'Orange', 
    'Apple', 'Muskmelon', 'Watermelon', 'Grapes', 'Mango', 'Banana', 
    'Pomegranate', 'Lentil', 'Blackgram', 'Mungbean', 'Mothbeans', 
    'Pigeonpeas', 'Kidneybeans', 'Chickpea', 'Coffee'
  ];

  const soilTypes = ['Sandy', 'Loamy', 'Black', 'Red', 'Clayey'];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'cropType' || name === 'soilType' ? value : parseFloat(value) || 0
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const response = await fetch(`${apiUrl}/fertilizer-recommend`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      setRecommendation(data);
    } catch (error) {
      console.error('Error:', error);
      setRecommendation({
        fertilizer: 'Error getting recommendation',
        deficiency: 'Please try again',
        application: 'Check your connection'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getFertilizerColor = (fertilizer: string) => {
    if (fertilizer.includes('NPK')) return 'bg-blue-100 text-blue-800';
    if (fertilizer.includes('Urea')) return 'bg-green-100 text-green-800';
    if (fertilizer.includes('DAP')) return 'bg-purple-100 text-purple-800';
    if (fertilizer.includes('20-20')) return 'bg-orange-100 text-orange-800';
    if (fertilizer.includes('28-28')) return 'bg-red-100 text-red-800';
    return 'bg-gray-100 text-gray-800';
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
              AI-Powered Agricultural Solutions
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Fertilizer Recommendation System
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get personalized fertilizer recommendations based on your crop type, soil conditions, and nutrient levels.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Crop & Soil Information</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Crop and Soil Selection */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Crop Type
                  </label>
                  <select
                    name="cropType"
                    value={formData.cropType}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select Crop</option>
                    {cropTypes.map((crop, index) => (
                      <option key={index} value={crop}>{crop}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Soil Type
                  </label>
                  <select
                    name="soilType"
                    value={formData.soilType}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    {soilTypes.map((soil, index) => (
                      <option key={index} value={soil}>{soil}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* N-P-K Values */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nitrogen (N)
                  </label>
                  <input
                    type="number"
                    name="nitrogen"
                    value={formData.nitrogen}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="0-140"
                    min="0"
                    max="140"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phosphorus (P)
                  </label>
                  <input
                    type="number"
                    name="phosphorus"
                    value={formData.phosphorus}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="5-145"
                    min="5"
                    max="145"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Potassium (K)
                  </label>
                  <input
                    type="number"
                    name="potassium"
                    value={formData.potassium}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="5-205"
                    min="5"
                    max="205"
                  />
                </div>
              </div>

              {/* Soil pH */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Soil pH
                </label>
                <input
                  type="number"
                  name="ph"
                  value={formData.ph}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="3.5-10"
                  min="3.5"
                  max="10"
                  step="0.1"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading || !formData.cropType}
                className={`w-full py-3 px-6 rounded-lg font-medium text-white transition-colors ${
                  isLoading || !formData.cropType
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500'
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Analyzing...</span>
                  </div>
                ) : (
                  'Get Fertilizer Recommendation'
                )}
              </button>
            </form>
          </div>

          {/* Results */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">AI Recommendation</h3>
            
            {recommendation ? (
              <div className="space-y-4">
                <div className={`p-4 rounded-lg border ${getFertilizerColor(recommendation.fertilizer || '')}`}>
                  <h4 className="font-medium mb-2">🌾 Recommended Fertilizer</h4>
                  <p className="font-semibold">{recommendation.fertilizer || 'No recommendation'}</p>
                </div>
                
                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <h4 className="font-medium text-yellow-900 mb-2">⚠️ Nutrient Deficiency</h4>
                  <p className="text-yellow-800">{recommendation.deficiency || 'No deficiency detected'}</p>
                </div>
                
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-medium text-blue-900 mb-2">📋 Application Method</h4>
                  <p className="text-blue-800">{recommendation.application || 'Follow package instructions'}</p>
                </div>

                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-medium text-green-900 mb-2">💡 Pro Tips</h4>
                  <ul className="text-green-800 text-sm space-y-1">
                    <li>• Apply fertilizer during active growth</li>
                    <li>• Water thoroughly after application</li>
                    <li>• Monitor plant response</li>
                    <li>• Adjust based on soil test results</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                <div className="text-4xl mb-4">🌱</div>
                <p>Enter your crop and soil data to get personalized fertilizer recommendations.</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => router.push("/")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
          >
            Disease Detection
          </button>
          <button
            onClick={() => router.push("/crop-recommendation")}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
          >
            Crop Recommendation
          </button>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>Enhanced FarmGuard - AI-Powered Agricultural Solutions</p>
          <p className="mt-1">Making Agriculture Smarter, One Field at a Time 🌱</p>
        </div>
      </div>
    </div>
  );
}
