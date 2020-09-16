const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

//juego de el ahorcado en una consola, seguramente sea un intento muy largo,
//poco eficiente y confuso de un juego muy simple, pero el resultado parese ser estable y funcional,
//está creado para correr con node.js

//Al utilizar el modulo de readline no se pueden utilizar FOR o WHILE loops porque se queda en bucle, por ello llamo a las funciones recursivamente

// Inicializa el juego
iniciarJuego();

// Jugador1 elige la palabra secreta
function iniciarJuego() {
  let intentos = 6;
  console.clear();
  rl.question('\n Jugador1 elige una palabra\n\n ', (respuesta) => {
    //Eliminamos todos los numeros, símbolos y acéntos de la palabra secreta
    respuesta = respuesta.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    respuesta = respuesta.replace(/[^a-zA-Z ]/g, '');
    //Convertimos a minusculas, eliminamos espacios vacios y separamos si hay mas de una palabra, elegimos sólo la primera
    let palabraSecreta = respuesta.toLowerCase().trim().split(' ')[0];
    rl.question(
      `\n La palabra secreta es ${palabraSecreta}? Si o No?\n\n `,
      (respuesta) => {
        if (
          respuesta.toLowerCase().trim().split(' ')[0] === 'si' ||
          respuesta.toLowerCase().trim().split(' ')[0] === 's'
        ) {
          //Llamamos la función para dibujar la pizarra en blanco
          dibujarPizarra(palabraSecreta, intentos);
        } else {
          //Si no se confirma la palabra secreta volvemos a comenzar el juego
          iniciarJuego(intentos);
        }
      }
    );
  });
}

//función para inciar la pizarra en blanco - no es necesario que sea una función separada pero me parece mas legible asi.
function dibujarPizarra(palabra, intentos) {
  let pizarra = [];
  //Creamos la pizarra con los caracteres "_" por cada letra en la palabra secreta , lo guardamos en un Array
  for (x in palabra) pizarra.push('_');
  console.clear();
  console.log(graficosMuñecos[0]);
  //convertimos el Array pizarra en una string separada por espacios para imprimirla en la consola.
  console.log(' ' + pizarra.join(' '));
  adivinarLetra(palabra, intentos, pizarra);
}

//La función adivinarLetra debe ser una función separada para poder llamarse recursivamente
function adivinarLetra(palabra, intentos, pizarra) {
  //si no quedan intentos ha terminado el juego, saltamos los else y preguntamos si vovlemos a jugar
  if (intentos === 0) {
    console.clear();
    console.log(graficosMuñecos[7]);
    console.log(' Has perdido\n');
  } else if (pizarra.indexOf('_') === -1) {
    // si no quedan '_' en nuestro Array significa que hemos adivinado la palabra y termina el juego, salimos y preguntamos si vovler a jugar
    console.clear();
    console.log(graficosMuñecos[6]);
    console.log(` Has Ganado!\n\n Puntuacion: ${intentos}/6`);
  } else {
    // si no se cumplen las condiciones se suigue el juego y pasamos pedirle una letra al jugador 2
    rl.question('\n Jugador2 adivina una letra.\n\n ', (response) => {
      //preparamos la respuesta para no obtener errores
      response = response.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      response = response.replace(/[^a-zA-Z ]/g, '');
      response = response.toLowerCase().trim().split(' ')[0][0];
      //buscamos en la palabra si encontramos la letra para adivinar
      let index = palabra.search(response);
      //si el índice no es igual a -1 significa que adivinamos la letra
      if (index != -1) {
        //iteramos sobre la palabra para descubrir los índices de las letras repetidas y sustituimos su posicion en el Array con la letra descubierta
        for (let i = 0; i < palabra.length; i++) {
          if (palabra[i] === response) {
            pizarra[i] = response;
          }
        }
        //imprimimos el gráfico correspondiente al numero de intentos restantes y la pizarra actualizada
        console.clear();
        muñeco(intentos);
        console.log(' ' + pizarra.join(' '));
        //volvemos a adivinar palabras, lo hacemos recusivamente llamando a la funcion porque al utilizar readline no podemos usar while loops
        adivinarLetra(palabra, intentos, pizarra);
      } else {
        // si no encontramos el índice hemos fallado, restamos un intento e imprimimos el gráfico correspondiente, mensaje de error y la pizara
        console.clear();
        intentos--;
        muñeco(intentos);
        console.log(` Error! te quedan ${intentos} intentos\n `);
        console.log(' ' + pizarra.join(' '));
        //volvemos a llamar la funcion y seguir intentándo.
        adivinarLetra(palabra, intentos, pizarra);
      }
    });
  }
  //terminan los if/else, el juego a terminado preguntamos si vovler a jugar
  rl.question('\n Jugar de nuevo? Si o No?\n\n ', (respuesta) => {
    if (
      respuesta.toLowerCase().trim().split(' ')[0] === 'si' ||
      respuesta.toLowerCase().trim().split(' ')[0] === 's'
    ) {
      //llamamos el juego nuevamente
      iniciarJuego();
    } else {
      //limpiamos consola, damos gracias y retornamos rl.close()
      console.clear();
      console.log('\n Gracias por jugar!\n ');
      return rl.close();
    }
  });
}

//funcion switch para los distintos casos respecto a los intentos restantes, ganar y perder.
function muñeco(intentos) {
  let muñecoElegir;
  switch (intentos) {
    case 6:
      muñecoElegir = graficosMuñecos[0];
      break;
    case 5:
      muñecoElegir = graficosMuñecos[1];
      break;
    case 4:
      muñecoElegir = graficosMuñecos[2];
      break;
    case 3:
      muñecoElegir = graficosMuñecos[3];
      break;
    case 2:
      muñecoElegir = graficosMuñecos[4];
      break;
    case 1:
      muñecoElegir = graficosMuñecos[5];
      break;
    default:
      muñecoElegir = graficosMuñecos[0];
  }
  console.log(muñecoElegir);
}

//aquí se guardan los gráficos del juego en un Array
const graficosMuñecos = [
  ` 
    ____
   |    | 
   |          
   |        
   |     
   |   
  _|_
 |   |______
 |          |
 |__________|

`,
  `
    ____
   |    | 
   |    O   
   |        
   |    
   |   
  _|_
 |   |______
 |          |
 |__________|

`,
  `
    ____
   |    | 
   |    O   
   |    |    
   |    |
   |   
  _|_
 |   |______
 |          |
 |__________|

`,
  `
    ____
   |    | 
   |    O   
   |   /|    
   |    |
   |   
  _|_
 |   |______
 |          |
 |__________|

`,
  `
    ____
   |    | 
   |    O   
   |   /|\\    
   |    |
   |   
  _|_
 |   |______
 |          |
 |__________|

`,
  `
    ____
   |    | 
   |    O   
   |   /|\\    
   |    |
   |   /
  _|_
 |   |______
 |          |
 |__________|

`,
  ` 
    ____
   |    | 
   |          
   |            O   O
   |   \\O/        *
   |    |       \\___/
  _|_   |
 |   |_/_\\_
 |          |
 |__________|

`,
  `
    ____
   |    | 
   |    O   
   |   /|\\     
   |    |      X   X
   |   / \\       O
  _|_
 |   |_______
 |           |
 |___________|

`,
];
