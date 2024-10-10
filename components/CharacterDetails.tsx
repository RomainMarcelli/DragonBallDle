import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import styles from '../src/stylesDetails'; // Assurez-vous que le chemin est correct

// Composant qui prend en props les détails d'un personnage
const CharacterDetails = ({ character }: { character: any }) => {
  if (!character) {
    return null; // Retourner null si aucun personnage n'est sélectionné
  }

  return (
    <View style={styles.detailsContainer}>
      <Text style={styles.detailsTitle}>Détails du personnage:</Text>
      
      {/* Nom */}
      <View style={styles.detailBox}>
        <Text style={styles.detailLabel}>Nom:</Text>
        <Text style={styles.detailValue}>{character.name}</Text>
      </View>
      
      {/* Genre */}
      <View style={styles.detailBox}>
        <Text style={styles.detailLabel}>Genre:</Text>
        <Text style={styles.detailValue}>{character.gender}</Text>
      </View>
      
      {/* Affiliation */}
      <View style={styles.detailBox}>
        <Text style={styles.detailLabel}>Affiliation:</Text>
        <Text style={styles.detailValue}>{character.affiliation}</Text>
      </View>
      
      {/* Race */}
      <View style={styles.detailBox}>
        <Text style={styles.detailLabel}>Race:</Text>
        <Text style={styles.detailValue}>{character.race}</Text>
      </View>

      {/* Transformation */}
      <View style={styles.detailBox}>
        <Text style={styles.detailLabel}>Transformation:</Text>
        <Text style={styles.detailValue}>{character.transformation}</Text>
      </View>

      {/* Vous pouvez ajouter plus de détails ici */}
    </View>
  );
};

export default CharacterDetails;
