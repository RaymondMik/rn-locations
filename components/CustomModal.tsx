import React from "react";
import { StyleSheet, Pressable, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import { useDispatch } from "react-redux";
import { toggleModal } from "../store/actions/modal"
import Colors from "../constants";
import { deleteLocation } from "../store/actions/locations";
import { LocationScreenStatus } from "../types";

const CustomModal = ({ data, navigation, show }: any) => {
   const dispatch = useDispatch();
 
   return (
      <Modal
         isVisible={show}
         coverScreen={false}
         backdropColor={"transparent"}
         onBackdropPress={() => { dispatch(toggleModal()) }}
      >           
         <View style={styles.centeredView}>
            <View style={styles.modalView}>
               <Pressable
                  style={{...styles.modalButton, borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
                  onPress={() => {
                     console.log("PIPPO", navigation);
                     dispatch(deleteLocation(data._id, navigation));
                  }}
               >
                  <Text style={{...styles.textStyle, color: Colors.red }}>Delete</Text>
               </Pressable>
               <Pressable
                  style={styles.modalButton}
                  onPress={() => {
                     navigation.navigate("Edit", {
                        title: "Edit location",
                        data: data,
                        status: LocationScreenStatus.Edit
                     })
                     dispatch(toggleModal());
                  }}
               >
                  <Text style={styles.textStyle}>Edit</Text>
               </Pressable>
               <Pressable
                  style={styles.modalButton}
                  onPress={() => {
                     dispatch(toggleModal());
                  }}
               >
                  <Text style={styles.textStyle}>Assign to me</Text>
               </Pressable>
               <Pressable
                  style={{ ...styles.modalButton, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, borderBottomWidth: 0 }}
                  onPress={() => {
                     dispatch(toggleModal());
                  }}
               >
                  <Text style={styles.textStyle}>Share</Text>
               </Pressable>
               <Pressable
                  style={{ ...styles.modalButton, marginTop: 20, borderRadius: 10 }}
                  onPress={() => {
                     dispatch(toggleModal());
                  }}
               >
                  <Text style={styles.textStyle}>Cancel</Text>
               </Pressable>
            </View>
         </View>
      </Modal>
   );
};

const styles = StyleSheet.create({
   centeredView: {
      flex: 1,
      justifyContent: "flex-end",
      alignItems: "center",
      marginBottom: "-55%"
   },
   modalView: {
      width: "100%",
      height: "50%",
      margin: 20,
      backgroundColor: "transparent",
      borderRadius: 20,
      paddingVertical: 10,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
   },
   modalButton: {
      width: "100%",
      paddingVertical: 15,
      borderBottomColor: "#555",
      borderBottomWidth: 1,
      backgroundColor: "rgba(0,0,0,0.9)",
   },
   textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
   },
   modalText: {
      marginBottom: 15,
      textAlign: "center"
   }
});

export default CustomModal;