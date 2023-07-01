import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [useCamera, setUseCamera] = useState(false);
  const cameraRef = useRef(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const takePicture = async () => {
    if (cameraRef) {
      console.log('in take picture');
      try {
        let photo = await cameraRef.current.takePictureAsync({
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        return photo;
      } catch (e) {
        console.log(e);
      }
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      return result;
    }
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {useCamera ? (
        <View>
          <Camera style={styles.camera} type={type} ref={cameraRef}>
            <View style={{ flex: 9 }}></View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setUseCamera(false);
                }}>
                <Text style={styles.text}>CANCEL</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setType(
                    type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back
                  );
                }}>
                <Text style={styles.text}>Flip</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button]}
                onPress={async () => {
                  console.log('in take pic');
                  const r = await takePicture();
                  setUseCamera(false);
                  if (!r.cancelled) {
                    setImage(r.uri);
                  }
                  console.log('response', JSON.stringify(r));
                }}>
                <Text style={styles.text}>PICTURE</Text>
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      ) : (
        <>
          <View style={{ width: '100%' }}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={[styles.button]}
                onPress={async () => {
                  console.log('in pick photo');
                  const r = await pickImage();
                  if (!r.cancelled) {
                    setImage(r.uri);
                  }
                  console.log('response', JSON.stringify(r));
                }}>
                <Text style={styles.text}> PICK PICTURE </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button]}
                onPress={async () => {
                  console.log('in pick camera');
                  setUseCamera(true);
                }}>
                <Text style={styles.text}> PICK CAMERA </Text>
              </TouchableOpacity>
            </View>
            <View style={{ width: '100%', alignItems: 'center' }}>
              {true && (
                <Image
                  source={{ uri: image }}
                  style={{ width: 200, height: 200, backgroundColor: 'blue' }}
                />
              )}
            </View>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    minWidth: '100%',
    flex: 1,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 40,
    margin: 8,
    backgroundColor: 'grey',
  },
  text: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});