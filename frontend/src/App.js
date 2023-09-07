import React, {useState} from 'react';
import {Link} from 'react-router-dom';

import {Checkbox, Button, FormGroup, TextInput, Section, Heading} from '@carbon/react';
import {TopBar} from "./components/TopBar";
import {ArrowRight} from "@carbon/icons-react";

const App = () => {
    const [room, setRoom] = useState('');
    const [hasRoom, setHasRoom] = useState(false);

    return (
        <>
            <TopBar title='Homepage'/>
            <Section className="centered container" style={{
                marginTop: '5%'
            }}>
                <Heading>Welcome To KOmegle</Heading>
                <FormGroup legendText="">
                    <Checkbox labelText="Have room ID" checked={hasRoom} onChange={() => setHasRoom(!hasRoom)}
                              id='roomIdCheck' className="centered"/>
                    {hasRoom ? <TextInput labelText="Enter room ID" value={room}
                                          onChange={(e) => setRoom(e.target.value)} id="roomId"/> : null}
                </FormGroup>
                <Button as={Link} to={'/chat'} size='sm' state={room} renderIcon={ArrowRight}
                        style={{margin: '1%'}}>{room !== '' ? `Join ${room}` : 'Join Random Room'}</Button>
            </Section>
        </>
    );
};

export default App;