
'use client';

import { useState } from 'react';

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

interface PredictionFormProps {
  onPredict: (data: FormData) => void;
  isLoading: boolean;
}

export default function PredictionForm({ onPredict, isLoading }: PredictionFormProps) {
  const [formData, setFormData] = useState<FormData>({
    make: '',
    model: '',
    year: new Date().getFullYear(),
    mileage: 0,
    fuelType: '',
    transmission: '',
    engineSize: 2.0,
    condition: '',
    accidents: '',
    owners: 1,
    location: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPredict(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'year' || name === 'mileage' || name === 'owners' || name === 'engineSize' 
        ? Number(value) 
        : value
    }));
  };

  const carMakes = ['Toyota', 'Honda', 'Ford', 'Chevrolet', 'BMW', 'Mercedes-Benz', 'Audi', 'Volkswagen', 'Nissan', 'Hyundai'];
  const fuelTypes = ['Gasoline', 'Diesel', 'Hybrid', 'Electric'];
  const transmissionTypes = ['Manual', 'Automatic', 'CVT'];
  const conditions = ['Excellent', 'Very Good', 'Good', 'Fair', 'Poor'];
  const accidentHistory = ['No Accidents', 'Minor Accident', 'Major Accident'];
  const locations = ['Urban', 'Suburban', 'Rural'];

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 lg:p-12 border border-white/50">
      <div className="text-center mb-8">
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-3">Car Details</h2>
        <p className="text-gray-600 text-lg">Fill in your car information for accurate pricing</p>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto mt-4"></div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 mb-3">Make</label>
            <div className="relative group">
              <select 
                name="make" 
                value={formData.make} 
                onChange={handleChange}
                className="w-full px-5 py-4 bg-white/70 backdrop-blur-sm border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-sm pr-12 cursor-pointer hover:border-gray-300 group-hover:shadow-md"
                required
              >
                <option value="">Select Make</option>
                {carMakes.map(make => (
                  <option key={make} value={make}>{make}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                <i className="ri-arrow-down-s-line text-gray-400 text-lg"></i>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 mb-3">Model</label>
            <input
              type="text"
              name="model"
              value={formData.model}
              onChange={handleChange}
              placeholder="Enter model"
              className="w-full px-5 py-4 bg-white/70 backdrop-blur-sm border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-sm hover:border-gray-300 hover:shadow-md"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 mb-3">Year</label>
            <input
              type="number"
              name="year"
              value={formData.year}
              onChange={handleChange}
              min="1990"
              max={new Date().getFullYear()}
              className="w-full px-5 py-4 bg-white/70 backdrop-blur-sm border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-sm hover:border-gray-300 hover:shadow-md"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 mb-3">Mileage (miles)</label>
            <input
              type="number"
              name="mileage"
              value={formData.mileage}
              onChange={handleChange}
              min="0"
              placeholder="Enter mileage"
              className="w-full px-5 py-4 bg-white/70 backdrop-blur-sm border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-sm hover:border-gray-300 hover:shadow-md"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 mb-3">Fuel Type</label>
            <div className="relative group">
              <select 
                name="fuelType" 
                value={formData.fuelType} 
                onChange={handleChange}
                className="w-full px-5 py-4 bg-white/70 backdrop-blur-sm border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-sm pr-12 cursor-pointer hover:border-gray-300 group-hover:shadow-md"
                required
              >
                <option value="">Select Fuel Type</option>
                {fuelTypes.map(fuel => (
                  <option key={fuel} value={fuel}>{fuel}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                <i className="ri-arrow-down-s-line text-gray-400 text-lg"></i>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 mb-3">Transmission</label>
            <div className="relative group">
              <select 
                name="transmission" 
                value={formData.transmission} 
                onChange={handleChange}
                className="w-full px-5 py-4 bg-white/70 backdrop-blur-sm border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-sm pr-12 cursor-pointer hover:border-gray-300 group-hover:shadow-md"
                required
              >
                <option value="">Select Transmission</option>
                {transmissionTypes.map(trans => (
                  <option key={trans} value={trans}>{trans}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                <i className="ri-arrow-down-s-line text-gray-400 text-lg"></i>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 mb-3">Engine Size (L)</label>
            <input
              type="number"
              name="engineSize"
              value={formData.engineSize}
              onChange={handleChange}
              min="1.0"
              max="8.0"
              step="0.1"
              className="w-full px-5 py-4 bg-white/70 backdrop-blur-sm border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-sm hover:border-gray-300 hover:shadow-md"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 mb-3">Condition</label>
            <div className="relative group">
              <select 
                name="condition" 
                value={formData.condition} 
                onChange={handleChange}
                className="w-full px-5 py-4 bg-white/70 backdrop-blur-sm border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-sm pr-12 cursor-pointer hover:border-gray-300 group-hover:shadow-md"
                required
              >
                <option value="">Select Condition</option>
                {conditions.map(condition => (
                  <option key={condition} value={condition}>{condition}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                <i className="ri-arrow-down-s-line text-gray-400 text-lg"></i>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 mb-3">Accident History</label>
            <div className="relative group">
              <select 
                name="accidents" 
                value={formData.accidents} 
                onChange={handleChange}
                className="w-full px-5 py-4 bg-white/70 backdrop-blur-sm border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-sm pr-12 cursor-pointer hover:border-gray-300 group-hover:shadow-md"
                required
              >
                <option value="">Select History</option>
                {accidentHistory.map(history => (
                  <option key={history} value={history}>{history}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                <i className="ri-arrow-down-s-line text-gray-400 text-lg"></i>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 mb-3">Previous Owners</label>
            <input
              type="number"
              name="owners"
              value={formData.owners}
              onChange={handleChange}
              min="1"
              max="10"
              className="w-full px-5 py-4 bg-white/70 backdrop-blur-sm border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-sm hover:border-gray-300 hover:shadow-md"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 mb-3">Location Type</label>
            <div className="relative group">
              <select 
                name="location" 
                value={formData.location} 
                onChange={handleChange}
                className="w-full px-5 py-4 bg-white/70 backdrop-blur-sm border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-sm pr-12 cursor-pointer hover:border-gray-300 group-hover:shadow-md"
                required
              >
                <option value="">Select Location</option>
                {locations.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                <i className="ri-arrow-down-s-line text-gray-400 text-lg"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 text-white py-5 px-8 rounded-2xl font-semibold text-lg hover:from-blue-700 hover:via-purple-700 hover:to-blue-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl hover:shadow-2xl transform hover:-translate-y-1 whitespace-nowrap cursor-pointer"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                <span>Analyzing Your Car...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <div className="w-6 h-6 flex items-center justify-center mr-3">
                  <i className="ri-search-2-line text-xl"></i>
                </div>
                Get AI Price Prediction
              </div>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
