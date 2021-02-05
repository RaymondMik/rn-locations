import React, { useEffect } from "react";
import { StyleSheet, FlatList, Pressable, View, Text, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Location, Navigation } from "../types";
import { getLocations } from "../store/actions/locations";
import Colors from "../constants";

import { LocationScreenStatus } from "../types";

interface ItemData {
   item: Location
}

const LocationsListScreen = ({ navigation }: Navigation) => {
   const { locations } = useSelector(state => state);

   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(getLocations());
   }, [])

   // useEffect(() => {
   //    // make sure locations are fetched when screen re-enters
   //    navigation.addListener("didFocus", () => { dispatch(getLocations()) });
   // }, [dispatch])

   React.useLayoutEffect(() => {
      navigation.setOptions({
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

   if (locations.isLoading) {
      return (
         <View style={styles.centeredView}>
            <ActivityIndicator size="large" color="black" />
         </View>
      );
   }

   if (locations.hasError) {
      return (
         <View style={styles.centeredView}>
            <Text>There was an error while fetching locations!</Text>
         </View>
      );
   }

   if (!locations.items.length) {
      return (
         <View style={styles.centeredView}>
            <Text>There are no locations yet, maybe you can add one!</Text>
         </View>
      );
   }

   return (
      <FlatList
         onRefresh={() => { dispatch(getLocations(true)) }}
         refreshing={locations.isRefreshing}
         data={locations.items}
         renderItem={({ item }) => (
            <Pressable style={styles.gridItem} onPress={() => { 
               navigation.navigate("Location", {
                  title: item.title,
                  data: item,
                  status: LocationScreenStatus.View 
               })
            }}>
               <Text key={item._id} style={styles.text}>{item.title}</Text>
            </Pressable>
         )}
         keyExtractor={(item) => item._id}
         numColumns={2}
      />
   )
};

const styles = StyleSheet.create({
   centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
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