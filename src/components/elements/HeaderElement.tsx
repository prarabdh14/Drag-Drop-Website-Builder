import React from 'react';
import { ElementType } from '../../types/editor';

interface HeaderElementProps {
  element: ElementType;
}

const HeaderElement: React.FC<HeaderElementProps> = ({ element }) => {
  const { styles = {} } = element;

  return (
    <header style={styles}>
      <div className="max-w-7xl mx-auto flex justify-between items-center h-full">
        <div className="text-xl font-bold">Your Logo</div>
        <nav className="hidden md:flex space-x-8">
          <a href="#" className="text-gray-600 hover:text-gray-900">Home</a>
          <a href="#" className="text-gray-600 hover:text-gray-900">About</a>
          <a href="#" className="text-gray-600 hover:text-gray-900">Services</a>
          <a href="#" className="text-gray-600 hover:text-gray-900">Contact</a>
        </nav>
      </div>
    </header>
  );
};

export default HeaderElement; 