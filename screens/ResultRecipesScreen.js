import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, ActivityIndicator } from 'react-native';

const API_KEY = 'bc07022bdf40437492821cf16162cb0e';
const BASE_URL = 'https://api.spoonacular.com/recipes/complexSearch';

const getCuisineByContinent = (continent) => {
  const cuisineMap = {
    Africa: ['African', 'Moroccan', 'Egyptian'],
    Europe: ['French', 'Italian', 'Spanish', 'British', 'German', 'Greek', 'Nordic', 'Irish', 'Eastern European'],
    Asia: ['Asian', 'Chinese', 'Japanese', 'Korean', 'Thai', 'Vietnamese', 'Indian', 'Middle Eastern'],
    America: ['American', 'Mexican', 'Cajun', 'Southern', 'Caribbean', 'Latin American', 'Brazilian'],
    Oceania: ['Australian'],
  };
  
  return cuisineMap[continent] || [];
};

const ResultsRecipesScreen = ({ route, navigation }) => {
  const { searchQuery, category } = route.params;
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      let allRecipes = [];
      setLoading(true);

      if (searchQuery) {
        // Recherche par mot-clé uniquement
        let url = `${BASE_URL}?apiKey=${API_KEY}&number=20&query=${searchQuery}`;
        try {
          const response = await fetch(url);
          const data = await response.json();
          if (data.results) {
            allRecipes = data.results;
          }
        } catch (error) {
          console.error('Error fetching recipes:', error);
        }
      } else if (category) {
        // Recherche par continent avec multi-cuisines
        const cuisines = getCuisineByContinent(category);

        for (const cuisine of cuisines) {
          let url = `${BASE_URL}?apiKey=${API_KEY}&number=5&cuisine=${cuisine}`; // Limiter à 5 par cuisine pour éviter un trop grand nombre
          try {
            const response = await fetch(url);
            const data = await response.json();
            if (data.results) {
              allRecipes = [...allRecipes, ...data.results];
            }
          } catch (error) {
            console.error(`Error fetching recipes for ${cuisine}:`, error);
          }
        }
      }

      setRecipes(allRecipes);
      setLoading(false);
    };

    fetchRecipes();
  }, [searchQuery, category]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Results for "{searchQuery || category}"</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#ff8c00" style={{ marginTop: 20 }} />
      ) : recipes.length > 0 ? (
        recipes.map((recipe) => (
          <TouchableOpacity
            key={recipe.id}
            style={[styles.recipeCard, styles.recipeBorder]}
            onPress={() => navigation.navigate('RecipeDetails', { recipe })}
          >
            <Image source={{ uri: recipe.image }} style={styles.recipeImage} />
            <Text style={styles.recipeTitle}>{recipe.title}</Text>
          </TouchableOpacity>
        ))
      ) : (
        <Text style={styles.noResults}>No recipes found.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#00796b' },
  recipeCard: { 
    backgroundColor: '#fff', 
    borderRadius: 12, 
    marginBottom: 20, 
    overflow: 'hidden', 
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 6,
  },
  recipeBorder: {
    borderWidth: 2, 
    borderColor: '#ff8c00',
  },
  recipeImage: { width: '100%', height: 200, resizeMode: 'cover' },
  recipeTitle: { fontSize: 16, fontWeight: 'bold', textAlign: 'center', padding: 10, color: '#00796b' },
  noResults: { fontSize: 18, textAlign: 'center', marginTop: 50, color: 'gray' },
});

export default ResultsRecipesScreen;
