const TicketControl = require('../models/ticket-control');

const ticketControl = new TicketControl();

const socketController = (socket) => {
  socket.emit('last-ticket', ticketControl.last);

  socket.on('next-ticket', (payload, callback) => {
    const next = ticketControl.nextTicket();

    callback(next);

    // TODO Notificar ticket pendiente
  });

  socket.on('attend-ticket', ({ desktop }, callback) => {
    if (!desktop) {
      return callback({
        ok: false,
        msg: 'Desktop is Mandatory',
      });
    }

    const ticket = ticketControl.attendTicket(desktop);

    // TODO: Notificar cambio en last4

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
