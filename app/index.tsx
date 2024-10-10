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
  Animated, // Importer Animated
} from 'react-native';
import useGuessCharacterGame from '../src/GuessCharacterGame'; // Importer la logique du jeu
import styles from '../src/styles'; // Importer les styles

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

  const [displayedCharacters, setDisplayedCharacters] = useState(guessedCharacters);
  const [fadeAnim] = useState(new Animated.Value(0)); // Valeur d'animation pour le fondu

  // Mettre à jour les personnages affichés dès que guessedCharacters change
  useEffect(() => {
    setDisplayedCharacters([...guessedCharacters].reverse()); // Inverser l'ordre des personnages devinés
  }, [guessedCharacters]);

  // Fonction pour jouer l'animation de fondu
  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1, // Opacité finale
      duration: 500, // Durée de l'animation en millisecondes
      useNativeDriver: true, // Utiliser le driver natif pour de meilleures performances
    }).start();
  };

  useEffect(() => {
    if (selectedCharacter) {
      fadeIn(); // Jouer l'animation de fondu lorsque selectedCharacter change
    }
  }, [selectedCharacter]);

  const getColorForAttribute = (characterAttr: any, previousCharacterAttr: any) => {
    return characterAttr === previousCharacterAttr ? 'green' : 'red';
  };

  const renderCharacterDetails = (character: any, previousCharacter: any, index: number) => {
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
        <Text style={styles.detailsTitle}>Informations sur le personnage {index + 1} :</Text>
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

  return (
    <ImageBackground
      source={require('../assets/images/background.png')} // Assurez-vous que le chemin de l'image est correct
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

          <Button title="Envoyer" onPress={handleGuess} />

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
