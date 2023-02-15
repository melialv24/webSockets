//Referencias
const lblEscritorio = document.querySelector('h1')
const lblTicket = document.querySelector('small')
const btnAtender = document.querySelector('button')
const divAlerta = document.querySelector('.alert')
const lblPendientes = document.querySelector('#lblPendientes')

const searchParams = new URLSearchParams(window.location.search)
if(!searchParams.has('escritorio')){
    throw new Error('El escritorio es obligatorio')
}

const escritorio = searchParams.get('escritorio')
lblEscritorio.innerText = escritorio
divAlerta.style.display = 'none'

const socket = io();

socket.on('connect', () => {

    // console.log('Conectado');
    btnAtender.disabled = false

});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');
    btnAtender.disabled = true
});

socket.on('ultimo-ticket', (ultimo) => {

});

socket.on('cola', (cantidad) => {

    // console.log('Conectado');
    if(cantidad === 0){
        lblPendientes.style.display = 'none'
    }else{
        lblPendientes.style.display = ''
        lblPendientes.innerText = cantidad
    }

});

btnAtender.addEventListener( 'click', () => {

    socket.emit('atender-ticket', {escritorio}, ({ok, msg, ticket}) => {
        if(!ok){
            lblTicket.innerText = `Nadie.`
            return divAlerta.style.display = ''
        }

        lblTicket.innerText = `Ticket ${ticket.numero}`
    })

    /*socket.emit( "siguiente-ticket", null, ( ticket ) => {
        if(ticket) lblNuevoTicket.innerText = ticket
    });*/

});