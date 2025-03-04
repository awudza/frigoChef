import React, { useState, useRef } from 'react';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { StyleSheet, View, TouchableOpacity, Image, Text, ActivityIndicator, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';

const fridgeDataPath = FileSystem.documentDirectory + 'storage.json';

const ScannerFrigoScreen = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [photo, setPhoto] = useState(null);
  const [pendingItems, setPendingItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const cameraRef = useRef(null);

  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Ionicons name="alert-circle" size={50} color="red" />
        <TouchableOpacity onPress={requestPermission}>
          <Ionicons name="ios-camera" size={50} color="black" />
        </TouchableOpacity>
      </View>
    );
  }

  const analyzeImageWithClarifai = async (imageUri) => {
    setLoading(true);
    const apiKey = '29346a7d0207488580c6afebc0a49a19';
    const modelId = 'food-item-recognition';
    const url = `https://api.clarifai.com/v2/models/${modelId}/outputs`;

    try {
      const base64Image = await FileSystem.readAsStringAsync(imageUri, { encoding: 'base64' });

      const body = {
        user_app_id: { user_id: 'clarifai', app_id: 'main' },
        inputs: [{ data: { image: { base64: base64Image } } }],
      };

      const response = await axios.post(url, body, {
        headers: {
          'Authorization': `Key ${apiKey}`,
          'Content-Type': 'application/json',
        },
      });

      const concepts = response.data.outputs[0].data.concepts;
      const filteredItems = concepts.filter(item => item.value >= 0.05);
      setPendingItems(filteredItems);
    } catch (error) {
      console.error("Error analyzing image with Clarifai:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveToFridgeData = async (item) => {
    try {
      const fileExists = await FileSystem.getInfoAsync(fridgeDataPath);
      let data = [];

      if (fileExists.exists) {
        const fileContent = await FileSystem.readAsStringAsync(fridgeDataPath);
        data = JSON.parse(fileContent);
      }

      if (!data.some(existing => existing.name.toLowerCase() === item.name.toLowerCase())) {
        data.push({ id: data.length + 1, name: item.name });
        await FileSystem.writeAsStringAsync(fridgeDataPath, JSON.stringify(data, null, 2));
      }
    } catch (error) {
      console.error("Error saving to fridge data:", error);
    }
  };

  const handleConfirmItem = (item) => {
    saveToFridgeData(item);
    setPendingItems(pendingItems.filter(i => i !== item));
  };

  const handleRejectItem = (item) => {
    setPendingItems(pendingItems.filter(i => i !== item));
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const photoData = await cameraRef.current.takePictureAsync();
      setPhoto(photoData.uri);
      await analyzeImageWithClarifai(photoData.uri);
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
      await analyzeImageWithClarifai(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing="back" ref={cameraRef} />
      <View style={styles.controls}>
        <TouchableOpacity style={styles.galleryButton} onPress={pickImage}>
          <Ionicons name="images-outline" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
          <Ionicons name="camera-outline" size={50} color="white" />
        </TouchableOpacity>
      </View>

      {loading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="white" />
          <Text style={styles.loaderText}>Analyzing image...</Text>
        </View>
      )}

      {pendingItems.length > 0 && (
        <View style={styles.alertBox}>
          <Text style={styles.alertTitle}>Detected Ingredients</Text>
          <FlatList
            data={pendingItems}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.alertItem}>
                <Text style={styles.alertText}>{item.name}</Text>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity onPress={() => handleConfirmItem(item)} style={styles.confirmButton}>
                    <Ionicons name="checkmark-circle" size={24} color="white" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleRejectItem(item)} style={styles.rejectButton}>
                    <Ionicons name="close-circle" size={24} color="white" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  permissionContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  camera: { flex: 1, width: '100%' },
  controls: { 
    position: 'absolute', 
    bottom: 30, 
    flexDirection: 'row', 
    width: '100%', 
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20 
  },
  galleryButton: { backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: 20, borderRadius: 50,right:100 },
  captureButton: { backgroundColor: 'rgba(242, 242, 242, 0.5)', padding: 15, borderRadius: 50, right:30 },
  
  loaderContainer: { 
    position: 'absolute', 
    left:'50%',
    transform: [{ translateX: -80 }, { translateY: -50 }],
    backgroundColor: 'rgba(0,0,0,0.7)', 
    padding: 20, 
    borderRadius: 10, 
    marginLeft: '10'
  },
  loaderText: { color: 'white', fontSize: 16, textAlign: 'center', marginTop: 10 },

  alertBox: { 
    position: 'absolute', 
    top: '30%', 
    left: '10%', 
    right: '10%', 
    backgroundColor: 'white', 
    padding: 20, 
    borderRadius: 10, 
    elevation: 10, 
    alignItems: 'center',
    maxHeight: 300,
  },
  alertTitle: { fontSize: 18, fontWeight: 'bold', color: '#37bcaa', marginBottom: 10 },
  alertItem: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingVertical: 10, 
    width: '100%',
  },
  alertText: { fontSize: 16, fontWeight: 'bold', color: '#333', flex: 1, textAlign: 'center' },
  
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', width: '40%' },
  confirmButton: { backgroundColor: 'green', padding: 10, borderRadius: 50, alignItems: 'center' },
  rejectButton: { backgroundColor: 'red', padding: 10, borderRadius: 50, alignItems: 'center' },
});


export default ScannerFrigoScreen;
