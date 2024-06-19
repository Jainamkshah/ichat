const socket = io('http://localhost:8002');

const form = document.getElementById('send-box')
const message = document.getElementById('mesbox')
const msgcontainer = document.querySelector(".container")
var audio = new Audio('sound.mp3');

const append = (message,position)=>{
    const msgelement = document.createElement('div');
    msgelement.innerText = message;
    msgelement.classList.add('message')
    msgelement.classList.add(position)
    msgcontainer.append(msgelement);
    if(position === 'left'){
        audio.play();
    }
    
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const messagee = message.value;
    append(`You: ${messagee}`, 'right');
    socket.emit('send',messagee);
    message.value = '';
})

const namee = prompt("Enter your name here");
socket.emit('new-user-join', namee);

socket.on('user-joined', namee=>{
    append(`${namee} joined the chat`, 'center')
})

socket.on('receive', data=>{
    append(`${data.name}: ${data.message}`, 'left')
})

socket.on('left', name=>{
    append(`${name} left the chat`, 'center')
})


