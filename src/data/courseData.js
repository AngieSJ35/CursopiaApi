// src/data/courseData.js

export const courseData = [
  {
    id: 1,
    title: 'PASO 1',
    grammar: [
      { 
        id: 'personal-pronouns',
        title: 'Personal Pronouns',
        content: [
          { type: 'heading', text: 'PERSONAL PRONOUNS' },
          { type: 'image', src: '/src/assets/img1PerPro.jpg'},
          { type: 'image', src: '/src/assets/img2PerPro.jpg'},
          { type: 'image', src: '/src/assets/img3PerPro.jpg'},
          { type: 'image', src: '/src/assets/img4PerPro.jpg'},
          { type: 'image', src: '/src/assets/img5PerPro.jpg'},
          { type: 'image', src: '/src/assets/img6PerPro.jpg'},
          { 
            type: 'activity', 
            title: 'Actividad', 
            sentences: [
              '___ name is Maria. ___ am Felipe. (Mi nombre es Maria. Yo soy Felipe.)',
              '___ is a dog. ___ best friend is the man. (Es un perro. Su mejor amigo es el hombre.)',
            ] 
          },
        ]
      },
      { 
        id: 'possessive-adjectives', 
        title: 'Possessive Adjectives',
        // --- SECCIÓN CORREGIDA ---
        // El contenido ahora es solo un título, una imagen principal y la actividad.
        content: [
          { type: 'heading', text: 'POSSESSIVE ADJECTIVES' },
          // ¡Importante! Asegúrate de que tu imagen se llame así en la carpeta /src/assets
          { type: 'image', src: '/src/assets/img1SimPre.png'},
          { 
            type: 'activity', 
            title: 'Actividad', 
            sentences: [
              'This is ___ house. (Esta es mi casa.)',
              'What is ___ name? (¿Cuál es su nombre [de usted]?)',
              '___ brother is tall. (Su hermano [de ella] es alto.)',
            ] 
          },
        ] 
      },
      { 
        id: 'simple-present', 
        title: 'Simple Present',
        // --- NUEVO CONTENIDO PARA SIMPLE PRESENT ---
        content: [
          { type: 'heading', text: 'SIMPLE PRESENT' },
          // ¡Importante! Nombra tu imagen así en la carpeta /src/assets
          { type: 'image', src: '/src/assets/img1SimPre.png'},
          { 
            type: 'activity', 
            title: 'Actividad', 
            sentences: [
              "I ___ play soccer. (Yo juego fútbol.)",
              "You ___ my best friend. (Tú eres mi mejor amigo.)",
              "Any questions. (Ellos no tienen ninguna pregunta.)"
            ] 
          },
        ]
      },
      { 
        id: 'plurals-avsan', 
        title: 'Plurals A vs. An',
        // --- NUEVO CONTENIDO PARA PLURALS A VS. AN ---
        content: [
          { type: 'heading', text: 'PLURALS, A vs. AN' },
          // ¡Importante! Nombra tu imagen así en la carpeta /src/assets
          { type: 'image', src: '/src/assets/img1AvsAn.png'},
          { 
            type: 'activity', 
            title: 'Actividad', 
            // La actividad ahora es un objeto para manejar las dos partes
            activity_type: 'mixed',
            parts: [
              {
                instruction: '1. Escribe "a" o "an" en los espacios:',
                sentences: [
                  'I see ___ UFO in front of my house! (¡Veo un OVNI [Yu-ef-ou] frente a mi casa!)',
                  'She is ___ honest person. (Ella es una persona honesta)',
                  'He has ___ old car. (Él tiene un carro viejo)',
                  'This is ___ useful tool. (Esta es una herramienta útil)',
                  'Everyone has ___ home here. (Todos tienen un hogar aquí)'
                ]
              },
              {
                instruction: '2. Escribe la forma correcta del sustantivo entre paréntesis:',
                sentences: [
                  'I hate (person) ___ that are irresponsible. (Odio la gente que es irresponsable)',
                  'She has three (kid) ___. (Ella tiene 3 niñas)',
                  'There are many (bush) ___ in the forest. (Hay muchos arbustos en el bosque)',
                  'Our (wife) ___ talk in the kitchen. (Nuestras esposas hablan en la cocina)',
                  'The (baby) ___ are crying. (Los bebés están llorando)',
                  'I bought two (book) ___ yesterday. (Compré dos libros ayer)'
                ]
              }
            ]
          },
        ]
      },
    ],
    vocabulary: [
      { id: 'alphabet', title: 'Alphabet', content: [ { type: 'heading', text: 'Contenido de Alphabet Próximamente' } ] },
      { id: 'daily-routines', title: 'Daily Routines', content: [ { type: 'heading', text: 'Contenido de Daily Routines Próximamente' } ] },
      { id: 'most-common-verbs', title: 'Most common verbs', content: [ { type: 'heading', text: 'Contenido de Most common verbs Próximamente' } ] },
      { id: 'adjectives', title: 'Adjectives', content: [ { type: 'heading', text: 'Contenido de Adjectives Próximamente' } ] },
    ],
  },
  // ... Pasos 2 al 7 ...
];