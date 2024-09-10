// /src/AppLayout.tsx (ou autre fichier de navigation)
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './app/index'; // Votre page d'accueil
import CharactersScreen from './components/CharactersScreen'; // Page des personnages

const Tab = createBottomTabNavigator();

export default function AppLayout() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Characters" component={CharactersScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
