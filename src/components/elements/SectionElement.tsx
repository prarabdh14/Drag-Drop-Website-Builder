import React from 'react';
import { ElementType } from '../../types/editor';

interface SectionElementProps {
  element: ElementType;
}

const SectionElement: React.FC<SectionElementProps> = ({ element }) => {
  const { styles = {} } = element;

  return (
    <section style={styles} className="relative">
      <div className="max-w-7xl mx-auto">
        {/* Content will be added by dragging other elements into this section */}
      </div>
    </section>
  );
};

export default SectionElement; 