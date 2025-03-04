import React, { useState } from 'react';
import { ImageBackground, StyleSheet, View, ActivityIndicator } from 'react-native';
import MenuButtons from '../components/MenuButtons'; 
import FridgeButton from '../components/FridgeButtons'; // Vérifie que le chemin est correct

const MenuScreen = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/BackgroundMenu.png')} 
        style={styles.background}
        resizeMode="cover"
        onLoad={() => setImageLoaded(true)} // Met à jour l'état une fois l'image chargée
      >
        {!imageLoaded ? ( 
          // Affiche un indicateur de chargement si l'image n'est pas encore chargée
          <ActivityIndicator size="large" color="white" style={styles.loader} />
        ) : (
          <View style={styles.overlay}>
            <MenuButtons />
            <FridgeButton />
          </View>
        )}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  loader: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -25 }, { translateY: -25 }], // Centre le loader
  },
});

export default MenuScreen;
