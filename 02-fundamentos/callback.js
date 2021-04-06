// setTimeout( () => {
//     console.log('Hola Mundo');
// } , 1000 );

const getUsuarioByID = (id, callback) => {
  const user = {
    id,
    nombre: 'anbreaker',
  };

  setTimeout(() => {
    callback(user);
  }, 1500);
};

getUsuarioByID(10, (user) => {
  console.log(user.id);
  console.log(user.nombre.toLowerCase());
});

//Destructuring Example
getUsuarioByID(10, ({ id, nombre }) => {
  console.log('\nEjemplo con destructuring...');
  console.log(id);
  console.log(nombre.toLowerCase());
});
