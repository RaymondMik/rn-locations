import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import LocationsListScreen from "../screens/LocationsListScreen";
import LocationScreen from "../screens/LocationScreen";
import AddLocationScreen from "../screens/AddLocationScreen";
import EditLocationScreen from "../screens/EditLocationScreen";
import Colors from "../constants";

const HomeStack = createStackNavigator();

const MainScreen = () => (
   <HomeStack.Navigator>
      <HomeStack.Screen 
         name="Home"
         component={LocationsListScreen}
         options={{
            title: "Locations",
            headerStyle: {
            backgroundColor: Platform.OS === "android" ? Colors.headerColor : "#fff",
            },
            headerTintColor: Platform.OS === "android" ? Colors.whiteText : "#000",
            headerTitleStyle: {
            fontWeight: "bold",
            },
         }}
      />
      <HomeStack.Screen 
         name="Location"
         component={LocationScreen}
         options={{
            headerStyle: {
            backgroundColor: Platform.OS === "android" ? Colors.headerColor : "#fff",
            },
            headerTintColor: Platform.OS === "android" ? Colors.whiteText : "#000",
            headerTitleStyle: {
            fontWeight: "bold",
            },
         }}
      />
      <HomeStack.Screen 
         name="Add"
         component={AddLocationScreen}
         options={{
            headerStyle: {
            backgroundColor: Platform.OS === "android" ? Colors.headerColor : "#fff",
            },
            headerTintColor: Platform.OS === "android" ? Colors.whiteText : "#000",
            headerTitleStyle: {
            fontWeight: "bold",
            },
         }}
      />
      <HomeStack.Screen 
         name="Edit"
         component={EditLocationScreen}
         options={{
            headerStyle: {
            backgroundColor: Platform.OS === "android" ? Colors.headerColor : "#fff",
            },
            headerTintColor: Platform.OS === "android" ? Colors.whiteText : "#000",
            headerTitleStyle: {
            fontWeight: "bold",
            },
         }}
      />
   </HomeStack.Navigator>
); 

export default MainScreen;
