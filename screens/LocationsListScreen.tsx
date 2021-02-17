import React, { useEffect } from "react";
import { StyleSheet, FlatList, Pressable, View, Text, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Location, Navigation } from "../types";
import { getLocations } from "../store/actions/locations";
import LocationHandler from "../components/LocationHandler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authenticateLogout } from "../store/actions/auth";
import { ASYNC_STORAGE_USER_DATA_KEY } from "../constants";
import { LocationScreenStatus } from "../types";
import MapView, { Marker } from 'react-native-maps';
import { AntDesign } from '@expo/vector-icons';
import Colors from "../constants";

const LocationsListScreen = ({ navigation }: Navigation) => {
   const { items, userGPSLocation } = useSelector(state => state.locations);
   const dispatch = useDispatch();

   console.log(999, userGPSLocation);

   useEffect(() => {
      dispatch(getLocations());
   }, [])

   React.useLayoutEffect(() => {
      navigation.setOptions({
         headerLeft: () => (
            <Pressable onPress={() => {
               AsyncStorage.removeItem(ASYNC_STORAGE_USER_DATA_KEY);
               dispatch(authenticateLogout());
            }}>
               <Text style={{ marginLeft: 18, fontWeight: "bold" }}>Log Out</Text>
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
               <MaterialCommunityIcons name="plus-thick" size={24} color="black" style={{ marginRight: 18}} />
            </Pressable>
         ),
      });
    }, [navigation]);

   if (items.isLoading) {
      return (
         <View style={styles.centeredView}>
            <ActivityIndicator size="large" color="black" />
         </View>
      );
   }

   if (items.hasError) {
      return (
         <View style={styles.centeredView}>
            <Text>There was an error while fetching locations!</Text>
         </View>
      );
   }

   if (!items.length) {
      return (
         <View style={styles.centeredView}>
            <Text>There are no locations yet, maybe you can add one!</Text>
         </View>
      );
   }

   const mapRegion = {
      latitude: 45.930007,
      longitude: 13.637918,
      latitudeDelta: 0.0911,
      longitudeDelta: 0.0421
    };

   return (
      <MapView
         style={styles.map}
         region={mapRegion}
         onPress={() => { console.log("HELLO MAP WORLD")}}
      >
         <LocationHandler />
         {items.map((item: any) => { 
            console.log(111, item);
            return (
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
                  <AntDesign name="enviroment" size={34} color={Colors.green} />
               </Marker>
            );
         })}
      </MapView>
   );

   // return (
   //    <>
   //       <LocationHandler />
   //       <FlatList
   //          onRefresh={() => { dispatch(getLocations(true)) }}
   //          refreshing={locations.isRefreshing}
   //          data={locations.items}
   //          renderItem={({ item }) => (
   //             <Pressable style={styles.gridItem} onPress={() => { 
   //                navigation.navigate("Location", {
   //                   title: item.title,
   //                   data: item,
   //                   status: LocationScreenStatus.View 
   //                })
   //             }}>
   //                <Text key={item._id} style={styles.text}>{item.title}</Text>
                  
   //             </Pressable>
   //          )}
   //          keyExtractor={(item) => item._id}
   //          numColumns={2}
   //       />
   //    </>
   // )
};

const styles = StyleSheet.create({
   centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
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