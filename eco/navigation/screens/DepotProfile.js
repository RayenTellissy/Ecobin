import React, { useEffect, useState } from "react";
import { View, Image, Text, ScrollView } from "react-native";
import axios from "axios";

const DepotProfile = () => {
  const [depots, setDepots] = useState([]);

  useEffect(() => {
    // Axios GET request to fetch depot data from the backend
    axios
      .get("http://192.168.104.7:3000/depots")
      .then((response) => {
        setDepots(response.data);
      })
      .catch((error) => {
        console.error("Error fetching depot data:", error);
      });
  }, []);

  if (depots.length === 0) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView>
    {depots.map((depot) => (
      <View key={depot.id}>
        <Image source={{ uri: depot.Picture }} style={styles.image} />

        <View style={styles.container}>
          <Text style={styles.title}>Depot Profile</Text>
          <Text>
            <Text style={styles.property}>Name:</Text> {depot.Name}
          </Text>
          <Text>
            <Text style={styles.property}>Longitude:</Text>{" "}
            {depot.Longitude}
          </Text>
          <Text>
            <Text style={styles.property}>Latitude:</Text> {depot.Latitude}
          </Text>
          <Text>
            <Text style={styles.property}>Capacity:</Text> {depot.Capacity}
          </Text>
          <Text>
            <Text style={styles.property}>State:</Text> {depot.State}
          </Text>
        </View>
      </View>
    ))}
  </ScrollView>
  );
};

const styles = {
  image: {
    width: 200,
    height: 200,
  },
  container: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  property: {
    fontWeight: "bold",
  },
};

export default DepotProfile;
