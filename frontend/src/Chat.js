import React, {useState, useEffect} from 'react';
import io from 'socket.io-client';
import {useLocation} from "react-router-dom";

import {Section, ToastNotification, TextInput, FormGroup, Button} from "@carbon/react";

import {TopBar} from "./components/TopBar";

const ENDPOINT = 'http://localhost:8000';
const socket = io(ENDPOINT);

const App = () => {
    const location = useLocation();

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [room, setRoom] = useState(location.state);
    const [notification, setNotification] = useState(false);
    const [user, setUser] = useState("");

    socket.on('server', (message) => {
        setMessages([...messages, {message, user: "Server", type: "server"}]);
    });

    socket.on('message', (message) => {
        setMessages([...messages, message]);
        goToBottom();
    });

    socket.on('roomID', (message) => {
        const {room, user} = message;
        setRoom(() => room);
        setUser(() => user);
    });

    const sendMessage = (e) => {
        e.preventDefault();
        if (message === '') return null;

        socket.emit('sendMessage', {message, timestamp: Date.now(), user, type: "normal"});
        setMessage('')
    };

    const toastNotification = (title, subtitle, caption, kind, role) => {
        return <ToastNotification
            aria-label="closes notification"
            caption={caption}
            onClose={function noRefCheck() {
                setNotification(false);
            }}
            statusIconDescription="notification"
            subtitle={subtitle}
            title={title}
            kind={kind}
            role={role}
            className="notification-container"
            timeout={2000}
            onCloseButtonClick={
                function noRefCheck() {
                    setNotification(false);
                }
            }/>
    }

    const goToBottom = () => {
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
        });
    };

    const messageTemplate = (message, index) => {
        if (message.type === "server") {
            return <li key={index}
                       className="server-message">{message.message}</li>
        }
        return <li key={index}
                   className={user === message.user ? "self-message" : "other-message"}>{message.message}</li>
    }

    useEffect(() => {
        socket.emit('join', room);
    }, [room]);

    return (
        <>
            <TopBar title="Chat"/>
            {notification && toastNotification("Room id copied", "", "", "success", "alert")}
            <Section style={{marginTop: "5%"}} className="container centered">
                <h3 style={{cursor: "pointer", marginBottom: "2%"}} onClick={
                    () => {
                        navigator.clipboard.writeText(room).then(
                            () => setNotification(true)
                        )
                    }
                }>Room id: <strong>{room}</strong></h3>
            </Section>
            <Section style={{marginTop: "5%"}} className="container">
                <ul style={{display: "flex", flexDirection: "column"}}>
                    {messages.map((message, index) => (
                        messageTemplate(message, index)
                    ))}
                </ul>
                <FormGroup legendText="" style={{marginTop: '2%', marginBottom: "5%"}} className="centered">
                    <TextInput
                        id="message"
                        labelText="Enter Your Message"
                        placeholder="Press enter To Send"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' ? sendMessage(e) : null}
                    />
                    <Button style={{marginTop: "1%"}} onClick={(e) => sendMessage(e)}>Send</Button>
                </FormGroup>
            </Section>
        </>
    );
};

export default App;