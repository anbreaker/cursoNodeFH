// Referer HTMLI Elements
const lblOnline = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');

// Connect to client
const socketClient = io();

console.log('socketClient');

socketClient.on('connect', () => {
  console.log('Connect Server');

  lblOffline.style.display = 'none';
  lblOnline.style.display = '';
});

socketClient.on('disconnect', () => {
  console.log('Disconnect Server');
  lblOnline.style.display = 'none';
  lblOffline.style.display = '';
});
