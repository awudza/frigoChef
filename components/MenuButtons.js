import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import des icônes

const MenuButtons = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.overlay}>
      {/* Titre de la page */}
      <Text style={styles.title}>Menu Principal</Text>

      {/* Bouton Scanner Frigo */}
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('ScannerFrigo')}
      >
        <Icon name="camera" size={20} color="#fff" style={styles.icon} />
        <Text style={styles.buttonText}> Scan my Fridge</Text>
      </TouchableOpacity>

      {/* Bouton Rechercher une recette */}
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('Search')}
      >
        <Icon name="search" size={20} color="#fff" style={styles.icon} />
        <Text style={styles.buttonText}>Search a recipe</Text>
      </TouchableOpacity>

      {/* Bouton Ajouter mes ingrédients */}
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('AddIngredientScreen')}
      >
        <Icon name="plus" size={20} color="#fff" style={styles.icon} />
        <Text style={styles.buttonText}>Add my ingredients</Text>
      </TouchableOpacity>

      {/* Bouton Conseils et astuces */}
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('Help')}
      >
        <Icon name="info-circle" size={20} color="#fff" style={styles.icon} />
        <Text style={styles.buttonText}>Help</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    height: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.6)', 
    borderRadius: 20,
    padding: 20, 
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#215E21',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#fa6e0e', 
    padding: 15,
    width: '100%',
    marginBottom: 20,
    borderRadius: 5,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#215E21', 
    flexDirection: 'row', 
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff', 
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10, 
  },
  icon: {
    marginRight: 10, 
  },
});

export default MenuButtons;
