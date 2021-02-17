import React, { useState, useRef } from "react";
import { StyleSheet, Pressable, Text, View, TextInput, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Formik } from "formik"; 
// import * as FileSystem from "expo-file-system";
import { addLocation } from "../store/actions/locations";
import ImageHandler from "../components/ImageHandler";
import MapPreview from "../components/MapPreview";
import Colors from "../constants";
import firebase from "firebase";
import firebaseConfig from "../firebase";

const uploadAsFile = async (uri: any, userId: string) => {
   firebase.initializeApp(firebaseConfig);
   const response = await fetch(uri);
   const blob = await response.blob();
 
   const metadata = {
     contentType: "image/jpeg",
   };
 
   let name = new Date().getTime() + "-media.jpg"
   const ref = firebase
     .storage()
     .ref()
     .child(`${userId}/` + name)
 
   const task = ref.put(blob, metadata);

   return new Promise((resolve, reject) => {
      task.on("state_changed", 
         (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
         }, (err) => {
            reject(err)
         }, () => {
            // gets the download url then sets the image from firebase as the value for the imgUrl key:
            firebase
               .storage()
               .ref()
               .child(`${userId}/` + name).getDownloadURL()
               .then(fireBaseUrl => {
                  resolve(fireBaseUrl)
               })
         })
      });
 }

const AddLocationScreen = ({ navigation }: any) => {
   const [image, setImage] = useState<any>(null);
   const dispatch = useDispatch();

   const formRef: HTMLFormElement = useRef(null);
   const { userId, hasError } = useSelector(state => state.auth);

   console.log(879, image);

   const saveInput = async() => {
      console.log(890, image);
      if (formRef?.current?.isValid && image) { 
         const imageURL = await uploadAsFile(image, userId);

         dispatch(
            addLocation({
               createdBy: userId,
               title: formRef.current.values.title,
               description: formRef.current.values.description,
               pictures: [imageURL],
               latitude: "23.89898989898",
               longitude: "26.9090909090",
               isAssigned: false,
               isOpen: true
            },
            navigation
         ));
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
      
   }, [navigation, image]);

   return (
      <View style={styles.container}>
         {hasError && Alert.alert("An Error Occurred", hasError, [{ text: 'Okay' }] )}
         <View>
            <MapPreview />
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
               <View style={styles.imagePreviewContainer}>
                  <ImageHandler setImage={setImage} />
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
   imagePreviewContainer: {
      // flexDirection: "row",
      // flexWrap: "wrap",
      // justifyContent: "space-around",
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