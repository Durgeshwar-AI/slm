import { StatusBar } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Slot } from "expo-router";
import "./global.css";
import {persistor, store} from "@/store/store";
import { Provider } from 'react-redux'
import { PersistGate } from "redux-persist/integration/react";

export default function Layout() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        <SafeAreaView className="flex-1">
          <Slot />
        </SafeAreaView>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
}
