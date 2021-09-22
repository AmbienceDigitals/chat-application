import React from 'react';
import MessageForm from './MessageForm';
import MyMessage from './MyMessage';
import TheirMessage from './TheirMessage';

const ChatFeed = (props) => {
    const {chats, activeChat, userName, messages} = props;

    // checking if chats exist and returning active chat
    const chat = chats && chats[activeChat]

    const renderReadReceipts = (message, isMyMessage) => {
        return chat.people.map((person, index) => person.last_read === message.id && (
            <div
            key={`read_${index}`}
            className='read-receipt'
            style={{
                float: isMyMessage? 'right' : 'left',
                backgroundImage:`url(${person?.person?.avatar})`
            }}></div>
        ))
    }

    const renderMessages = () => {
        // returning the keys of all messages
        const keys = Object.keys(messages);

        return keys.map((key, index) => {
            // return the message equivalent to the mapped key
            const message = messages[key];
            // if the index equals 0 return null else return last index of the keys (finding last message)
            const lastMessageKey = index === 0 ? null : keys[index - 1];
            // check if userName is equal to the username of the sender
            const isMyMessage = userName === message.sender.username

            return (
                <div key={`msg_${index}`} style={{width: '100%'}}>
                    <div className="message-block">
                        {
                            isMyMessage
                            // if the message belongs to the sender render the my message component
                            ? <MyMessage
                            message={message}>
                            </MyMessage> 
                            // else render the their message component 
                            : <TheirMessage
                            message={message}
                            lastMessage={messages[lastMessageKey]}></TheirMessage>
                        }
                    </div>

                    <div className="read-receipt" 
                    // setting margin if its senders message or another margin value if it isnt
                    style={{marginRight: isMyMessage ? '18px' : '0px',
                    marginLeft: isMyMessage ? '0px' : '68px'}}>
                        {renderReadReceipts(message, isMyMessage)}
                    </div>
                </div>
            )
        })
    }

    if (!chat) {
        return chat === {}
    };
    return (
        <div className="chat-feed">
            <div className="chat-title-container">
                {/* returning the title of the chat */}
                <div className="chat-title">{chat.title}</div>

                <div className="chat-subtitle">
                    {/* mapping through the people in the chat to return their username  */}
                    {chat.people.map((person) => ` ${person.person.username}`)}
                </div>
            </div>

        {renderMessages()}
        <div style={{height: '100px'}}/>

        <div className="message-form-container">
            <MessageForm
            // using props and equating chatId to activeChat
            {...props}
            chatId={activeChat}></MessageForm>
        </div>
        </div>
    )
}

export default ChatFeed;
