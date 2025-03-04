import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const HelpScreen = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>User Guide for the Recipe App</Text>
      <Text style={styles.introText}>Welcome to the Recipe App! This guide will help you navigate and make the most out of the app.</Text>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Ionicons name="home-outline" size={24} color="#ff8c00" style={styles.icon} />
          <Text style={styles.sectionTitle}>Home Screen</Text>
        </View>
        <Text style={styles.sectionText}>
          When you open the app, a splash screen appears and automatically redirects you to the Menu.
        </Text>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Ionicons name="search-outline" size={24} color="#ff8c00" style={styles.icon} />
          <Text style={styles.sectionTitle}>Search Recipes by Ingredients (Fridge Mode)</Text>
        </View>
        <Text style={styles.sectionText}>
          - Go to the Fridge Screen: This screen lists all the ingredients you have. If it’s empty, add ingredients manually or use the scanner.
        </Text>
        <Text style={styles.sectionText}>
          - Add Ingredients: Click on the "+" button next to an ingredient in the search list. The ingredient gets stored in your virtual fridge.
        </Text>
        <Text style={styles.sectionText}>
          - Scan Your Fridge (optional): If you don’t want to enter ingredients manually, use the camera scanner to recognize food items. The app suggests detected ingredients, and you can confirm or reject them.
        </Text>
        <Text style={styles.sectionText}>
          - Find Recipes: Click the "Search Recipes" button at the bottom of the Fridge Screen. The app will show recipes based on the available ingredients.
        </Text>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Ionicons name="restaurant-outline" size={24} color="#ff8c00" style={styles.icon} />
          <Text style={styles.sectionTitle}>Search Recipes by Name</Text>
        </View>
        <Text style={styles.sectionText}>
          - Go to the Search Screen: Enter the name of a dish in the search bar. Press Enter or click the Search button.
        </Text>
        <Text style={styles.sectionText}>
          - Browse Recipe Results: Click on any recipe card to see details.
        </Text>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Ionicons name="shuffle-outline" size={24} color="#ff8c00" style={styles.icon} />
          <Text style={styles.sectionTitle}>Discover Random Recipes</Text>
        </View>
        <Text style={styles.sectionText}>
          - If you don’t know what to cook, let the app suggest something for you! Go to the Search Screen, scroll down to find randomly suggested recipes, and click on any recipe to see details.
        </Text>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Ionicons name="earth-outline" size={24} color="#ff8c00" style={styles.icon} />
          <Text style={styles.sectionTitle}>Search Recipes by Continent</Text>
        </View>
        <Text style={styles.sectionText}>
          - Explore different cuisines from around the world! Go to the Search Screen, select a continent from the list (Africa, Europe, Asia, America, Oceania), and the app will show recipes from the selected region.
        </Text>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Ionicons name="list-outline" size={24} color="#ff8c00" style={styles.icon} />
          <Text style={styles.sectionTitle}>Recipe Details</Text>
        </View>
        <Text style={styles.sectionText}>
          - Once you select a recipe, you will see:
          Image of the dish
          List of ingredients (with missing ones highlighted)
          Step-by-step instructions
          A back button to return to search results
        </Text>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Ionicons name="help-circle-outline" size={24} color="#ff8c00" style={styles.icon} />
          <Text style={styles.sectionTitle}>Additional Tips</Text>
        </View>
        <Text style={styles.sectionText}>
          - If a recipe doesn’t load, check your internet connection.
        </Text>
        <Text style={styles.sectionText}>
          - If no recipes are found, try adding more ingredients or searching for different terms.
        </Text>
        <Text style={styles.sectionText}>
          - To get the best experience, allow camera access for ingredient scanning.
        </Text>
      </View>

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: '#f4f9f9' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', color: '#00796b', marginBottom: 10 },
  introText: { fontSize: 16, textAlign: 'center', color: '#333', marginBottom: 20 },
  section: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 3, elevation: 3 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 5 },
  icon: { marginRight: 10 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#00796b' },
  sectionText: { fontSize: 14, color: '#333', marginTop: 5 },
  backButton: { flexDirection: 'row', backgroundColor: '#ff8c00', padding: 12, borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginTop: 20 },
  backButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginLeft: 8 },
});

export default HelpScreen;
