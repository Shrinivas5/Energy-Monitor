import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface EnergyUsageCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  change: number;
  description: string;
}

const EnergyUsageCard: React.FC<EnergyUsageCardProps> = ({ 
  title, 
  value, 
  icon, 
  change, 
  description 
}) => {
  const isPositive = change > 0;
  const isNeutral = change === 0;
  
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        <div className="p-2 bg-blue-50 rounded-lg">
          {icon}
        </div>
      </div>
      
      <div className="mt-4 flex items-center">
        {isNeutral ? (
          <span className="text-gray-500 text-sm">{change}%</span>
        ) : isPositive ? (
          <>
            <ArrowUpRight className="h-4 w-4 text-red-500 mr-1" />
            <span className="text-red-500 text-sm">{change}%</span>
          </>
        ) : (
          <>
            <ArrowDownRight className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-500 text-sm">{Math.abs(change)}%</span>
          </>
        )}
        <span className="text-gray-500 text-sm ml-2">{description}</span>
      </div>
    </div>
  );
};

export default EnergyUsageCard;