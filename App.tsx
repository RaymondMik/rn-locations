import React, { useState } from 'react';
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { createStore, combineReducers, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga"
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { enableScreens } from "react-native-screens";

import MainScreen from "./screens/MainScreen";
import FilteredScreen from "./screens/FilteredScreen";
import locations from "./store/reducers/locations";
import modal from "./store/reducers/modal";
import locationsSaga from "./store/sagas/locations";

import { AntDesign } from '@expo/vector-icons'; 

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({ locations, modal });
const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(sagaMiddleware)
  )
);

sagaMiddleware.run(locationsSaga)

enableScreens();

const Tabs = createBottomTabNavigator();

const fetchFonts = () => (
  Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  })
);

export default function App() {
  const [fontLoaded, setFontLoaded] = useState<boolean>(false);

  if (!fontLoaded) {
    return (
      <AppLoading 
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={(err) => console.error(err)}
      />
    );
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tabs.Navigator>
          <Tabs.Screen
              name="Home"
              component={MainScreen}
              options={{
              tabBarIcon: ({ color, size }: any) => (
                <AntDesign name="home" size={size} color={color} />
              )
              }}
          />
          <Tabs.Screen
              name="Filtered" 
              component={FilteredScreen}
              options={{
              tabBarIcon: ({ color, size }: any) => (
                <AntDesign name="star" size={size} color={color}/>
              )
              }}
              />
        </Tabs.Navigator>
      </NavigationContainer>
    </Provider>
  );
}