import React, { useState, useEffect } from "react";
import { View, Text, Alert, StyleSheet, FlatList } from "react-native"
import MapView, { Marker } from "react-native-maps"
import * as Location from "expo-location"
import axios from "axios"

// secret variable import
import { server_url } from "../../secret"

import depot from "../../assets/depot.png"

const Map = ({ mapRegion, setMapRegion, userRegion, setUserRegion, query }) => {

  const [depots,setDepots] = useState([])

  useEffect(() => {
    userLocation() // getting user's location with gps
    fetchDepots() // getting depots from database
  },[])

  const fetchDepots = async () => {
    const response = await axios.get(`${server_url}/depots/getAll`) // fetching all depots from database
    setDepots(response.data)
  }

  const userLocation = async () => {

    var { status } = await Location.requestForegroundPermissionsAsync() // asking user's permission to get location

    // if the user has denied the requests, it returns an alert
    if(status !== "granted"){
      Alert.alert("Location access denied", "Location access revoked.")
    }

    const location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true }) // getting the user's location

    const foundLocation = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    }
    setMapRegion(foundLocation)
    setUserRegion(foundLocation)

  }

  return (
    <View>
      <MapView
        style={query === "" ? styles.largeMap : styles.map}
        region={mapRegion}
        showsUserLocation={true}
      >
        {userRegion && <Marker coordinate={userRegion} title="You"/>}

        {depots.map( (e,i) => <Marker key={i} coordinate={{
          latitude: e.latitude,
          longitude: e.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
          image={depot}
          title={e.name}
        />)}

      </MapView>
    </View>
  )
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "65%",
  },
  largeMap: {
    height: "100%",
    width: "100%"
  }
})

export default Map