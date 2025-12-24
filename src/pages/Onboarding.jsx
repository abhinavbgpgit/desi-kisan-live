import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Onboarding = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const slides = [
    {
      title: "Direct From Farm",
      description: "Fresh produce delivered directly from certified farms. No middlemen, just freshness.",
      image: "/onboarding1.jpg",
      highlight: "Farm to Table in 24 hours"
    },
    {
      title: "Pure & Certified",
      description: "All products certified for quality and purity. 100% natural, no chemicals.",
      image: "/onboarding2.jpg",
      highlight: "Certified Organic Products"
    },
    {
      title: "Weekly Subscription Model",
      description: "Weekly deliveries at your convenience. Customize your weekly basket.",
      image: "/onboarding3.jpg",
      highlight: "Hassle-free Weekly Deliveries"
    }
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      localStorage.setItem('hasSeenOnboarding', 'true');
      navigate('/auth');
    }
  };

  const handleSkip = () => {
    localStorage.setItem('hasSeenOnboarding', 'true');
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="p-6">
        <button
          onClick={handleSkip}
          className="float-right text-gray-500 hover:text-gray-700 transition-colors"
        >
          Skip
        </button>
      </div>

      <div className="flex flex-col items-center justify-center px-4 py-8">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-sm"
        >
          <img
            src={slides[currentSlide].image}
            alt={slides[currentSlide].title}
            className="w-full h-80 object-cover rounded-2xl mb-8 shadow-lg"
            onError={(e) => {
              e.target.src = '/onboarding-placeholder.jpg';
            }}
          />
        </motion.div>

        <motion.h2
          key={`title-${currentSlide}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="text-2xl font-bold text-green-800 mb-4 text-center"
        >
          {slides[currentSlide].title}
        </motion.h2>

        <motion.p
          key={`desc-${currentSlide}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.3 }}
          className="text-gray-600 text-center mb-2 px-4"
        >
          {slides[currentSlide].description}
        </motion.p>

        <motion.p
          key={`highlight-${currentSlide}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.3 }}
          className="text-green-600 font-semibold text-center"
        >
          {slides[currentSlide].highlight}
        </motion.p>
      </div>

      <div className="flex justify-between items-center px-6 py-8">
        <div className="flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentSlide ? 'bg-green-500' : 'bg-gray-300'
              }`}
            ></button>
          ))}
        </div>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleNext}
          className="bg-green-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-green-700 transition-colors"
        >
          {currentSlide === slides.length - 1 ? "Get Started" : "Next"}
        </motion.button>
      </div>
    </div>
  );
};

export default Onboarding;