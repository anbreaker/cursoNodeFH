const TicketControl = require('../models/ticket-control');

const ticketControl = new TicketControl();

const socketController = (socket) => {
  socket.on('next-ticket', (payload, callback) => {
    const next = ticketControl.nextTicket();

    callback(next);

    // TODO Notificar ticket pendiente
  });
};

module.exports = { socketController };
