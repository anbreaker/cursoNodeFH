const url = window.location.hostname.includes('localhost')
  ? 'http://localhost:3000/api/auth/'
  : 'https://curso-nodefh.herokuapp.com/api/auth/';

let user = null;
let socket = null;

// References HTMLI Elements
const btnExit = document.querySelector('#btnExit');
const txtSms = document.querySelector('#txtSms');
const txtUid = document.querySelector('#txtUid');
const ulUsers = document.querySelector('#ulUsers');
const sms = document.querySelector('#sms');

// Validate token LocalStorage
const validateJWT = async () => {
  const token = localStorage.getItem('token') || '';

  if (token.length <= 10) {
    window.location = 'index.html';
    throw new Error('Token Not Valid on LocalStorage');
  }

  try {
    const response = await fetch(url, {
      headers: { bearer: token },
    });

    const { user: userDB, token: tokenDB } = await response.json();
    localStorage.setItem('token', tokenDB);
    user = userDB;
    document.title = user.name;

    await connectSocket();
  } catch (error) {
    window.location = 'index.html';
    console.log(error);
  }
};

const connectSocket = async () => {
  socket = io({
    extraHeaders: {
      bearer: localStorage.getItem('token'),
    },
  });

  // Listener
  socket.on('connect', () => console.log('Sockets Online'));

  socket.on('disconnect', () => console.log('Sockets Offline'));

  socket.on('recived-sms', () => {
    // TODO:
  });

  socket.on('active-users', () => {
    // TODO:
  });

  socket.on('private-sms', () => {
    // TODO:
  });

  //
};

const main = async () => {
  await validateJWT();
};

main();
