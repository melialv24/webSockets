const TicketControl = require("../models/ticket-control")

const ticketControl = new TicketControl()

const socketController = (socket) => {

    //console.log('Cliente Conectado')

    /*socket.on('disconnect', () => {
       console.log('Cliente desconectado', socket.id)
    })*/

    socket.emit('ultimo-ticket',  ticketControl.ultimo)
    socket.emit('estado-actual',  ticketControl.ultimos4)
    socket.emit('cola',  ticketControl.tickets.length)

    socket.on('atender-ticket', ({escritorio}, callback) => {
        if(!escritorio){
            callback({
                ok: false,
                msg: 'El escritorio es obligatorio'
            })
        }

        const ticket = ticketControl.atenderTicket(escritorio)
        
        socket.broadcast.emit('estado-actual',  ticketControl.ultimos4)
        socket.emit('cola',  ticketControl.tickets.length)
        socket.broadcast.emit('cola',  ticketControl.tickets.length)
        
        if( !ticket ){
            callback({
                ok: false, 
                msg: 'No hay tickets por atender.'
            })
        }else{
            callback({
                ok: true, 
                ticket
            })

        }
        
    })

    
    // socket.on es cuando el cliente emite el evento
    //this.io.emit es cuando el servidor emite el vento a todos los sockets conectados
    // este callback es referente al callback que se hizo en el cliente cuando el back le envié una respuesta
    //Con el callback garantizamos que lo que qeremos enviar de regreso solo sea al socket que realizo el llamado del evento
    socket.on("siguiente-ticket", (payload, callback) => {
        //this.io.emit('enviar-mensaje', payload)

        //emite al mismo socket
        //socket.emit('enviar-mensaje', payload)

        //emite a todos los sockets menos a el mismo
        //socket.broadcast.emit('enviar-mensaje', payload)

        const siguiente = ticketControl.siguiente()
        socket.broadcast.emit('cola',  ticketControl.tickets.length)
        callback( siguiente )

        //TODO Notificar que hay un nuevo ticket pendiente de asignar
    })
}

module.exports = {
    socketController
}