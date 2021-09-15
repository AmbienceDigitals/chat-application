import React from 'react';

const TheirMessage = ({ lastMessage, message}) => {
    const isFirstMessageByUser = !lastMessage ||lastMessage.sender.username !== message.sender.username;

    return (
        <div className="message-row">

            {/* checking if message is the users first message */}
            {isFirstMessageByUser && (
                <div
                className="message-avatar"
                style={{backgroundImage: `url(${message?.sender?.avatar})`}}/>
            )}
                 {/* checking if message is actually words or a picture */}
                 {/* if its a picture  */}
            {message?.attachments?.length > 0 
                ? (
                    <img
                    src={message.attachments[0].file}
                    alt="message attachment"
                    className="message-image"
                    style={{marginLeft: isFirstMessageByUser ? '4px' : '48px'}} />
                ) 
                // if it is a message
                : (
                    <div className="message" 
                    style={{ float: 'left', backgroundColor: '#CABCDC',
                    marginLeft: isFirstMessageByUser ? '4px' : '48px'}}>
                        {message.text}
                    </div>
                )
    }
        </div>
    )
}

export default TheirMessage;
