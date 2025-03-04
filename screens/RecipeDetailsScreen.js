import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';

const API_KEY = 'bc07022bdf40437492821cf16162cb0e';

const RecipeDetailsScreen = ({ route, navigation }) => {
  const { recipe } = route.params;
  const [detailedRecipe, setDetailedRecipe] = useState(recipe);
  const [loading, setLoading] = useState(!recipe.extendedIngredients || recipe.extendedIngredients.length === 0);

  useEffect(() => {
    if (!recipe.extendedIngredients || recipe.extendedIngredients.length === 0) {
      const fetchRecipeDetails = async () => {
        try {
          const recipeDetails = await fetch(`https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=${API_KEY}`);
          const data = await recipeDetails.json();
          setDetailedRecipe(data);
        } catch (error) {
          console.error("Error loading recipe details:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchRecipeDetails();
    } else {
      setLoading(false);
    }
  }, [recipe]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#37bcaa" />
        <Text style={styles.loaderText}>Loading recipe details...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: detailedRecipe.image }} style={styles.recipeImage} />
      <Text style={styles.recipeTitle}>{detailedRecipe.title}</Text>
      
      <Text style={styles.sectionTitle}>Ingredients</Text>
      <View style={styles.underline} />  

      {detailedRecipe.extendedIngredients.map((ingredient, index) => (
        <Text key={index} style={styles.ingredient}>• {ingredient.original}</Text>
      ))}

      <Text style={styles.sectionTitle}>Preparation</Text>
      <View style={styles.underline} />  

      {detailedRecipe.analyzedInstructions.length > 0 ? (
        detailedRecipe.analyzedInstructions[0].steps.map((step, index) => (
          <View key={index} style={styles.stepContainer}>
            <Text style={styles.stepNumber}>{index + 1}</Text>
            <Text style={styles.step}>{step.step}</Text>
          </View>
        ))
      ) : (
        <Text style={styles.noInstructions}>No instructions available.</Text>
      )}

      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: '#f4f9f9' },
  loaderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f4f9f9' },
  loaderText: { marginTop: 10, fontSize: 16, color: '#00796b' },
  recipeImage: { width: '100%', height: 250, borderRadius: 10, marginBottom: 20 },
  recipeTitle: { fontSize: 26, fontWeight: 'bold', marginBottom: 10, textAlign: 'center', color: '#00796b' },
  
  sectionTitle: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    marginTop: 20, 
    color: '#ff8c00', // Orange title 
  },
  
  underline: { 
    height: 3, 
    backgroundColor: '#ff8c00', 
    width: '30%', 
    marginBottom: 10, 
  },
  
  ingredient: { fontSize: 16, marginTop: 5, color: '#333' },
  stepContainer: { flexDirection: 'row', alignItems: 'flex-start', marginTop: 10 },
  stepNumber: { fontSize: 18, fontWeight: 'bold', color: '#37bcaa', marginRight: 10 },
  step: { fontSize: 16, flex: 1, textAlign: 'justify', color: '#333' },
  noInstructions: { fontSize: 16, fontStyle: 'italic', marginTop: 10, color: '#ff6b6b' },
  

  
});

export default RecipeDetailsScreen;
