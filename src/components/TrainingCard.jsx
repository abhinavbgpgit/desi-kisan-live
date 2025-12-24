import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';

// Map training IDs to their respective route paths
const trainingRoutes = {
  1: '/training/bee-training',
  2: '/training/fish-farming',
  3: '/training/mushroom-farming',
  4: '/training/dairy-farming',
  5: '/training/goat-farming',
  6: '/training/horticulture',
  7: '/training/net-house',
  8: '/training/vermi-compost',
  9: '/training/organic-farming',
  10: '/training/food-processing',
  11: '/training/pig-farming',
  12: '/training/seasonal-pest-control',
  13: '/training/waste-management',
  14: '/training/modern-farming',
  15: '/training/hydroponics',
  16: '/training/irrigation-system',
  17: '/training/multi-layer-farming',
  18: '/training/duck-farming',
};

const TrainingCard = ({ id, name, image }) => {
  const { t } = useLanguage();
  
  // Get the translated training name using the training ID
  const trainingKey = `trainings.training_${id}`;
  const translatedName = t(trainingKey);
  
  // Get the route for this training, fallback to details page if not found
  const trainingRoute = trainingRoutes[id] || `/training/details/${id}`;
  
  return (
    <Link to={trainingRoute} className="block">
      <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300 cursor-pointer">
        <img src={image} alt={translatedName} className="w-full h-48 object-cover rounded-md mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 text-center">{translatedName}</h3>
      </div>
    </Link>
  );
};

export default TrainingCard;