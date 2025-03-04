import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import * as FileSystem from 'expo-file-system';
import ingredientsData from '../assets/ingredient.json'; 

const fridgeDataPath = FileSystem.documentDirectory + 'storage.json';

const AddIngredientScreen = () => {
  const [ingredients, setIngredients] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredIngredients, setFilteredIngredients] = useState([]);

  useEffect(() => {
    const loadFridgeData = async () => {
      try {
        const fileExists = await FileSystem.getInfoAsync(fridgeDataPath);
        if (fileExists.exists) {
          const fileContent = await FileSystem.readAsStringAsync(fridgeDataPath);
          const data = JSON.parse(fileContent);
          setIngredients(data);
        }
      } catch (error) {
        console.error("Erreur lors de la lecture du fichier:", error);
      }
    };

    loadFridgeData();
  }, []);

  useEffect(() => {
    const filtered = ingredientsData.filter((ingredient) =>
      ingredient.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredIngredients(filtered);
  }, [searchQuery]);

  const handleAddIngredient = async (ingredient) => {
    const newIngredients = [...ingredients, { name: ingredient }];
    try {
      await FileSystem.writeAsStringAsync(fridgeDataPath, JSON.stringify(newIngredients));
      setIngredients(newIngredients);
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'ingrédient:", error);
    }
  };

  const handleRemoveIngredient = async (ingredient) => {
    const updatedIngredients = ingredients.filter(item => item.name !== ingredient);
    try {
      await FileSystem.writeAsStringAsync(fridgeDataPath, JSON.stringify(updatedIngredients));
      setIngredients(updatedIngredients);
    } catch (error) {
      console.error("Erreur lors de la suppression de l'ingrédient:", error);
    }
  };

  const renderItem = ({ item }) => {
    const isInFridge = ingredients.some(ingredient => ingredient.name === item);

    return (
      <View style={styles.item}>
        <Text style={styles.itemText}>{item}</Text>
        <TouchableOpacity
          style={[styles.button, isInFridge ? styles.removeButton : styles.addButton]} 
          onPress={() => {
            if (isInFridge) {
              handleRemoveIngredient(item); 
            } else {
              handleAddIngredient(item); 
            }
          }}
        >
          <Text style={styles.buttonText}>{isInFridge ? '-' : '+'}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Rechercher un ingrédient"
        placeholderTextColor="#ccc"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredIngredients}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f9f9',
  },
  searchInput: {
    height: 50,
    borderColor: '#37bcaa',
    borderWidth: 2,
    borderRadius: 25,
    paddingLeft: 15,
    fontSize: 16,
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#e0f2f1',
  },
  itemText: {
    fontSize: 18,
    color: '#00796b',
    fontWeight: 'bold',
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  addButton: {
    backgroundColor: '#37bcaa',
  },
  removeButton: {
    backgroundColor: '#ff6b6b',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddIngredientScreen;
