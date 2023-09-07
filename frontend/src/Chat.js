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
    const [serverMessages, setServerMessages] = useState("");
    const [room, setRoom] = useState(location.state);
    const [notification, setNotification] = useState(false);
    const [serverNotification, setServerNotification] = useState(false);

    socket.on('server', (message) => {
        setServerMessages(message);
        setServerNotification(true);
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

    const toastNotification = (title, subtitle, caption, kind, role) => {
        return <ToastNotification
            aria-label="closes notification"
            caption={caption}
            onClose={function noRefCheck() {
                setNotification(false)
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
                    setNotification(false)
                }
            }/>
    }

    useEffect(() => {
        socket.emit('join', room);
    }, []);

    return (
        <>
            <TopBar title="Chat"/>
            <Section style={{marginTop: "5%"}} className="container">
                {notification && toastNotification("Room id copied", "", "", "success", "alert")}
                {serverNotification && toastNotification("Server message", serverMessages, "", "info", "alert")}
                <h3 style={{cursor: "pointer", marginBottom: "2%"}} onClick={
                    () => {
                        navigator.clipboard.writeText(room).then(
                            () => setNotification(true)
                        )
                    }
                }>Room id: <strong>{room}</strong></h3>
                <ul>
                    {messages.map((message, index) => (
                        <li key={index}>{message}</li>
                    ))}
                </ul>
                <FormGroup legendText="" style={{width: "50%"}}>
                    <TextInput
                        id="message"
                        labelText="Message"
                        placeholder="Enter your message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <Button style={{marginTop: "1%"}} onClick={(e) => sendMessage(e)}>Send</Button>
                </FormGroup>
            </Section>
        </>
    );
};

export default App;