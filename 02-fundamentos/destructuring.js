const deadpool = {
  nombre: 'Wade',
  apellido: 'Winston',
  poder: 'Regeneración',
  // edad: 50,
  getNombre() {
    return `${this.nombre} ${this.apellido} ${this.poder}`;
  },
};

// const nombre   = deadpool.nombre;
// const apellido = deadpool.apellido;
// const poder    = deadpool.poder;

function imprimeHeroe({ nombre, apellido, poder, edad = 0 }) {
  nombre = 'anbreaker';
  console.log(nombre, apellido, poder, edad);
}

// imprimeHeroe( deadpool );

const heroes = ['Deadpool', 'Superman', 'Batman'];

// const heroe1 = heroes[0];
// const heroe2 = heroes[1];
// const heroe3 = heroes[2];
const [, , heroe3] = heroes;

console.log(heroe3);
