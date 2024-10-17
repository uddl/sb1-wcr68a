import React from 'react';
import { Tooltip } from 'lucide-react';

interface TooltipProps {
  text: string;
  children: React.ReactNode;
}

const Tooltips: React.FC<TooltipProps> = ({ text, children }) => {
  return (
    <div className="relative group">
      {children}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2">
        {text}
        <Tooltip className="ml-1" />
      </div>
    </div>
  );
};

export default Tooltips;
