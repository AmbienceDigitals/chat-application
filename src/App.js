import React from 'react';
import {ChatEngine} from 'react-chat-engine';
import ChatFeed from './components/ChatFeed';
import './App.css';
import LoginForm from './components/LoginForm';

const App = () => {
    // conditional statement to retrieve messages on login
    if (!localStorage.getItem('username')) return <LoginForm></LoginForm>

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

export default App;
