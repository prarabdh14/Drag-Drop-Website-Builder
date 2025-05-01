import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Building2, ShoppingCart, Camera, BookOpen } from 'lucide-react';

interface FormData {
  businessType: string;
  purpose: string;
  stylePreference: string;
  colorScheme: string;
}

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    businessType: '',
    purpose: '',
    stylePreference: '',
    colorScheme: ''
  });

  const businessTypes = [
    { id: 'ecommerce', label: 'E-commerce', icon: <ShoppingCart size={24} /> },
    { id: 'business', label: 'Business', icon: <Building2 size={24} /> },
    { id: 'portfolio', label: 'Portfolio', icon: <Camera size={24} /> },
    { id: 'blog', label: 'Blog', icon: <BookOpen size={24} /> }
  ];

  const purposes = [
    { id: 'sell', label: 'Sell Products/Services' },
    { id: 'showcase', label: 'Showcase Work' },
    { id: 'inform', label: 'Share Information' },
    { id: 'connect', label: 'Connect with Audience' }
  ];

  const stylePreferences = [
    { id: 'modern', label: 'Modern & Clean' },
    { id: 'minimal', label: 'Minimalist' },
    { id: 'bold', label: 'Bold & Vibrant' },
    { id: 'classic', label: 'Classic & Professional' }
  ];

  const colorSchemes = [
    { id: 'blue', label: 'Blue', color: '#3B82F6' },
    { id: 'green', label: 'Green', color: '#10B981' },
    { id: 'purple', label: 'Purple', color: '#8B5CF6' },
    { id: 'red', label: 'Red', color: '#EF4444' }
  ];

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      // Navigate to template selection
      navigate('/templates', { state: { formData } });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center">What type of website do you need?</h2>
            <div className="grid grid-cols-2 gap-4">
              {businessTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => handleChange('businessType', type.id)}
                  className={`p-4 border rounded-lg flex flex-col items-center gap-2 transition-all ${
                    formData.businessType === type.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  {type.icon}
                  <span>{type.label}</span>
                </button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center">What's your main purpose?</h2>
            <div className="grid grid-cols-2 gap-4">
              {purposes.map((purpose) => (
                <button
                  key={purpose.id}
                  onClick={() => handleChange('purpose', purpose.id)}
                  className={`p-4 border rounded-lg text-center transition-all ${
                    formData.purpose === purpose.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  {purpose.label}
                </button>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center">What style do you prefer?</h2>
            <div className="grid grid-cols-2 gap-4">
              {stylePreferences.map((style) => (
                <button
                  key={style.id}
                  onClick={() => handleChange('stylePreference', style.id)}
                  className={`p-4 border rounded-lg text-center transition-all ${
                    formData.stylePreference === style.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  {style.label}
                </button>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center">Choose your color scheme</h2>
            <div className="grid grid-cols-2 gap-4">
              {colorSchemes.map((scheme) => (
                <button
                  key={scheme.id}
                  onClick={() => handleChange('colorScheme', scheme.id)}
                  className={`p-4 border rounded-lg text-center transition-all ${
                    formData.colorScheme === scheme.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div
                    className="w-8 h-8 rounded-full mx-auto mb-2"
                    style={{ backgroundColor: scheme.color }}
                  />
                  <span>{scheme.label}</span>
                </button>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-center mb-2">Create Your Website</h1>
          <p className="text-gray-600 text-center">
            Answer a few questions to get started with your perfect website
          </p>
        </div>

        <div className="mb-8">
          <div className="flex justify-between mb-4">
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step <= currentStep ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
                }`}
              >
                {step}
              </div>
            ))}
          </div>
        </div>

        {renderStep()}

        <div className="mt-8 flex justify-between">
          <button
            onClick={handleBack}
            className={`px-4 py-2 rounded-lg ${
              currentStep === 1
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            disabled={currentStep === 1}
          >
            Back
          </button>
          <button
            onClick={handleNext}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2"
          >
            {currentStep === 4 ? 'View Templates' : 'Next'}
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage; 