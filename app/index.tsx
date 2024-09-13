import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Button, Alert, ImageBackground, FlatList, TouchableOpacity } from 'react-native';
import { characters } from '../data/characters'; // Assurez-vous que le chemin est correct
import { Character } from '../data/types'; // Assurez-vous que le type Character est correctement importé

export default function GuessCharacterGame() {
  const [inputValue, setInputValue] = useState<string>('');
  const [randomCharacter, setRandomCharacter] = useState<Character | null>(null);
  const [attempts, setAttempts] = useState<number>(0);
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);

  // Choisir un personnage aléatoire au chargement du composant
  useEffect(() => {
    pickRandomCharacter();
  }, []);

  // Mettre à jour les suggestions lorsque l'input change
  useEffect(() => {
    if (inputValue) {
      const filtered = characters.filter(character =>
        character.name.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredCharacters(filtered);
    } else {
      setFilteredCharacters([]);
    }
  }, [inputValue]);

  // Fonction pour choisir un personnage aléatoire
  const pickRandomCharacter = () => {
    if (characters && characters.length > 0) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      setRandomCharacter(characters[randomIndex]);
      setAttempts(0); // Réinitialiser les tentatives
    } else {
      console.error("Le tableau 'characters' est vide ou non défini.");
    }
  };

  const handleGuess = () => {
    if (!randomCharacter) {
      Alert.alert('Erreur', 'Aucun personnage sélectionné. Réessayez.');
      return;
    }
  
    if (inputValue.toLowerCase() === randomCharacter.name.toLowerCase()) {
      Alert.alert('Bravo !', `Tu as deviné ${randomCharacter.name} en ${attempts + 1} tentatives.`);
      pickRandomCharacter(); // Choisir un nouveau personnage
      setInputValue(''); // Réinitialiser l'input
    } else {
      setAttempts(attempts + 1);
      Alert.alert('Non, ce n\'est pas le bon personnage.', 'Essayez encore !');
    }
  };
  

  // Fonction pour sélectionner une suggestion
  const selectSuggestion = (name: string) => {
    setInputValue(name);
    setFilteredCharacters([]); // Effacer les suggestions après sélection
  };

  return (
    <ImageBackground
      source={require('@/assets/images/background.png')} // Assurez-vous que le chemin est correct
      style={styles.backgroundImage}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Devinez le personnage de Dragon Ball</Text>
          <Text style={styles.description}>
            Un personnage a été choisi aléatoirement. Essayez de deviner son nom !
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Entrez le nom du personnage"
            placeholderTextColor="gray"
            value={inputValue}
            onChangeText={setInputValue}
          />
          <Button title="Deviner" onPress={handleGuess} />
          {filteredCharacters.length > 0 && (
            <FlatList
              data={filteredCharacters}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => selectSuggestion(item.name)} style={styles.suggestion}>
                  <Text>{item.name}</Text>
                </TouchableOpacity>
              )}
              style={styles.suggestionList}
            />
          )}
          <Text style={styles.attempts}>Tentatives : {attempts}</Text>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  container: {
    width: '80%',
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'black',
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
    color: 'black',
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '100%',
    paddingHorizontal: 8,
    borderRadius: 5,
    backgroundColor: 'white',
    color: 'black',
    marginBottom: 16,
  },
  attempts: {
    marginTop: 10,
    fontSize: 16,
    color: 'black',
  },
  suggestionList: {
    width: '100%',
    maxHeight: 150, // Limiter la hauteur de la liste des suggestions
    marginTop: 10,
  },
  suggestion: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
