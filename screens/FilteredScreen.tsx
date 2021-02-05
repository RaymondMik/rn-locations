import React from "react";
import { StyleSheet, Text, View } from 'react-native';

const FilteredScreen = () => (
   <View style={styles.container}>
      <Text style={styles.text}>Filtered locations</Text>
   </View>
);

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
   },
   text: {
      fontFamily: 'open-sans-bold'
   }
});
 
export default FilteredScreen;