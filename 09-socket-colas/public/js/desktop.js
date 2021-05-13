// References HTMLI Elements
const lblDesktop = document.querySelector('h1');
const lblTicket = document.querySelector('small');
const btnAttend = document.querySelector('button');
const divAlert = document.querySelector('.alert');

const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('desktop')) {
  window.location = 'index.html';

  throw new Error('Desktop is Mandatory');
}

const desktop = searchParams.get('desktop');
lblDesktop.innerHTML = desktop;
divAlert.style.display = 'none';

// Connect to client
const socketClient = io();
// console.log('socketClient');

socketClient.on('connect', () => {
  // console.log('Connect Server');
  btnAttend.disabled = false;
});

socketClient.on('disconnect', () => {
  // console.log('Disconnect Server');
  btnAttend.disabled = true;
});

socketClient.on('last-ticket', (last) => {
  // lblNewTicket.innerText = `Ticket ${last}`;
});

btnAttend.addEventListener('click', () => {
  const payload = { desktop };

  socketClient.emit('attend-ticket', payload, ({ ok, ticket, msg }) => {
    if (!ok) {
      lblTicket.innerText = `No More Tickets`;
      return (divAlert.style.display = '');
    }

    lblTicket.innerText = `Ticket ${ticket.number}`;
  });
});
