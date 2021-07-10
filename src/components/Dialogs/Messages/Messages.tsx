import React from 'react';


type MessageDataType = {
    message: string
}

const MessageData: React.FC<MessageDataType> = (props) => {



    return (
        <div className="message">
            <div>{props.message}</div>
        </div>

    )
}

export default MessageData;