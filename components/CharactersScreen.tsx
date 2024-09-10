// src/components/CharactersScreen.tsx
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { characters } from '../data/characters'; // Import des données des personnages
import { Character } from '../data/types'; // Import du type Character

const CharactersScreen = () => {
  // Définir le type pour characterList en utilisant l'interface Character
  const [characterList, setCharacterList] = useState<Character[]>([]);

  useEffect(() => {
    // Simule une requête API en récupérant les personnages depuis le fichier
    setCharacterList(characters);
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {characterList.map((character) => (
          <View key={character.id} style={styles.card}>
            <Text style={styles.cardTitle}>{character.name}</Text>
            <Text>Genre: {character.gender}</Text>
            <Text>Affiliation: {character.affiliation}</Text>
            <Text>Transformation: {character.hasTransformation ? 'Oui' : 'Non'}</Text>
            <Text>Couleur: {character.color}</Text>
            <Text>Premier Arc: {character.firstArc}</Text>
            <Text>Taille: {character.height}</Text>
            <Text>Âge: {character.age}</Text>
            <Text>Nombre d'Évolutions: {character.evolutions}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAEAEA',
  },
  scrollContainer: {
    padding: 10,
  },
  card: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CharactersScreen;
