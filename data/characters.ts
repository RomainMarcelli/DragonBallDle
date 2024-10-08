// src/data/characters.ts
import { Character } from './types'; // Assurez-vous que le chemin est correct

export const characters: Character[] = [
  {
    id: 1,
    name: 'SanGoku',
    gender: 'Homme',
    affiliation: 'Z Fighters',
    hasTransformation: true,
    color: 'Orange',
    firstArc: 'Saiyan Saga',
    height: '175 cm',
    age: 45,
    evolutions: 4,
  },
  {
    id: 2,
    name: 'Vegeta',
    gender: 'Homme',
    affiliation: 'Z Fighters',
    hasTransformation: true,
    color: 'Bleu',
    firstArc: 'Saiyan Saga',
    height: '164 cm',
    age: 48,
    evolutions: 3,
  },
  {
    id: 3,
    name: 'Piccolo',
    gender: 'Homme',
    affiliation: 'Z Fighters',
    hasTransformation: false,
    color: 'Vert',
    firstArc: 'Saiyan Saga',
    height: '226 cm',
    age: 53,
    evolutions: 2,
  },
  // {
  //   id: 4,
  //   name: 'Frieza',
  //   gender: 'Homme',
  //   affiliation: 'Frieza Force',
  //   hasTransformation: true,
  //   color: 'Blanc et Violet',
  //   firstArc: 'Frieza Saga',
  //   height: '165 cm',
  //   age: 48,
  //   evolutions: 4,
  // },
  // {
  //   id: 5,
  //   name: 'Cell',
  //   gender: 'Homme',
  //   affiliation: 'Cell Games',
  //   hasTransformation: true,
  //   color: 'Vert',
  //   firstArc: 'Cell Saga',
  //   height: '210 cm',
  //   age: 25,
  //   evolutions: 3,
  // },
];
