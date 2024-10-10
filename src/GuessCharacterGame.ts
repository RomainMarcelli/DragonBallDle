import { useState, useEffect } from 'react';
import { characters } from '../data/characters'; // Assurez-vous que le chemin est correct
import { Character } from '../data/types'; // Assurez-vous que le type Character est correctement importé

export default function useGuessCharacterGame() {
  const [inputValue, setInputValue] = useState<string>('');
  const [randomCharacter, setRandomCharacter] = useState<Character | null>(null);
  const [attempts, setAttempts] = useState<number>(0);
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [guessedCharacters, setGuessedCharacters] = useState<Character[]>([]); // Nouveau state pour stocker les personnages devinés

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
      setInputValue(''); // Réinitialiser l'input quand on choisit un nouveau personnage
      setSelectedCharacter(null); // Réinitialiser le personnage sélectionné
    } else {
      console.error("Le tableau 'characters' est vide ou non défini.");
    }
  };

  const handleGuess = () => {
    if (!randomCharacter) {
      console.error('Erreur : Aucun personnage sélectionné. Réessayez.');
      return;
    }

    console.log("Personnage choisi :", randomCharacter.name); // Debug

    // Rechercher le personnage correspondant à l'input
    const matchedCharacter = characters.find(character =>
      character.name.toLowerCase() === inputValue.toLowerCase()
    );

    // Mettre à jour le personnage sélectionné dès que l'utilisateur devine quelque chose
    setSelectedCharacter(matchedCharacter || null); // Mettre à jour le personnage sélectionné

    if (matchedCharacter) {
      setGuessedCharacters([...guessedCharacters, matchedCharacter]); // Ajouter le personnage deviné à la liste

      // Vérification de la bonne réponse
      if (inputValue.toLowerCase() === randomCharacter.name.toLowerCase()) {
        console.log(`Bravo ! Tu as deviné ${randomCharacter.name} en ${attempts + 1} tentatives.`);
        setInputValue(''); // Réinitialiser l'input après succès
        pickRandomCharacter(); // Choisir un nouveau personnage
      } else {
        setAttempts(attempts + 1);
        console.log('Non, ce n\'est pas le bon personnage. Essayez encore !');
      }
    } else {
      console.warn('Personnage introuvable. Veuillez réessayer.');
      setSelectedCharacter(null);
    }
  };

  // Fonction pour sélectionner une suggestion
  const selectSuggestion = (name: string) => {
    setInputValue(name);
    setFilteredCharacters([]); // Effacer les suggestions après sélection
  };

  return {
    inputValue,
    setInputValue,
    filteredCharacters,
    attempts,
    handleGuess,
    selectSuggestion,
    selectedCharacter,
    guessedCharacters, // Retourner la liste des personnages devinés
  };
}
