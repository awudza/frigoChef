import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';

const API_KEY = 'bc07022bdf40437492821cf16162cb0e';
const BASE_URL = 'https://api.spoonacular.com/recipes/findByIngredients';

const IngredientSearchResultsScreen = ({ route, navigation }) => {
  const { ingredients } = route.params;
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const ingredientsString = ingredients.join(',');
        const url = `${BASE_URL}?apiKey=${API_KEY}&ingredients=${ingredientsString}&number=10`;

        const response = await fetch(url);
        const data = await response.json();

        if (data.length > 0) {
          setRecipes(data);
        }
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [ingredients]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#37bcaa" />
        <Text style={styles.loaderText}>Loading recipes...</Text>
      </View>
    );
  }

  const handleImagePress = (recipe) => {
    navigation.navigate('RecipeDetails', { recipe });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Recipes Found</Text>

      {recipes.length > 0 ? (
        recipes.map((recipe) => {
          const missingIngredients = recipe.missedIngredients.map(item => item.name);

          return (
            <View key={recipe.id} style={styles.recipeCard}>
              {recipe.image && (
                <TouchableOpacity onPress={() => handleImagePress(recipe)}>
                  <Image source={{ uri: recipe.image }} style={styles.recipeImage} />
                </TouchableOpacity>
              )}

              <Text style={styles.recipeTitle}>{recipe.title}</Text>

              {missingIngredients.length > 0 && (
                <Text style={styles.missingIngredients}>
                  Missing ingredients: <Text style={styles.missingList}>{missingIngredients.join(', ')}</Text>
                </Text>
              )}
            </View>
          );
        })
      ) : (
        <Text style={styles.noResults}>No recipes found.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: '#f4f9f9' },
  loaderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f4f9f9' },
  loaderText: { marginTop: 10, fontSize: 16, color: '#00796b' },

  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 20, 
    textAlign: 'center', 
    color: '#00796b' 
  },

  recipeCard: { 
    backgroundColor: '#fff', 
    padding: 15, 
    borderRadius: 10, 
    marginBottom: 20, 
    borderWidth: 2, 
    borderColor: '#ff8c00', // Bordure orange
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },

  recipeImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
    marginBottom: 10,
  },

  recipeTitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    color: '#00796b',
    marginBottom: 5,
  },

  missingIngredients: { 
    fontSize: 16, 
    fontStyle: 'italic', 
    color: '#ff8c00', 
    textAlign: 'center', 
    marginTop: 10 
  },

  missingList: { 
    fontWeight: 'bold', 
    color: '#ff8c00' 
  },

  noResults: { 
    fontSize: 18, 
    textAlign: 'center', 
    marginTop: 50, 
    color: 'gray' 
  },
});

export default IngredientSearchResultsScreen;
