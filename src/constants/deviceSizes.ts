export const DEVICE_SIZES = {
  mobile: {
    width: 375,
    height: 667,
    label: 'Mobile'
  },
  tablet: {
    width: 768,
    height: 1024,
    label: 'Tablet'
  },
  desktop: {
    width: 1366,
    height: 768,
    label: 'Desktop'
  }
} as const;

export type DeviceType = keyof typeof DEVICE_SIZES; 