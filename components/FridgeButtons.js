import React from 'react';
import { TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const FridgeButton = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity 
      style={styles.button} 
      onPress={() => navigation.navigate('Fridge')} 
    >
      <Image 
        source={require('../assets/fridge.png')} 
        style={styles.icon}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    top: 80, 
    right: 20, 
    backgroundColor: '#37bcaa',
    borderRadius: 50,
    width: 60, 
    height: 60, 
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1, 
  },
  icon: {
    width: 40,
    height: 40, 
    resizeMode: 'contain', 
  },
});

export default FridgeButton;
