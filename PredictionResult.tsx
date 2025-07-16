
'use client';

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

interface PredictionResultProps {
  prediction: PredictionData;
  carInfo: {
    make: string;
    model: string;
    year: number;
  };
}

export default function PredictionResult({ prediction, carInfo }: PredictionResultProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 85) return 'text-emerald-700 bg-emerald-50 border-emerald-200';
    if (confidence >= 70) return 'text-amber-700 bg-amber-50 border-amber-200';
    return 'text-red-700 bg-red-50 border-red-200';
  };

  const getFactorColor = (value: number) => {
    if (value > 0) return 'text-emerald-600';
    if (value < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  const getFactorIcon = (value: number) => {
    if (value > 0) return 'ri-arrow-up-line';
    if (value < 0) return 'ri-arrow-down-line';
    return 'ri-subtract-line';
  };

  const getFactorBg = (value: number) => {
    if (value > 0) return 'bg-emerald-50';
    if (value < 0) return 'bg-red-50';
    return 'bg-gray-50';
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 lg:p-12 border border-white/50 space-y-8">
      {/* Header */}
      <div className="text-center pb-6 border-b border-gray-200">
        <div className="inline-flex items-center bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
          <div className="w-4 h-4 flex items-center justify-center mr-2">
            <i className="ri-check-line"></i>
          </div>
          Analysis Complete
        </div>
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-2">Price Prediction</h2>
        <p className="text-xl text-gray-600">{carInfo.year} {carInfo.make} {carInfo.model}</p>
      </div>

      {/* Main Price Display */}
      <div className="text-center py-8">
        <div className="inline-block bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 border-2 border-blue-100">
          <div className="text-6xl lg:text-7xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            {formatPrice(prediction.predictedPrice)}
          </div>
          <div className="text-lg text-gray-600 mb-6">
            Estimated Range: <span className="font-semibold">{formatPrice(prediction.priceRange.min)} - {formatPrice(prediction.priceRange.max)}</span>
          </div>
          <div className={`inline-flex items-center px-6 py-3 rounded-full text-lg font-semibold border-2 ${getConfidenceColor(prediction.confidence)}`}>
            <div className="w-5 h-5 flex items-center justify-center mr-3">
              <i className="ri-shield-check-line"></i>
            </div>
            {prediction.confidence}% Confidence Score
          </div>
        </div>
      </div>

      {/* Detailed Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Price Factors */}
        <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-2xl p-6 border border-gray-200">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
              <i className="ri-bar-chart-line text-blue-600"></i>
            </div>
            Price Factors
          </h3>
          <div className="space-y-4">
            <div className={`flex items-center justify-between p-4 rounded-xl ${getFactorBg(prediction.factors.depreciation)} border border-gray-200`}>
              <div className="flex items-center">
                <div className="w-10 h-10 flex items-center justify-center mr-4 bg-white rounded-lg shadow-sm">
                  <i className={`${getFactorIcon(prediction.factors.depreciation)} ${getFactorColor(prediction.factors.depreciation)} text-lg`}></i>
                </div>
                <span className="font-medium text-gray-800">Age Depreciation</span>
              </div>
              <span className={`text-lg font-bold ${getFactorColor(prediction.factors.depreciation)}`}>
                {prediction.factors.depreciation > 0 ? '+' : ''}{prediction.factors.depreciation}%
              </span>
            </div>

            <div className={`flex items-center justify-between p-4 rounded-xl ${getFactorBg(prediction.factors.mileage)} border border-gray-200`}>
              <div className="flex items-center">
                <div className="w-10 h-10 flex items-center justify-center mr-4 bg-white rounded-lg shadow-sm">
                  <i className={`${getFactorIcon(prediction.factors.mileage)} ${getFactorColor(prediction.factors.mileage)} text-lg`}></i>
                </div>
                <span className="font-medium text-gray-800">Mileage Impact</span>
              </div>
              <span className={`text-lg font-bold ${getFactorColor(prediction.factors.mileage)}`}>
                {prediction.factors.mileage > 0 ? '+' : ''}{prediction.factors.mileage}%
              </span>
            </div>

            <div className={`flex items-center justify-between p-4 rounded-xl ${getFactorBg(prediction.factors.condition)} border border-gray-200`}>
              <div className="flex items-center">
                <div className="w-10 h-10 flex items-center justify-center mr-4 bg-white rounded-lg shadow-sm">
                  <i className={`${getFactorIcon(prediction.factors.condition)} ${getFactorColor(prediction.factors.condition)} text-lg`}></i>
                </div>
                <span className="font-medium text-gray-800">Condition Factor</span>
              </div>
              <span className={`text-lg font-bold ${getFactorColor(prediction.factors.condition)}`}>
                {prediction.factors.condition > 0 ? '+' : ''}{prediction.factors.condition}%
              </span>
            </div>

            <div className={`flex items-center justify-between p-4 rounded-xl ${getFactorBg(prediction.factors.market)} border border-gray-200`}>
              <div className="flex items-center">
                <div className="w-10 h-10 flex items-center justify-center mr-4 bg-white rounded-lg shadow-sm">
                  <i className={`${getFactorIcon(prediction.factors.market)} ${getFactorColor(prediction.factors.market)} text-lg`}></i>
                </div>
                <span className="font-medium text-gray-800">Market Trend</span>
              </div>
              <span className={`text-lg font-bold ${getFactorColor(prediction.factors.market)}`}>
                {prediction.factors.market > 0 ? '+' : ''}{prediction.factors.market}%
              </span>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-200">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
              <i className="ri-lightbulb-line text-purple-600"></i>
            </div>
            AI Recommendations
          </h3>
          <div className="space-y-4">
            <div className="flex items-start p-4 bg-white/70 rounded-xl border border-white/50">
              <div className="w-10 h-10 flex items-center justify-center mr-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                <i className="ri-thumb-up-line text-white"></i>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Market Analysis</h4>
                <p className="text-sm text-gray-600">
                  Based on current market trends, this is a competitive price estimate for your vehicle.
                </p>
              </div>
            </div>
            
            <div className="flex items-start p-4 bg-white/70 rounded-xl border border-white/50">
              <div className="w-10 h-10 flex items-center justify-center mr-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
                <i className="ri-search-eye-line text-white"></i>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Inspection Advice</h4>
                <p className="text-sm text-gray-600">
                  Consider getting a professional inspection to verify the actual condition before finalizing.
                </p>
              </div>
            </div>
            
            <div className="flex items-start p-4 bg-white/70 rounded-xl border border-white/50">
              <div className="w-10 h-10 flex items-center justify-center mr-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg">
                <i className="ri-line-chart-line text-white"></i>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Price Comparison</h4>
                <p className="text-sm text-gray-600">
                  Compare with similar listings in your area to validate this prediction and negotiate effectively.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 pt-6">
        <button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-2xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 whitespace-nowrap cursor-pointer">
          <div className="w-5 h-5 flex items-center justify-center mr-2 inline-block">
            <i className="ri-save-line"></i>
          </div>
          Save Analysis
        </button>
        <button className="flex-1 bg-white text-gray-700 py-4 px-6 rounded-2xl font-semibold hover:bg-gray-50 transition-all duration-300 border-2 border-gray-200 hover:border-gray-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 whitespace-nowrap cursor-pointer">
          <div className="w-5 h-5 flex items-center justify-center mr-2 inline-block">
            <i className="ri-share-line"></i>
          </div>
          Share Results
        </button>
        <button className="flex-1 bg-gradient-to-r from-emerald-600 to-green-600 text-white py-4 px-6 rounded-2xl font-semibold hover:from-emerald-700 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 whitespace-nowrap cursor-pointer">
          <div className="w-5 h-5 flex items-center justify-center mr-2 inline-block">
            <i className="ri-download-line"></i>
          </div>
          Export PDF
        </button>
      </div>
    </div>
  );
}
