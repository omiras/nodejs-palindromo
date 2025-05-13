// require intentará encontrar el módulo de terceros que le ponganos como parámetro en la carpeta node_modules. 
const express = require('express');
const path = require('path');
const fs = require('fs');

// módulo que hemos instalado con "npm install is-palindrome"
const isPalindrome = require('is-palindrome');

//Creamos una nueva instancia de Express
const app = express();

// Empezar a definir los endpoints (rutas)

app.get("/comprobar", (req, res) => {
    // 1. Extraer la información de la query string y quedarnos con el valor del parámetro "palabra"
    const palabra = req.query.palabra;
    let message;
    // 2. si es palindromo enviar un mensaje y si no lo es, pues 
    if (isPalindrome(palabra)) {
        message = `La palabra ${palabra} es un palíndromo`;
    } else {
        message = `La palabra ${palabra} <strong>NO</strong> es un palíndromo`;
    }
    // hasta que no se ha escrito en el fichero, no podemos ejecutar la siguiente línea
    // TAREA: Usar el método asíncrono
    fs.appendFileSync("consultas.txt", message);
    res.send(message);
});

// Cuando un cliente haga una petición a "/" de tipo GET , ejecutaremos la función de callback del segundo parámetro
app.get("/", (req, res) => {

    // Crea una ruta absoluta des de el directorio actual ubicado en __dirname hasta el fichero formulario.html
    const filePath = path.join(__dirname, 'formulario.html');
    res.sendFile(filePath);
});

// Levantar el servidor
app.listen(3000, () => {
    console.log(`Servidor escuchando en http://localhost:3000`);
});
