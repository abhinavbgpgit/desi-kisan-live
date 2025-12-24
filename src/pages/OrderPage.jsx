import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const OrderPage = () => {
  const { t } = useLanguage();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{t('order_page_title')}</h1>
      <p>{t('order_page_title')} {t('welcome_dashboard')}</p>
      {/* यहां ऑर्डर इतिहास सामग्री जाएगी */}
    </div>
  );
};

export default OrderPage;