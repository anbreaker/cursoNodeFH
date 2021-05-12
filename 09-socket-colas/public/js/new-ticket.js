// References HTMLI Elements
const lblNewTicket = document.querySelector('#lblNewTicket');
const btnCreate = document.querySelector('button');

// Connect to client
const socketClient = io();
// console.log('socketClient');

socketClient.on('connect', () => {
  // console.log('Connect Server');
  btnCreate.disabled = false;
});

socketClient.on('disconnect', () => {
  // console.log('Disconnect Server');
  btnCreate.disabled = true;
});

btnCreate.addEventListener('click', () => {
  socketClient.emit('next-ticket', null, (ticket) => {
    lblNewTicket.innerText = ticket;
  });
});
