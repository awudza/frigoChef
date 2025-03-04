import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import MenuScreen from './screens/MenuScreen';
import AddIngredientScreen from './screens/AddIngredientScreen';
import ScannerFrigoScreen from './screens/ScannerFrigoScreen'; 
import FridgeScreen from './screens/FridgeScreen'; 
import SearchScreen from './screens/SearchScreen';
import RecipeDetailsScreen from './screens/RecipeDetailsScreen';
import ResultsRecipesScreen from './screens/ResultRecipesScreen';
import IngredientSearchResultsScreen from './screens/IngredientSearchResultsScreen';
import HelpScreen from './screens/HelpScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{
            headerShown: false
          }} 
        />
        <Stack.Screen 
          name="Menu" 
          component={MenuScreen} 
          options={{
            headerShown:false
          }}
        />
        <Stack.Screen 
          name="AddIngredientScreen" 
          component={AddIngredientScreen} 
        />
        <Stack.Screen 
          name="Fridge" 
          component={FridgeScreen} 
        />
        <Stack.Screen name="ScannerFrigo" component={ScannerFrigoScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="RecipeDetails" component={RecipeDetailsScreen} />
        <Stack.Screen name="ResultsRecipes" component={ResultsRecipesScreen} />
        <Stack.Screen name="IngredientSearchResults" component={IngredientSearchResultsScreen} />
        <Stack.Screen name="Help" component={HelpScreen} />




      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
