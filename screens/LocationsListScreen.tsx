import React, { useEffect } from "react";
import { StyleSheet, FlatList, Pressable, View, Text, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Location, Navigation } from "../types";
import { getLocations } from "../store/actions/locations";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authenticateLogout } from "../store/actions/auth";
import { ASYNC_STORAGE_USER_DATA_KEY, FALLBACK_LOCATION } from "../constants";
import { LocationScreenStatus } from "../types";
import MapView, { Marker } from 'react-native-maps';
import { AntDesign } from '@expo/vector-icons';
import Colors from "../constants";

const LocationsListScreen = ({ navigation }: Navigation) => {
   const { items, userGPSLocation, isLoading, hasError } = useSelector(state => state.locations);
   const dispatch = useDispatch();

   useEffect(() => {
      const locations = navigation.addListener("focus", () => {
         dispatch(getLocations());
      });
      
      return locations;
   }, [navigation])

   React.useLayoutEffect(() => {
      navigation.setOptions({
         headerLeft: () => (
            <Pressable onPress={() => {
               AsyncStorage.removeItem(ASYNC_STORAGE_USER_DATA_KEY);
               dispatch(authenticateLogout());
            }}>
               <Text style={{ marginLeft: 18, fontWeight: "bold", color: Colors.whiteText }}>Log Out</Text>
            </Pressable>
         ),
         headerRight: () => (
            <Pressable onPress={() => { 
               navigation.navigate("Add", {
                  title: "Add location",
                  data: {},
                  status: LocationScreenStatus.Create
               })
             }}>
               <MaterialCommunityIcons name="plus-thick" size={24} color={Colors.whiteText} style={{ marginRight: 18}} />
            </Pressable>
         ),
      });
    }, [navigation]);

   if (hasError) {
      return (
         <View style={styles.centeredView}>
            <Text>There was an error while fetching locations!</Text>
         </View>
      );
   }

   console.log(3333, userGPSLocation?.coords?.latitude, userGPSLocation?.coords?.longitude);

   return (
      <>
         {isLoading && !items.length && (
            <View style={styles.centeredView}>
               <ActivityIndicator size="large" color="black" />
            </View>
         )}
         <MapView
            style={styles.map}
            mapType="satellite"
            showsUserLocation
            region={{
               latitude: userGPSLocation?.coords?.latitude || FALLBACK_LOCATION.coords.latitude,
               longitude: userGPSLocation?.coords?.longitude || FALLBACK_LOCATION.coords.longitude,
               latitudeDelta: 0.0911,
               longitudeDelta: 0.0421
            }}
            onPress={() => { console.log("HELLO MAP WORLD") }}
         >
            {items.map((item: any) => (
               <Marker
                  key={item._id}
                  title={item.title}
                  coordinate={{
                     latitude: Number(item.latitude),
                     longitude: Number(item.longitude),
                  }}
                  onPress={() => { 
                     navigation.navigate("Location", {
                        title: item.title,
                        data: item,
                        status: LocationScreenStatus.View 
                     })
                  }}
               >
                  <AntDesign name="enviroment" size={34} color={Colors.red} />
               </Marker>
            ))}
         </MapView>
      </>
   );
};

const styles = StyleSheet.create({
   centeredView: {
      position: "absolute",
      elevation: 0,
      
   },
   map: {
      flex: 1
    },
   gridItem: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      margin: 15,
   },
   text: {
      fontFamily: "open-sans-bold",
   }
});
 
export default LocationsListScreen;