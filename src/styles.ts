// styles.ts
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: 'white',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: 'white',
  },
  suggestion: {
    padding: 10,
    backgroundColor: 'white',
    marginVertical: 5,
    borderRadius: 5,
  },
  suggestionList: {
    maxHeight: 100,
  },
  attempts: {
    fontSize: 16,
    color: 'white',
    marginTop: 10,
  },
  detailsContainer: {
    marginTop: 20,
    flexDirection: 'row', // Permet d'afficher les détails horizontalement
    flexWrap: 'wrap', // S'assure que les détails passent à la ligne si l'espace est insuffisant
    justifyContent: 'center', // Centrer les détails horizontalement
  },
  detailsTitle: {
    fontSize: 18,
    color: 'white',
    marginBottom: 10,
    textAlign: 'center',
  },
  detailBox: {
    width: 120,
    height: 120,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    marginVertical: 10, // Pour espacer verticalement les détails
    padding: 10,
    shadowColor: '#000', // Ajout d'une ombre pour donner du relief aux boxes
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // Pour Android, similaire à l'ombre
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
    textAlign: 'center',
  },
  detailValue: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
  // Ajout pour gérer l'empilement des détails
  characterDetails: {
    marginBottom: 15, // Ajoute de l'espace entre les personnages
    flexDirection: 'column', // Empile les détails verticalement
    alignItems: 'center',
  },
});
