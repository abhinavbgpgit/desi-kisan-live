import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import Header from '@/components/Header';
import dairyFarmingImage from '@/assets/training/dairy_farming.png';

const DairyFarming = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

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
            <img src={dairyFarmingImage} alt="डेयरी फार्मिंग प्रशिक्षण" className="w-full h-64 object-cover" />
            <div className="p-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">डेयरी फार्मिंग प्रशिक्षण</h1>
              <p className="text-gray-700 mb-4">गाय, भैंस पालन और दूध उत्पादन की विधियाँ सीखें।</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded">
                  <h3 className="font-semibold text-gray-900">
                    {t('trainings.duration')}
                  </h3>
                  <p className="text-gray-700">10 दिन</p>
                </div>
                <div className="bg-gray-50 p-4 rounded">
                  <h3 className="font-semibold text-gray-900">
                    {t('trainings.instructor')}
                  </h3>
                  <p className="text-gray-700">विकास यादव</p>
                </div>
                <div className="bg-gray-50 p-4 rounded">
                  <h3 className="font-semibold text-gray-900">
                    {t('trainings.fee')}
                  </h3>
                  <p className="text-gray-700">₹600</p>
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

export default DairyFarming;