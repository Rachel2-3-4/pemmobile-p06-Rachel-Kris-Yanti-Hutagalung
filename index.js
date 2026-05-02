import { registerRootComponent } from "expo";
import { SafeAreaProvider } from "react-native-safe-area-context";
import App from "./App";

// Wrapper component: semua app di-wrap dengan SafeAreaProvider
const RootApp = () => (
  <SafeAreaProvider>
    <App />
  </SafeAreaProvider>
);

// Expo entry point
registerRootComponent(RootApp);