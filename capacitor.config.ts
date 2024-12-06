import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'InventStrack',
  webDir: 'www',
  bundledWebRuntime: false,
  android: {
  allowMixedContent: true
  }
};

export default config;
