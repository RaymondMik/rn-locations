import React, { useState, useEffect } from "react";
import { StyleSheet, Pressable, Platform, Text, View, Image } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import { toggleModal } from "../store/actions/modal"
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'; 

import { Navigation, LocationScreenStatus } from "../types";
import CustomModal from "../components/CustomModal";
import Colors from "../constants";

const LocationScreen = ({ route, navigation }: Navigation) => {
   const { data, status } = route.params;
   const modal = useSelector(state => state.modal);
   const { locations } = useSelector(state => state);

   const selectedLocation = locations.items.find((location: any) => location._id === data._id);

   const dispatch = useDispatch();

   console.log(5678, locations);

   React.useLayoutEffect(() => {
      if (status === LocationScreenStatus.View) {
         navigation.setOptions({
            headerRight: () => (
               <Pressable onPress={() => { dispatch(toggleModal()) }}>
                  <AntDesign name="ellipsis1" size={24} color={Platform.OS === "ios" ? Colors.headerColor : Colors.whiteText } style={{ marginRight: 18}} />
               </Pressable>
            ),
         });
      }
   }, [navigation]);

   return (
      <View style={styles.container}>
         <View style={styles.map}>
            <Text>MAP</Text>
         </View>
         <CustomModal show={modal.show} data={selectedLocation} navigation={navigation}/>
         <View style={styles.statusContainer}>
            <View style={styles.status}>
               {selectedLocation.isOpen ? (
                  <>
                     <Text style={styles.statusLabel}>To Do</Text>
                     <MaterialCommunityIcons name="check-circle-outline" size={30} color="black" />
                  </>
               ) : (
                  <>
                     <Text style={styles.statusLabel}>Done</Text>
                     <MaterialCommunityIcons name="check-circle" size={30} color={Colors.green} />
                  </>
               )}
            </View>
            <View style={styles.status}>
               {selectedLocation.isAssigned ? (
                  <>
                     <Text style={styles.statusLabel}>Assigned</Text>
                     <MaterialCommunityIcons name="progress-wrench" size={30} color={Colors.green} />
                  </>
               ): (
                  <>
                     <Text style={styles.statusLabel}>Unassigned</Text>
                     <MaterialCommunityIcons name="progress-check" size={30} color={Colors.green} />
                  </>
               )}
            </View>
         </View>
         <Text style={styles.title}>{selectedLocation.title}</Text>
         <Text style={{ ...styles.text, textAlign: "justify" }}>{selectedLocation.description}</Text>
         <View style={styles.picturesContainer}>
            {selectedLocation && selectedLocation.pictures.map((pictureUrl: string, i: number) => (
               <Image
                  key={i.toString()}
                  style={styles.picture}
                  source={{ uri: pictureUrl }}
                  resizeMethod={"resize"}
               />
            ))}
         </View>
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      width: "100%",
      height: "100%",
      alignItems: "center",
      justifyContent: "flex-start",
      padding: 15
   },
   map: {
      width: "100%",
      height: 200,
      borderWidth: 1,
      borderColor: "black"
   },
   statusContainer: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 10
   },
   status: {
      flexDirection: "row",
      alignItems: "center",
   },
   statusLabel: {
      marginRight: 5
   },
   formContainer: {
      width: "100%",
      marginTop: 20
   },
   textInput: {
      width: "100%",
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 20,
      padding: 5
   },
   button: {
      padding: 12,
      marginTop: 5,
      backgroundColor: Colors.button,
      borderRadius: 4
   },
   buttonText: {
      color: "#fff",
      textAlign: "center"
   },
   text: {
      fontSize: 15,
      marginTop: 20
   },
   title: {
      fontFamily: "open-sans-bold",
      fontSize: 20,
      marginTop: 20
   },
   picturesContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-around",
      marginTop: 20
   },
   picture: {
      width: 150,
      height: 150,
      margin: 10
   }
});
 
export default LocationScreen;
