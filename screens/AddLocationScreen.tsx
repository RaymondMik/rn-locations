import React, { useRef } from "react";
import { StyleSheet, Pressable, Text, View, TextInput, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { addLocation } from "../store/actions/locations";
import { Formik } from "formik"; 
import Colors from "../constants";

const AddLocationScreen = ({ route, navigation, status }: any) => {
   const formRef: HTMLFormElement = useRef(null);
   const dispatch = useDispatch();
   const { userId, hasError } = useSelector(state => state.auth);

   const saveInput = () => {
      if (formRef.current) {
         if (formRef.current.isValid) {
            dispatch(addLocation(
               {
                  createdBy: userId,
                  title: formRef.current.values.title,
                  description: formRef.current.values.description,
                  pictures: [
                        "https://www.mynrma.com.au/-/media/local-guides/darwin/desktop-banner-hero-darwin.jpg?h=500&la=en&w=1140&hash=6051728B637FFBDE200B5547137306C0", 
                        "https://www.mynrma.com.au/-/media/local-guides/darwin/desktop-banner-hero-darwin.jpg?h=500&la=en&w=1140&hash=6051728B637FFBDE200B5547137306C0"
                     ],
                  latitude: "23.89898989898",
                  longitude: "26.9090909090",
                  isAssigned: false,
                  isOpen: true
               },
               navigation
            ))
        }
      }
    };

   React.useLayoutEffect(() => {
      navigation.setOptions({
         headerLeft: () => (
            <Pressable onPress={() => { navigation.goBack() }} style={{ marginLeft: 15 }}>
               <Text>Cancel</Text>
            </Pressable>
         ),
         headerRight: () => (
            <Pressable onPress={() => { saveInput() }} style={{ marginRight: 15 }}>
               <Text>Save</Text>
            </Pressable>
         ),
      });
      
   }, [navigation]);

   return (
      <View style={styles.container}>
         {hasError && Alert.alert("An Error Occurred", hasError, [{ text: 'Okay' }] )}
         <View style={styles.map}>
            <Text>MAP</Text>
         </View>
         <Formik
            initialValues={{ title: "", description: "", picture: "" }}
            innerRef={formRef}
         >
         {({ handleChange, handleBlur, values }) => (
            <View style={styles.formContainer}>
               <Text>Title</Text>
               <TextInput
                  style={styles.textInput}
                  onChangeText={handleChange("title")}
                  onBlur={handleBlur("title")}
                  value={values.title}
               />
               <Text>Description</Text>
               <TextInput
                  style={styles.textInput}
                  onChangeText={handleChange("description")}
                  onBlur={handleBlur("description")}
                  value={values.description}
               />
               <View style={styles.picturesContainer}>
                  <Pressable 
                     style={styles.button}
                     onPress={() => { console.log("ADD PICTURES") }}
                  >
                     <Text  style={styles.buttonText}>Add pictures</Text>
                  </Pressable>
                 
                  <TextInput
                     style={{ display: "none" }}
                     onChangeText={handleChange("picture")}
                     onBlur={handleBlur("picture")}
                     value={values.picture}
                  />
               </View>
            </View>
         )}
         </Formik>
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
   },
   button: {
      width: 150,
      height: 30,
      backgroundColor: Colors.button,
      borderRadius: 4,
      alignItems: "center",
      justifyContent: "center",
   },
   buttonText: {
      color: "white"
   }
});

export default AddLocationScreen;