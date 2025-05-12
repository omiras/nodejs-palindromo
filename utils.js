function esPalindromo(palabra) {
  const normalizada = palabra.toLowerCase().replace(/[^a-z0-9]/g, '');
  const invertida = normalizada.split('').reverse().join('');
  return normalizada === invertida;
}

// ofrecemos la función esPalindromo a otros ficheros por si quieren utilizarla (a estos ficheros también se le llaman módulos)
// Exporto la función 'esPalindromo' y le pongo como nombre al recurso 'esPelindromo'
module.exports.esPalindromo = esPalindromo;
