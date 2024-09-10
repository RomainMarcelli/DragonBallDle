// components/CharacterCard.tsx
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface CharacterProps {
  name: string;
  gender: string;
  affiliation: string;
  hasTransformation: boolean;
  color: string;
  firstArc: string;
  height: string;
  age: number;
  evolutions: number;
}

const CharacterCard: React.FC<CharacterProps> = ({
  name,
  gender,
  affiliation,
  hasTransformation,
  color,
  firstArc,
  height,
  age,
  evolutions
}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{name}</Text>
      <Text>Genre: {gender}</Text>
      <Text>Affiliation: {affiliation}</Text>
      <Text>Transformation: {hasTransformation ? 'Oui' : 'Non'}</Text>
      <Text>Couleur: {color}</Text>
      <Text>Premier Arc: {firstArc}</Text>
      <Text>Taille: {height}</Text>
      <Text>Âge: {age}</Text>
      <Text>Nombre d'Évolutions: {evolutions}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 15,
    margin: 10,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent background
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default CharacterCard;
