// Estamos importando el módulo interno http
// Estamos desestructurando el objeto http para quedarnos únicamente con el método createServer

const { createServer } = require('http');

// módulo interno de nodejs (built-in module). Un conjunto de funcionalidades que tienes acceso simplemente por haber instalado NodeJS
const url = require('url');

// queremos importar (requerir) las funcionalidades presentes en el fichero utils.js
const utils = require('./utils.js');
const {esPalindromo} = utils; // const esPalindromo = utils.esPalindromo

 
// Es una dirección IP privada que nos sirve para referirnos a la misma máquina donde se está ejecutando el script
const hostname = '127.0.0.1';
// El puerto es una subdivisión lógica de los ordenadores que nos permite comunicarnos con el servidor
const port = 3000;

// createServer tiene como mínimo un parámetro: una funciónde callback. Esta función se ejecuta cuando un cliente hace una petición a este servidor. Tiene dos parámetros: req->Request (información sobre el cliente que hace la petición), res->Response (ofrece métodos y propiedades para configurar la respuesta)
const server = createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);

    // Me quedo con las propiedades path y query
    // path-> la ruta a donde se ha hecho la petición (también llamado endpoint)
    // query->un objeto con la información sobre la query string
    const { pathname, query } = parsedUrl;

    if (pathname == "/") {
          res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.write(`
<form action="/comprobar" method="get">
  <label for="palabra">Palabra a comprobar:</label><br>
  <input type="text" id="palabra" name="palabra" value=""><br>
  <input type="submit" value="Comprobar">
</form> 
            `)
        res.end();
    }

    if (pathname == "/comprobar") {

        const {palabra} = query; // const palabra = query.palabra; Es lo mismo! Solo que en el primer caso, usamos el operador de desestrucutración
        console.log("🚀 ~ server ~ palabra:", palabra)
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');

        // Si la palabra es un palíndromo devolver un mensaje, si no devolver otro
        if (esPalindromo(palabra)) {
            res.end(`La palabra ${palabra} SI un palíndromo`);
        } else {
            res.end(`La palabra ${palabra} NO un palíndromo`)
        }
    }

});

// server es un objeto. Listen es un metodo que pone a escuchar el servidor en un puerto determinado y una ip 
// el tercer parámetro es una función de callback. Se ejecuta cuando conseguimos levantar el servidor
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

