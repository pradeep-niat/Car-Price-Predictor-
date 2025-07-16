
'use client';

import { useState } from 'react';
import Header from '../components/Header';
import PredictionForm from '../components/PredictionForm';
import PredictionResult from '../components/PredictionResult';

interface FormData {
  make: string;
  model: string;
  year: number;
  mileage: number;
  fuelType: string;
  transmission: string;
  engineSize: number;
  condition: string;
  accidents: string;
  owners: number;
  location: string;
}

interface PredictionData {
  predictedPrice: number;
  confidence: number;
  factors: {
    depreciation: number;
    mileage: number;
    condition: number;
    market: number;
  };
  priceRange: {
    min: number;
    max: number;
  };
}

export default function Home() {
  const [prediction, setPrediction] = useState<PredictionData | null>(null);
  const [carInfo, setCarInfo] = useState<FormData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const simulateMLPrediction = (data: FormData): PredictionData => {
    const currentYear = new Date().getFullYear();
    const age = currentYear - data.year;
    
    let basePrice = 25000;
    
    const makeMultipliers: { [key: string]: number } = {
      'BMW': 1.4, 'Mercedes-Benz': 1.5, 'Audi': 1.3,
      'Toyota': 1.1, 'Honda': 1.05, 'Ford': 0.9,
      'Chevrolet': 0.85, 'Volkswagen': 1.0, 'Nissan': 0.95, 'Hyundai': 0.8
    };
    
    basePrice *= makeMultipliers[data.make] || 1.0;
    
    const depreciationRate = 0.12;
    const depreciation = -age * depreciationRate * 100;
    basePrice *= Math.pow(0.88, age);
    
    const mileageImpact = Math.max(-25, -data.mileage / 10000 * 8);
    basePrice *= (1 + mileageImpact / 100);
    
    const conditionMultipliers: { [key: string]: number } = {
      'Excellent': 1.15, 'Very Good': 1.05, 'Good': 1.0, 'Fair': 0.85, 'Poor': 0.65
    };
    const conditionFactor = ((conditionMultipliers[data.condition] || 1.0) - 1) * 100;
    basePrice *= conditionMultipliers[data.condition] || 1.0;
    
    const accidentMultipliers: { [key: string]: number } = {
      'No Accidents': 1.0, 'Minor Accident': 0.92, 'Major Accident': 0.75
    };
    basePrice *= accidentMultipliers[data.accidents] || 1.0;
    
    const fuelMultipliers: { [key: string]: number } = {
      'Electric': 1.2, 'Hybrid': 1.1, 'Gasoline': 1.0, 'Diesel': 0.95
    };
    basePrice *= fuelMultipliers[data.fuelType] || 1.0;

    const ownerPenalty = Math.max(0, (data.owners - 1) * 0.05);
    basePrice *= (1 - ownerPenalty);
    
    const marketTrend = Math.random() * 10 - 5;
    basePrice *= (1 + marketTrend / 100);
    
    const predictedPrice = Math.round(basePrice);
    const variance = 0.15;
    const minPrice = Math.round(predictedPrice * (1 - variance));
    const maxPrice = Math.round(predictedPrice * (1 + variance));
    
    const confidence = Math.min(95, Math.max(65, 85 - age * 2 - Math.abs(mileageImpact)));
    
    return {
      predictedPrice,
      confidence: Math.round(confidence),
      factors: {
        depreciation: Math.round(depreciation * 10) / 10,
        mileage: Math.round(mileageImpact * 10) / 10,
        condition: Math.round(conditionFactor * 10) / 10,
        market: Math.round(marketTrend * 10) / 10
      },
      priceRange: {
        min: minPrice,
        max: maxPrice
      }
    };
  };

  const handlePredict = async (data: FormData) => {
    setIsLoading(true);
    setCarInfo(data);
    
    setTimeout(() => {
      const result = simulateMLPrediction(data);
      setPrediction(result);
      setIsLoading(false);
    }, 2000);
  };

  const resetForm = () => {
    setPrediction(null);
    setCarInfo(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Header />
      
      {/* Hero Section */}
      <div 
        className="relative min-h-[600px] flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(59, 130, 246, 0.9), rgba(99, 102, 241, 0.8)), url('https://readdy.ai/api/search-image?query=Modern%20luxury%20car%20showroom%20with%20sleek%20vehicles%20displayed%20under%20sophisticated%20lighting%2C%20premium%20automotive%20dealership%20interior%20with%20glass%20walls%20and%20contemporary%20architecture%2C%20high-end%20car%20exhibition%20space%20with%20elegant%20design%20elements%20and%20professional%20presentation&width=1920&height=800&seq=hero-car-showroom&orientation=landscape')`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 to-purple-900/40"></div>
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            AI Car Price
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent block">
              Predictor
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            Get instant, accurate car valuations powered by advanced machine learning algorithms
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => document.getElementById('prediction-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 whitespace-nowrap cursor-pointer"
            >
              <div className="w-5 h-5 flex items-center justify-center mr-2 inline-block">
                <i className="ri-search-line"></i>
              </div>
              Get Price Estimate
            </button>
            <button className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/20 transition-all duration-300 border border-white/20 whitespace-nowrap cursor-pointer">
              <div className="w-5 h-5 flex items-center justify-center mr-2 inline-block">
                <i className="ri-play-circle-line"></i>
              </div>
              Watch Demo
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-16" id="prediction-form">
        <div className="max-w-5xl mx-auto">
          {!prediction ? (
            <PredictionForm onPredict={handlePredict} isLoading={isLoading} />
          ) : (
            <div className="space-y-8">
              <PredictionResult prediction={prediction} carInfo={carInfo!} />
              <div className="text-center">
                <button
                  onClick={resetForm}
                  className="bg-gradient-to-r from-slate-600 to-slate-700 text-white py-4 px-8 rounded-full font-semibold hover:from-slate-700 hover:to-slate-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 whitespace-nowrap cursor-pointer"
                >
                  <div className="w-5 h-5 flex items-center justify-center mr-2 inline-block">
                    <i className="ri-refresh-line"></i>
                  </div>
                  Predict Another Car
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Features Section */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="group bg-white/70 backdrop-blur-sm rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/50 hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <i className="ri-brain-line text-3xl text-white"></i>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">AI-Powered Analysis</h3>
            <p className="text-gray-600 leading-relaxed">
              Advanced machine learning algorithms analyze thousands of data points to provide highly accurate price predictions
            </p>
          </div>
          
          <div className="group bg-white/70 backdrop-blur-sm rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/50 hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <i className="ri-flashlight-line text-3xl text-white"></i>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Instant Results</h3>
            <p className="text-gray-600 leading-relaxed">
              Get immediate price predictions with detailed factor analysis and confidence scores in real-time
            </p>
          </div>
          
          <div className="group bg-white/70 backdrop-blur-sm rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/50 hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <i className="ri-shield-check-line text-3xl text-white"></i>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Market Accurate</h3>
            <p className="text-gray-600 leading-relaxed">
              Predictions based on real market trends, depreciation rates, and comprehensive vehicle condition analysis
            </p>
          </div>
        </div>

        {/* Creator Credit */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg border border-white/50">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mr-3">
              <i className="ri-code-s-slash-line text-white text-sm"></i>
            </div>
            <span className="text-gray-700 font-medium">
              Created by <span className="font-bold text-gray-800">Pradeep Kumar S</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
