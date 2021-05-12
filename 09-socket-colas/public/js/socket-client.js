// References HTMLI Elements
const lblOnline = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');
const txtSms = document.querySelector('#txtSms');
const btnSend = document.querySelector('#btnSend');

// Connect to client
const socketClient = io();

// console.log('socketClient');

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

socketClient.on('send-sms', (payload) => {
  console.log(payload);
});

btnSend.addEventListener('click', () => {
  const sms = txtSms.value;

  const payload = {
    sms,
    id: '123abc',
    date: new Date().getTime(),
  };

  socketClient.emit('send-sms', payload, (id) => {
    console.log('Server -->', id);
  });
});
