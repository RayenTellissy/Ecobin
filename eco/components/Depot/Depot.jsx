import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native"

// styles import
import styles from "../../styles/Depot.styles";

const Depot = ({name, logo, setMapRegion, latitude, longitude}) => {

  return(
    <TouchableOpacity onPress={() => setMapRegion({
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    })}>
      <View style={styles.container}>
        <Image source={{uri: logo}} style={styles.logo}/>
        <Text style={styles.name}>{name}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default Depot