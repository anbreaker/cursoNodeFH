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

  socket.on('recived-sms', (payload) => {
    console.log(payload);
  });

  socket.on('active-users', viewUsersOnWeb);

  socket.on('private-sms', () => {
    // TODO:
  });

  //
};

const viewUsersOnWeb = (users = []) => {
  let usersHtml = '';

  users.forEach((user) => {
    const { name, uid } = user;
    usersHtml += `
    <li>
      <p>
        <h5 class="text-success">${name}</h5>
        <span class="fs-6 text-muted">${uid}</span> 
        Vera ago
      </p> 
    </li> 
    `;
  });

  ulUsers.innerHTML = usersHtml;
};

txtSms.addEventListener('keyup', (event) => {
  const { keyCode } = event;

  const sms = txtSms.value;
  const uid = txtUid.value;

  if (keyCode !== 13) return;

  if (sms.length === 0) return;

  socket.emit('send-sms', { sms, uid });

  txtSms.value = '';
});

const main = async () => {
  await validateJWT();
};

main();
