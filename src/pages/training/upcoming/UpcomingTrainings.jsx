import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Header from '@/components/Header';

const UpcomingTrainings = () => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="pt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {language === 'hi' ? 'आगामी प्रशिक्षण' : 'Upcoming Trainings'}
            </h1>
            <p className="text-lg text-gray-600">
              {language === 'hi' ? 'आगामी किसान प्रशिक्षण देखें' : 'View upcoming farmer trainings'}
            </p>
          </div>

          {/* Training content will go here */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-700">
              {language === 'hi' ? 'यह पृष्ठ अभी निर्माणाधीन है।' : 'This page is under construction.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingTrainings;