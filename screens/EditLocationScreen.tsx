import React, { useRef } from "react";
import { StyleSheet, Pressable, Text, View, TextInput, Image } from 'react-native';
import { useDispatch } from "react-redux";
import { Formik } from "formik"; 
import { updateLocation } from "../store/actions/locations";

const EditLocationScreen = ({ route, navigation }: any) => {
   const formRef: HTMLFormElement = useRef(null);
   const dispatch = useDispatch();
   const { data } = route.params;

   const saveInput = () => {
      if (formRef.current) {
        formRef.current.handleSubmit();
        if (formRef.current.isValid) {
         dispatch(updateLocation(
            {
               _id: data._id,
               title: formRef.current.values.title,
               description: formRef.current.values.description
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
         <Formik
            initialValues={{ title: data.title || "", description: data.description || "" }}
            innerRef={formRef}
         >
         {({ handleChange, handleBlur, handleSubmit, values }) => (
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
            </View>
         )}
         </Formik>
         <View style={styles.picturesContainer}>
            {data.item && data.item.pictures.map((pictureUrl: string) => (
               <Image
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

export default EditLocationScreen;