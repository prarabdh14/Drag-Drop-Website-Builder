import React from 'react';
import { Smartphone, Tablet, Monitor } from 'lucide-react';
import { DEVICE_SIZES, DeviceType } from '../../constants/deviceSizes';

interface DeviceSelectorProps {
  selectedDevice: DeviceType;
  onDeviceSelect: (device: DeviceType) => void;
}

const DeviceSelector: React.FC<DeviceSelectorProps> = ({
  selectedDevice,
  onDeviceSelect,
}) => {
  const devices: { type: DeviceType; icon: React.ReactNode }[] = [
    { type: 'mobile', icon: <Smartphone size={20} /> },
    { type: 'tablet', icon: <Tablet size={20} /> },
    { type: 'desktop', icon: <Monitor size={20} /> },
  ];

  return (
    <div className="flex items-center gap-2 bg-gray-800 p-2 rounded-lg">
      {devices.map(({ type, icon }) => (
        <button
          key={type}
          onClick={() => onDeviceSelect(type)}
          className={`p-2 rounded transition-colors ${
            selectedDevice === type
              ? 'bg-blue-500 text-white'
              : 'text-gray-400 hover:text-white hover:bg-gray-700'
          }`}
          title={DEVICE_SIZES[type].label}
        >
          {icon}
        </button>
      ))}
    </div>
  );
};

export default DeviceSelector; 