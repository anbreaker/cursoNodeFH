const TicketControl = require('../models/ticket-control');

const ticketControl = new TicketControl();

const socketController = (socket) => {
  // Client Connect
  socket.emit('last-ticket', ticketControl.last);
  socket.emit('current-status', ticketControl.last4);
  socket.emit('pending-tickets', ticketControl.tickets.length);

  socket.on('next-ticket', (payload, callback) => {
    const next = ticketControl.nextTicket();

    callback(next);
    socket.broadcast.emit('pending-tickets', ticketControl.tickets.length);
  });

  socket.on('attend-ticket', ({ desktop }, callback) => {
    if (!desktop) {
      return callback({
        ok: false,
        msg: 'Desktop is Mandatory',
      });
    }

    const ticket = ticketControl.attendTicket(desktop);
    socket.emit('pending-tickets', ticketControl.tickets.length);
    socket.broadcast.emit('pending-tickets', ticketControl.tickets.length);

    // Notificar cambio en last4
    socket.broadcast.emit('current-status', ticketControl.last4);

    if (!ticket) {
      callback({
        ok: false,
        msg: 'There are no more tickets pending',
      });
    } else {
      callback({
        ok: true,
        ticket,
      });
    }
  });
};

module.exports = { socketController };
