import React, {useEffect, useState} from 'react';
import {ChatEngine} from 'react-chat-engine';
import ChatFeed from './ChatFeed';
import './../App.css';
import {useHistory} from 'react-router-dom';

const Chats = () => {
    const history = useHistory();
    // const [refresh, setRefresh] = useState(false);

    const [login, setLogin] = useState(localStorage.getItem('username'));

    const check = () => {
        if (!login) {
            history.push('/');
            window.location.reload();
        }
        setLogin(!login)
    }
    // conditional statement to retrieve messages on login
useEffect(() => {
    check();
    return () => {
        window.location.reload(login)
    }
}, [])

    return (
        <div>
            <ChatEngine
            height='100vh'
            projectID="07b488b1-b00e-42ca-88a1-52ffe93814aa"
            userName={localStorage.getItem('username')}
            userSecret={localStorage.getItem('password')}
            // sending chatAppProps into ChatFeed component
            renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps}></ChatFeed>}></ChatEngine>
        </div>
    )
}

export default Chats;
