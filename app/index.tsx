import React, { useEffect, useState } from 'react';
import {
  Text,
  TextInput,
  View,
  Button,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Animated,
} from 'react-native';
import useGuessCharacterGame from '../src/GuessCharacterGame';
import styles from '../src/styles';
import { Character } from 'data/types';

export default function GuessCharacterGameScreen() {
  const {
    inputValue,
    setInputValue,
    filteredCharacters,
    attempts,
    handleGuess,
    selectSuggestion,
    selectedCharacter,
    guessedCharacters,
  } = useGuessCharacterGame();

  const [displayedCharacters, setDisplayedCharacters] = useState<Character[]>(guessedCharacters);
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    setDisplayedCharacters([...guessedCharacters].reverse());
  }, [guessedCharacters]);

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    if (selectedCharacter) {
      fadeIn();
    }
  }, [selectedCharacter]);

  const getColorForAttribute = (characterAttr: any, previousCharacterAttr: any) => {
    return characterAttr === previousCharacterAttr ? 'green' : 'red';
  };

  const renderCharacterDetails = (character: Character, previousCharacter: Character | null, index: number) => {
    if (!previousCharacter) return null;

    const details = [
      { label: 'Nom', value: character.name },
      { label: 'Genre', value: character.gender, color: getColorForAttribute(character.gender, previousCharacter.gender) },
      { label: 'Affiliation', value: character.affiliation, color: getColorForAttribute(character.affiliation, previousCharacter.affiliation) },
      { label: 'Transformation', value: character.hasTransformation ? 'Oui' : 'Non', color: getColorForAttribute(character.hasTransformation, previousCharacter.hasTransformation) },
      { label: 'Couleur', value: character.color, color: getColorForAttribute(character.color, previousCharacter.color) },
      { label: 'Premier arc', value: character.firstArc, color: getColorForAttribute(character.firstArc, previousCharacter.firstArc) },
      { label: 'Taille', value: character.height, color: getColorForAttribute(character.height, previousCharacter.height) },
      { label: 'Âge', value: character.age, color: getColorForAttribute(character.age, previousCharacter.age) },
      { label: 'Évolutions', value: character.evolutions, color: getColorForAttribute(character.evolutions, previousCharacter.evolutions) },
    ];

    return (
      <Animated.View key={index} style={[styles.detailsContainer, { opacity: fadeAnim }]}>
        <Text style={styles.detailsTitle}>Informations sur le personnage :</Text>
        <ScrollView horizontal>
          {details.map((detail, idx) => (
            <View key={idx} style={[styles.detailBox, { backgroundColor: detail.color }]}>
              <Text style={styles.detailLabel}>{detail.label} :</Text>
              <Text style={styles.detailValue}>{detail.value}</Text>
            </View>
          ))}
        </ScrollView>
      </Animated.View>
    );
  };

  const handleGuessUpdated = () => {
    handleGuess();

    const matchedCharacter = filteredCharacters.find(character =>
      character.name.toLowerCase() === inputValue.toLowerCase()
    );

    if (matchedCharacter) {
      selectSuggestion(matchedCharacter.name);
      setInputValue('');

      // Ajoutez le personnage deviné à guessedCharacters
      setDisplayedCharacters(prev => [...prev, matchedCharacter]);
    }

    console.log("Matched Character: ", matchedCharacter);
    console.log("Guessed Characters: ", guessedCharacters);
  };

  return (
    <ImageBackground
      source={require('../assets/images/background.png')}
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

          <Button title="Envoyer" onPress={handleGuessUpdated} />

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

          {/* Affichage des détails des personnages devinés, du plus récent au plus ancien */}
          {displayedCharacters.length > 0 && (
            <View>
              {displayedCharacters.map((character, index) => (
                renderCharacterDetails(character, displayedCharacters[index - 1], index)
              ))}
            </View>
          )}
        </View>
      </View>
    </ImageBackground>
  );
}
