import React, {useState, useEffect} from 'react';
import io from 'socket.io-client';
import {Link, useLocation} from "react-router-dom";

const ENDPOINT = 'http://localhost:8000';
const socket = io(ENDPOINT);

const App = () => {
    const location = useLocation();

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [serverMessages, setServerMessages] = useState([]);
    const [room, setRoom] = useState(location.state);

    useEffect(() => {
        socket.emit('join', room);
    }, []);

    socket.on('server', (message) => {
        setServerMessages([...serverMessages, message]);
    });

    socket.on('message', (message) => {
        setMessages([...messages, message]);
    });

    socket.on('roomID', (message) => {
        setRoom(message);
    });

    const sendMessage = (e) => {
        e.preventDefault();
        if (message === '') return null;

        socket.emit('sendMessage', message);
        setMessage('')
    };

    return (
        <div>
            <h1>KOmegle</h1>
            <h4>Room id: {room}</h4>
            <button><Link to='/'>New Game</Link></button>
            <ul>
                {messages.map((message, index) => (
                    <li key={index}>{message}</li>
                ))}
            </ul>
            <ul>
                {serverMessages && <li>{serverMessages.map((message, index) =>{
                    return <li key={index}>{message}</li>
                })}</li>}
            </ul>
            <form>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button type="submit" onClick={(e) => sendMessage(e)}>Send</button>
            </form>
        </div>
    );
};

export default App;