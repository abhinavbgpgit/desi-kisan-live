import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import trainings from '@/data/trainings.json';
import Header from '@/components/Header';

// Import all training images
import beeTrainingImage from '@/assets/training/bee_training.png';
import fishFarmingImage from '@/assets/training/fish_farming.png';
import mashroomFarmingImage from '@/assets/training/mashroom_farming.png';
import dairyFarmingImage from '@/assets/training/dairy_farming.png';
import goatFarmingImage from '@/assets/training/goat_farming.png';
import horticultureImage from '@/assets/training/Horticulture.png';
import netHouseImage from '@/assets/training/net_house.png';
import vermiCompostImage from '@/assets/training/vermi_compost.png';
import organicFarmingImage from '@/assets/training/javic_organic_farming.png';
import foodProcessingImage from '@/assets/training/food_proccessing.png';
import pigFarmingImage from '@/assets/training/pig_farming.png';
import seasonalPestImage from '@/assets/training/seasonal_pest.png';
import wasteManagementImage from '@/assets/training/agricultural_waste_management.png';
import modernFarmingImage from '@/assets/training/modern_farming.png';
import hydroponicsImage from '@/assets/training/hydroponics.png';
import irrigationSystemImage from '@/assets/training/irrigation_system_methods.png';
import multiLayerFarmingImage from '@/assets/training/multi_layer_farming.png';
import duckFarmingImage from '@/assets/training/duck_farming.png';

// Map training IDs to their respective images
const trainingImages = {
  1: beeTrainingImage,
  2: fishFarmingImage,
  3: mashroomFarmingImage,
  4: dairyFarmingImage,
  5: goatFarmingImage,
  6: horticultureImage,
  7: netHouseImage,
  8: vermiCompostImage,
  9: organicFarmingImage,
  10: foodProcessingImage,
  11: pigFarmingImage,
  12: seasonalPestImage,
  13: wasteManagementImage,
  14: modernFarmingImage,
  15: hydroponicsImage,
  16: irrigationSystemImage,
  17: multiLayerFarmingImage,
  18: duckFarmingImage,
};

const TrainingDetails = () => {
  const { id } = useParams();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const training = trainings.find(t => t.id === parseInt(id));

  if (!training) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {t('trainings.training_not_found')}
          </h1>
          <button
            onClick={() => navigate('/training/all-tranings')}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {t('trainings.go_back')}
          </button>
        </div>
      </div>
    );
  }

  // Get translated training name and description
  const trainingName = t(`trainings.training_${id}`);
  const trainingDescription = t(`trainings.training_${id}_desc`);
  
  // Get the correct image for this training
  const trainingImage = trainingImages[parseInt(id)] || beeTrainingImage;

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-8 mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate('/training/all-tranings')}
            className="mb-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            {t('trainings.back')}
          </button>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={trainingImage} alt={trainingName} className="w-full h-64 object-cover" />
            <div className="p-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{trainingName}</h1>
              <p className="text-gray-700 mb-4">{trainingDescription}</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded">
                  <h3 className="font-semibold text-gray-900">
                    {t('trainings.duration')}
                  </h3>
                  <p className="text-gray-700">{training.duration}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded">
                  <h3 className="font-semibold text-gray-900">
                    {t('trainings.instructor')}
                  </h3>
                  <p className="text-gray-700">{training.instructor}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded">
                  <h3 className="font-semibold text-gray-900">
                    {t('trainings.fee')}
                  </h3>
                  <p className="text-gray-700">{training.fee}</p>
                </div>
              </div>

              <button className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600">
                {t('trainings.apply_now')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TrainingDetails;