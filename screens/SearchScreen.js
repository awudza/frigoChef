import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Image, ActivityIndicator } from 'react-native';

const API_KEY = 'bc07022bdf40437492821cf16162cb0e';
const API_URL = `https://api.spoonacular.com/recipes/random?number=20&apiKey=${API_KEY}`;

const SearchScreen = ({ navigation }) => {
  const [query, setQuery] = useState('');
  const [randomRecipes, setRandomRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRandomRecipes = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        if (data.recipes) {
          setRandomRecipes(data.recipes);
        }
      } catch (error) {
        console.error('Error fetching recipes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRandomRecipes();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.slogan}>Turn Your Fridge into a Feast!</Text>
        
        <TextInput
          style={styles.searchInput}
          placeholder="Search for recipes..."
          placeholderTextColor="#999"
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={() => {
            if (query.trim() !== '') {
              navigation.navigate('ResultsRecipes', { searchQuery: query });
            }
          }}
        />

        <View style={styles.categoriesContainer}>
          <Text style={styles.categoriesTitle}>Categories by Continent</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
            {['Africa', 'Europe', 'Asia', 'America', 'Oceania'].map((continent) => (
              <TouchableOpacity
                key={continent}
                style={styles.categoryBubble}
                onPress={() => navigation.navigate('ResultsRecipes', { category: continent })}
              >
                <Text style={styles.categoryText}>{continent}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.recipesContainer}>
          <Text style={styles.categoriesTitle}>Suggested Recipes</Text>
          {loading ? (
            <ActivityIndicator size="large" color="#ff8c00" style={{ marginTop: 20 }} />
          ) : (
            randomRecipes.map((recipe) => (
              <TouchableOpacity
                key={recipe.id}
                style={[styles.recipeCard, styles.recipeBorder]}
                onPress={() => navigation.navigate('RecipeDetails', { recipe })}
              >
                <Image source={{ uri: recipe.image }} style={styles.recipeImage} />
                <Text style={styles.recipeTitle}>{recipe.title}</Text>
              </TouchableOpacity>
            ))
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: { flexGrow: 1 },
  container: { flex: 1, padding: 20, backgroundColor: '#f4f9f9' }, 
  slogan: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#00796b' },
  
  searchInput: { 
    height: 50, 
    borderColor: '#ccc', 
    borderWidth: 2, 
    borderRadius: 25, 
    paddingLeft: 15, 
    marginBottom: 20, 
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#333'
  },

  categoriesContainer: { marginBottom: 20 },
  categoriesTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: '#00796b' },
  categoriesScroll: { flexDirection: 'row' },
  categoryBubble: { 
    backgroundColor: '#37bcaa', 
    paddingVertical: 12, 
    paddingHorizontal: 20, 
    borderRadius: 20, 
    marginRight: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.5,
    elevation: 4,
  },
  categoryText: { color: 'white', fontSize: 16, fontWeight: 'bold' },

  recipesContainer: { marginTop: 20 },
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
});

export default SearchScreen;
