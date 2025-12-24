import React from 'react';
import { Outlet } from 'react-router-dom';

const MainContent = () => {
  return (
    <div className="flex-1 p-6 overflow-auto ml-64">
      <div className="max-w-6xl mx-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default MainContent;