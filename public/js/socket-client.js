
//Referencias del html
const lblOnline = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');
const txtMensaje = document.querySelector('#txtMensaje');
const btnEnviar = document.querySelector('#btnEnviar');

//Socket del cliente que esta usando la aplicacion web
const socket = io()

//Estos son los listeners o observables del lado del cliente
// que estan a la escucha de los cambios del socket

// el on es para estar escuchando un evento, hay eventos predeterminado 
// en socket io como el connect y disconnect
socket.on('connect', () => {
    //console.log('conectado');
    lblOffline.style.display =  'none'
    lblOnline.style.display =  ''
})
// espera el evento de desconexion
socket.on('disconnect', () => {
    //console.log('desconectado');
    lblOnline.style.display =  'none'
    lblOffline.style.display =  ''
})
// espera el evento de enviar-mensaje
socket.on('enviar-mensaje', (payload) => {
    console.log(payload);
})

btnEnviar.addEventListener('click', () => {
    const mensaje = txtMensaje.value
    const payload = {
        mensaje, 
        id: 'jshdjsh890kmn',
        fecha: new Date().getTime()
    }
    //De esta manera emitimos un evento a nuestro socket
    socket.emit('enviar-mensaje', payload)
})