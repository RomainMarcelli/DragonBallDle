import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, ImageBackground, TouchableOpacity } from 'react-native';
import { characters } from '../data/characters'; // Assurez-vous que le chemin est correct
import { Character } from '../data/types'; // Importer le type des personnages

export default function HomeScreen() {
  const [inputValue, setInputValue] = useState<string>('');
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);

  const handleInputChange = (text: string) => {
    setInputValue(text);
    const filtered = characters.filter(character =>
      character.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredCharacters(filtered);
  };

  const renderItem = ({ item }: { item: Character }) => (
    <TouchableOpacity style={styles.suggestion}>
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <ImageBackground
      source={require('@/assets/images/background.png')} // Assurez-vous que le chemin est correct
      style={styles.backgroundImage}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Dragon Ball DLE</Text>
          <Text style={styles.description}>Ceci est un texte en dessous du titre.</Text>
          <TextInput
            style={styles.input}
            placeholder="Entrez quelque chose ici"
            placeholderTextColor="gray"
            value={inputValue}
            onChangeText={handleInputChange}
          />
          {inputValue.length > 0 && (
            <FlatList
              data={filteredCharacters}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderItem}
              style={styles.suggestionsList}
            />
          )}
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
  },
  suggestionsList: {
    width: '100%',
    maxHeight: 200,
    marginTop: 10,
  },
  suggestion: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
