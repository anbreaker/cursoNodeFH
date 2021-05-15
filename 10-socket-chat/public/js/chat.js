const url = window.location.hostname.includes('localhost')
  ? 'http://localhost:3000/api/auth/'
  : 'https://curso-nodefh.herokuapp.com/api/auth/';

let user = null;
let socket = null;

// Validate token LocalStorage
const validateJWT = async () => {
  const token = localStorage.getItem('token') || '';

  if (token.length <= 10) {
    window.location = 'index.html';
    throw new Error('Token Not Valid on LocalStorage');
  }

  const response = await fetch(url, {
    headers: { bearer: token },
  });

  const { user: userDB, token: tokenDB } = await response.json();
  console.log(userDB, tokenDB);

  localStorage.setItem('token', tokenDB);
  user = userDB;
};

const main = async () => {
  await validateJWT();
};

main();

// const socket = io();
