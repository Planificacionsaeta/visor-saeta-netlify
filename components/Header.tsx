
import React from 'react';
import { APP_TITLE } from '../constants';

interface HeaderProps {
  onToggleAdmin: () => void;
  isAdminView: boolean;
}

const Header: React.FC<HeaderProps> = ({ onToggleAdmin, isAdminView }) => {
  return (
    <header className="bg-primary text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">{APP_TITLE}</h1>
        <button
          onClick={onToggleAdmin}
          className="bg-white text-primary px-4 py-2 rounded hover:bg-gray-200 transition-colors"
        >
          {isAdminView ? 'Ver Desvíos' : 'Administrar Desvíos'}
        </button>
      </div>
    </header>
  );
};

export default Header;
