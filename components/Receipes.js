// Recipes.js
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import MasonryList from 'react-native-masonry-list'; // Import de la bibliothèque

const Recipes = ({ randomRecipes }) => {
  const formattedRecipes = randomRecipes.map(recipe => ({
    source: { uri: recipe.image },
    name: recipe.title,
    content: recipe.title,
  }));

  return (
    <View style={styles.recipesContainer}>
      <Text style={styles.categoriesTitle}>Recettes suggérées :</Text>
      
      {/* Utilisation de MasonryList pour afficher les recettes sous forme de grille */}
      <MasonryList
        data={formattedRecipes}
        columns={2} // Nombre de colonnes dans la grille
        renderItem={({ item }) => (
          <View style={styles.recipeCard}>
            <Image source={item.source} style={styles.recipeImage} />
            <Text style={styles.recipeTitle}>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  recipesContainer: {
    marginTop: 20,
  },
  categoriesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  recipeCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginBottom: 20,
    overflow: 'hidden',
    width: '100%',
  },
  recipeImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  recipeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
  },
});

export default Recipes;
