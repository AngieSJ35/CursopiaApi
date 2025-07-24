// src/data/literacyCourseData.js
export const literacyCourseData = [
  {
    id: 1,
    title: 'PASO 1: Las Vocales',
    grammar: ['Identificar A, E, I, O, U', 'Sonidos de las vocales', 'Mayúsculas y minúsculas', 'Trazos básicos'],
    vocabulary: ['Mi Nombre', 'Palabras con A', 'Palabras con E', 'Objetos comunes'],
  },
  {
    id: 2,
    title: 'PASO 2: Primeras Consonantes',
    grammar: ['La letra M', 'La letra P', 'La letra S', 'Formando sílabas (ma, pe, si)'],
    vocabulary: ['Mamá', 'Papá', 'Sopa', 'Mesa'],
  },
  {
    id: 3,
    title: 'PASO 3: Construyendo Palabras',
    grammar: ['La letra L', 'La letra T', 'Uniendo sílabas', 'Palabras de dos sílabas'],
    vocabulary: ['Loma', 'Pato', 'Sol', 'Tela'],
  },
  // Rellenamos el resto con contenido de plantilla
  ...Array.from({ length: 4 }, (_, i) => ({
    id: i + 4,
    title: `PASO ${i + 4}`,
    grammar: ['Nueva letra', 'Combinaciones', 'Reglas simples', 'Ejercicios de escritura'],
    vocabulary: ['Palabras nuevas', 'Objetos del hogar', 'Familia', 'Acciones diarias'],
  })),
];