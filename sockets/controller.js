const socketController = (socket) => {

    console.log('Cliente Conectado')

    socket.on('disconnect', () => {
        console.log('Cliente desconectado', socket.id)
    })
    // socket.on es cuando el cliente emite el evento
    //this.io.emit es cuando el servidor emite el vento a todos los sockets conectados
    // este callback es referente al callback que se hizo en el cliente cuando el back le envié una respuesta
    //Con el callback garantizamos que lo que qeremos enviar de regreso solo sea al socket que realizo el llamado del evento
    socket.on("enviar-mensaje", (payload, callback) => {
        const id = 123
        callback(id)
        //this.io.emit('enviar-mensaje', payload)

        //emite al mismo socket
        //socket.emit('enviar-mensaje', payload)

        //emite a todos los sockets menos a el mismo
        socket.broadcast.emit('enviar-mensaje', payload)
    })
}

module.exports = {
    socketController
}