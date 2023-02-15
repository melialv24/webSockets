//Referencias html 
const lblNuevoTicket  = document.querySelector('#lblNuevoTicket')
const btnCrear = document.querySelector('button')


const socket = io();



socket.on('connect', () => {

    socket.on( 'ultimo-ticket', ( ultimo ) => {
        if(ultimo) lblNuevoTicket.innerText = ultimo
    });

    // console.log('Conectado');
    btnCrear.disabled = false

});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');
    btnCrear.disabled = true
});

btnCrear.addEventListener( 'click', () => {

    socket.emit( "siguiente-ticket", null, ( ticket ) => {
        if(ticket) lblNuevoTicket.innerText = ticket
    });

});