import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface Template {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  style: string;
  colorScheme: string;
}

const templates: Template[] = [
  {
    id: 'ecommerce-modern-blue',
    name: 'Modern Store',
    description: 'Clean and modern e-commerce template with blue accent',
    image: 'https://via.placeholder.com/300x200',
    category: 'ecommerce',
    style: 'modern',
    colorScheme: 'blue'
  },
  {
    id: 'business-classic-green',
    name: 'Professional Business',
    description: 'Classic business template with green accents',
    image: 'https://via.placeholder.com/300x200',
    category: 'business',
    style: 'classic',
    colorScheme: 'green'
  },
  {
    id: 'portfolio-minimal-purple',
    name: 'Creative Portfolio',
    description: 'Minimalist portfolio template with purple accents',
    image: 'https://via.placeholder.com/300x200',
    category: 'portfolio',
    style: 'minimal',
    colorScheme: 'purple'
  },
  {
    id: 'blog-bold-red',
    name: 'Dynamic Blog',
    description: 'Bold blog template with red accents',
    image: 'https://via.placeholder.com/300x200',
    category: 'blog',
    style: 'bold',
    colorScheme: 'red'
  },
  {
    id: 'ecommerce-classic-blue',
    name: 'Classic Store',
    description: 'Traditional e-commerce template with blue accents',
    image: 'https://via.placeholder.com/300x200',
    category: 'ecommerce',
    style: 'classic',
    colorScheme: 'blue'
  },
  {
    id: 'business-modern-green',
    name: 'Modern Business',
    description: 'Contemporary business template with green accents',
    image: 'https://via.placeholder.com/300x200',
    category: 'business',
    style: 'modern',
    colorScheme: 'green'
  }
];

const TemplateSelection: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state?.formData;

  // Score templates based on how well they match the user's preferences
  const scoredTemplates = templates.map(template => {
    let score = 0;
    
    // Category match is most important
    if (template.category === formData?.businessType) {
      score += 3;
    }
    
    // Style match is second most important
    if (template.style === formData?.stylePreference) {
      score += 2;
    }
    
    // Color scheme match is least important
    if (template.colorScheme === formData?.colorScheme) {
      score += 1;
    }
    
    return { ...template, score };
  });

  // Sort templates by score (highest first) and take top 6
  const filteredTemplates = scoredTemplates
    .sort((a, b) => b.score - a.score)
    .slice(0, 6);

  const handleTemplateSelect = (templateId: string) => {
    navigate('/editor', { state: { templateId, formData } });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Choose Your Template</h1>
          <p className="text-gray-600">
            We've selected these templates based on your preferences
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <img
                src={template.image}
                alt={template.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{template.name}</h3>
                <p className="text-gray-600 mb-4">{template.description}</p>
                <button
                  onClick={() => handleTemplateSelect(template.id)}
                  className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center justify-center gap-2"
                >
                  Use Template
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold mb-4">No templates found</h2>
            <p className="text-gray-600 mb-6">
              We couldn't find templates matching your preferences. Try adjusting your selections.
            </p>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Go Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TemplateSelection; 