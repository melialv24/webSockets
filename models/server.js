const express = require('express');
const cors = require('cors');


class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;
        this.server = require('http').createServer(this.app)
        // Servidor de sockets
        this.io = require('socket.io')(this.server)

        this.paths = {
        }

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();

        //Path para manejo de los eventos por sockets
        this.sockets()
    }

    middlewares() {

        // CORS
        this.app.use( cors() );

        // Directorio Público
        this.app.use( express.static('public') );

    }

    routes() {
        
        //this.app.use( this.paths.auth, require('../routes/auth'));
    
    }

    listen() {
        this.server.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

    // socket.id este es el id del socket pero cambia cada vez que un usuario se desconecta y se vuelve a conectar
    sockets() {
        //Los eventos siempre se deben escuchar dentro de la connection
        this.io.on("connection", (socket) => {

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
            })
        })

         
    }

}




module.exports = Server;