const socketClient = io()

const username = document.getElementById('username');
const inputMessage = document.getElementById('message')
const form = document.getElementById('form')
const log = document.getElementById('messageLogs')

let user = null;

if(!user){
    Swal.fire({
        title: 'Login',
        input: 'text',
        text: 'Please enter your email address',
        inputValidator: (value) => {
            return !value && 'Please enter your email address'
        },
        allowOutsideClick: false,
        allowEscapeKey: false
    }).then (result =>{
        user = result.value;
        username.innerHTML=user
        socketClient.emit('authenticated', user)
    });
}

form.onsubmit = (e) => {
    e.preventDefault()
    const data = {
        user: user,
        message: inputMessage.value
    }
    socketClient.emit('message', data)
    inputMessage.value = ' '
}

socketClient.on('chatbox', (messages) => {
    let messagesLogs = ''
    messages.forEach((message)=>{
        messagesLogs += `<p><strong>${message.user}</strong>:${message.message}`
    })
    log.innerHTML = messagesLogs
})

socketClient.on('newUserConnected', data => {
    Swal.fire({
        toast: true,
        position: 'top-end',
        timer: 3000,
        title: `${data} se ha unido al chat`,
        icon: 'success'
    })
})