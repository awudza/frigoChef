import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as FileSystem from 'expo-file-system';

const fridgeDataPath = FileSystem.documentDirectory + 'storage.json';

const FridgeScreen = ({ navigation }) => {
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
      }
    };

    loadFridgeData();
  }, []);

  const handleRemoveIngredient = async (ingredient) => {
    const updatedIngredients = ingredients.filter(item => item.name !== ingredient.name);
    try {
      await FileSystem.writeAsStringAsync(fridgeDataPath, JSON.stringify(updatedIngredients));
      setIngredients(updatedIngredients);
    } catch (error) {
      console.error("Erreur lors de la suppression de l'ingrédient:", error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>{item.name}</Text>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => handleRemoveIngredient(item)}
      >
        <Text style={styles.buttonText}>-</Text>
      </TouchableOpacity>
    </View>
  );

  const handleSearchRecipes = () => {
    navigation.navigate('IngredientSearchResults', { ingredients: ingredients.map(ingredient => ingredient.name) });
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#37bcaa" />
        <Text style={styles.loaderText}>Chargement des ingrédients...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={ingredients}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
      />
      <TouchableOpacity style={styles.searchButton} onPress={handleSearchRecipes}>
        <Text style={styles.buttonText}>Search recipe</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f9f9',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f9f9',
  },
  loaderText: {
    marginTop: 10,
    fontSize: 16,
    color: '#00796b',
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
    flex: 1,
  },
  removeButton: {
    backgroundColor: '#ff6b6b',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  searchButton: {
    backgroundColor: '#37bcaa',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
  },
});

export default FridgeScreen;
