import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import TrainingCard from '@/components/TrainingCard';
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

const AllTrainings = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50 mt-20">
      <Header />
      <div className="pt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {t('trainings.all_trainings')}
            </h1>
            <p className="text-lg text-gray-600">
              {t('trainings.view_all_trainings')}
            </p>
          </div>

          {/* Training cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trainings.map((training) => (
              <TrainingCard
                key={training.id}
                id={training.id}
                name={training.name}
                image={trainingImages[training.id]}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllTrainings;