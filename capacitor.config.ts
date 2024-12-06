import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'InventStrack',
  webDir: 'www',
  plugins: {
    'BarcodeScanner': {
      android: {
        // Aquí puedes agregar configuraciones específicas de Android si es necesario
      },
      ios: {
        // Y configuraciones de iOS si las necesitas
      },
    },
  },
  
};

export default config;
