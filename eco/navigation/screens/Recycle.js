import React, { useState, useRef, useEffect } from 'react';
import { ScrollView, TextInput, TouchableOpacity, Text, StyleSheet, SafeAreaView, Animated, View, Image, Easing, Linking } from 'react-native';
import * as Animatable from 'react-native-animatable';
import axios from 'axios';
import Modal from 'react-native-modal';
import { Picker } from '@react-native-picker/picker';
import MapView, { Marker } from 'react-native-maps';

const Recycle = () => {
  const inputAnim = useRef(new Animated.Value(300)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const [inputWidth, setInputWidth] = useState(200);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [depots, setDepots] = useState([]);
  const [selectedDepot, setSelectedDepot] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedMedal, setSelectedMedal] = useState('');
  const [depotItems, setDepotItems] = useState([]);
  

  useEffect(() => {
    const fetchDepots = async () => {
      try {
        const response = await axios.get(
          `https://ecobin.onrender.com/depot/search?query=${query}`
        );
        setDepots(response.data);
      } catch (error) {
        console.error('Error searching depots:', error.message);
      }
      setIsLoading(false);
    };

    if (query.length > 0) {
      setIsLoading(true);
      fetchDepots();
    } else {
      setDepots([]);
    }
  }, [query]);

  useEffect(() => {
    if (selectedMedal === 'Capacity') {
      Animated.timing(progressAnim, {
        toValue: (parseInt(selectedDepot.capacity.current) / parseInt(selectedDepot.capacity.total)) * 100,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();
    }
  }, [selectedMedal, selectedDepot]);
  

  const handleFocus = () => {
    Animated.timing(inputAnim, {
      toValue: 20,
      duration: 500,
      useNativeDriver: true,
    }).start();
    setInputWidth(300);
  };

  const handleBlur = () => {
    Animated.timing(inputAnim, {
      toValue: 300,
      duration: 500,
      useNativeDriver: true,
    }).start();
    setInputWidth(250);
  };

  const handleCardPress = async (depot) => {
    setSelectedDepot(depot);
    setModalVisible(true);

    try {
      const response = await axios.get(`https://ecobin.onrender.com/items/${depot.id}`);
      setDepotItems(response.data);
    } catch (error) {
      console.error('Error fetching depot items:', error.message);
    }
  };

  const handleMedalChange = (medal) => {
    setSelectedMedal(medal);

    if (medal === 'Location') {
      setSelectedDepot({ ...selectedDepot, selectedMedal: 'Location' });
    }
  };
  const progressValueStyle = {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderTopWidth: 5,
    borderTopColor: 'red',
    borderRightWidth: 5,
    borderRightColor: 'red',
    position: 'absolute',
    transform: [
      {
        rotate: progressAnim.interpolate({
          inputRange: [0, 100],
          outputRange: ['0deg', '360deg'],
        }),
      },
    ],
    rotation: progressAnim.interpolate({
      inputRange: [0, 100],
      outputRange: ['0deg', '360deg'],
    }),
  };
  
  
  

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <Animated.View
          style={[styles.input, { transform: [{ translateY: inputAnim }], width: inputWidth }]}
        >
          <TextInput
            style={styles.textInput}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder="enter depot name or city..."
            onChangeText={setQuery}
          />
          {isLoading ? (
            <Animatable.View style={styles.loaderContainer} animation="fadeIn" duration={100}>
              <Animatable.Image
                animation="rotate"
                easing="linear"
                iterationCount="infinite"
                source={{ uri: 'https://i.ibb.co/7WN6XFp/recycle-symbol.png' }}
                style={styles.loaderIcon}
              />
            </Animatable.View>
          ) : null}
        </Animated.View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
       
        {depots.map((depot) => (
          <TouchableOpacity
            key={depot.id}
            style={styles.card}
            onPress={() => handleCardPress(depot)}
          >
            <View style={styles.cardTitleContainer}>
            
              <Text style={styles.cardTitle}>{depot.name}</Text>
            </View>
           
            <Image source={{ uri: depot.picture }} style={styles.cardImage} />
            <Text style={styles.cardText}>Times: {depot.worktime.substring(4)}</Text>
            <View style={styles.cardDetails}></View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
        onBackButtonPress={() => setModalVisible(false)}
        animationIn="fadeIn"
        animationOut="fadeOut"
        backdropOpacity={0.5}
        style={styles.modal}
      >
        <ScrollView contentContainerStyle={styles.modalContent}>
          {selectedDepot && (
            <>
              <Text style={styles.modalTitle}>
                {selectedDepot.name}
                {selectedDepot.worktime.substring(4)}
              </Text>
              <Image source={{ uri: selectedDepot.picture }} style={styles.modalImage} />

           
              <Picker
                selectedValue={selectedMedal}
                style={styles.medalPicker}
                onValueChange={handleMedalChange}
              >
                <Picker.Item label="Location" value={'Location'} />
                <Picker.Item label="Capacity" value={'Capacity'} />
                <Picker.Item label="Accepted Products" value={'Accepted Products'} />
                <Picker.Item label="Certificate of Use" value={'Certificate of Use'} />
              </Picker>

          
              {selectedMedal === 'Location' && (
                <MapView
                  style={styles.map}
                  region={{
                    latitude: selectedDepot.latitude,
                    longitude: selectedDepot.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}
                >
                  <Marker
                    coordinate={{
                      latitude: selectedDepot.latitude,
                      longitude: selectedDepot.longitude,
                    }}
                  />
                </MapView>
              )}
           
              {selectedMedal === 'Accepted Products' && (
                <ScrollView style={styles.modalScrollView}>
                  {selectedDepot &&
                    depotItems.map((item) => (
                      <View key={item.id} style={styles.itemContainer}>
                        <View style={styles.itemBorder}>
                          <Text style={styles.itemName}>{item.name}</Text>
                          <Image style={styles.itemImage} source={{ uri: item.image }} />
                          <Text style={styles.itemType}>{item.type}</Text>
                        </View>
                      </View>
                    ))}
                </ScrollView>
              )}
              {selectedMedal === 'Capacity' && (
                <View style={styles.progressRing}>
                  <Animated.View style={[styles.progressValue, progressValueStyle]} />
                  <Text style={styles.progressText}>{`${Math.round(
                    (parseInt(selectedDepot.capacity.current) /
                      parseInt(selectedDepot.capacity.total)) *
                      100
                  )}%`}</Text>
                  <Text style={styles.filled}>Filled</Text>
                  <Text style={styles.capacityTex}>Total Capacity : {selectedDepot.capacity.total} </Text>
                </View>
              )}
             {selectedMedal === 'Certificate of Use' && (
  <TouchableOpacity
    style={styles.downloadButton}
    onPress={() => Linking.openURL(selectedDepot.certificate)}
  >
    <Text style={styles.downloadButtonText}>DOWNLOAD CERTIFICATE</Text>
  </TouchableOpacity>
)}

              {selectedMedal !== 'Location' &&
                selectedMedal !== 'Accepted Products' &&
                selectedMedal !== 'Capacity' &&
                selectedMedal !== 'Certificate of Use' &&  (
                  <Text style={styles.modalText}>{selectedMedal}</Text>
                )}
            </>
          )}
        </ScrollView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    position: 'absolute',
    top: -10,
    left: 66,
    right: 0,
    zIndex: 1,
  },
  input: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    elevation: 3,
    width: 14,
    justifyContent: 'center',
    left : 10
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    padding: 0,
    
  },
  loaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  loaderIcon: {
    width: 30,
    height: 30,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 20,
  },
  card: {
    top: 50,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    elevation: 4,
    width: 370,
    marginBottom: 20,
  },
  cardTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 10,
  },
  cardDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modal: {
    top: 40,
    margin: 0,
    justifyContent: 'flex-end',
    padding: 5,
    elevation: 4,
    width: 400,
    marginLeft: 10,
    height: 500, 
    marginBottom: 20, 
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
   height : -100
    
  },
  modalTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  medalPicker: {
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: '#f2f2f2',
    elevation: 2,
  },
  map: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginBottom: 10,
  },
  modalScrollView: {
    maxHeight: 300,
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#f2f2f2',
    height : 80
  },
  itemBorder: {
    height : 40 ,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemName: {
    color : 'green' ,
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 10,
  },
  itemImage: {
    width: 30,
    height: 30,
    borderRadius: 5,
    marginRight: 10,
  },
  itemType: {
    fontSize: 12,
  },
  progressRing: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 5,
    borderColor: 'lightgreen',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 50,
  },
  progressValue: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderTopWidth: 5,
    borderTopColor: 'lightgreen',
    borderRightWidth: 5,
    borderRightColor: 'lightgreen',
    position: 'absolute',
  },
  progressText: {
    top : 30,
    fontSize: 25,
    fontWeight: 'bold',
    color: 'green',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  } ,
  downloadButton: {
    backgroundColor: 'grey',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: 'center',
  },
  downloadButtonText: {
    color: 'lightgreen',
    fontSize: 16,
    fontWeight: 'bold',
  },
  capacityTex: {
    top : 100,
   textAlign:'auto',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom : 10,
    width: 300,
    left : 50
    
  },
  filled : {
    top: 30,
    fontSize : 15,
    fontWeight : 'bold'
  }
});

export default Recycle;
