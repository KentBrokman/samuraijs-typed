import React, {useEffect, useState} from "react"



export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}

const ChatPage2: React.FC = () => {                 // Страница


    return (
        <div>
            <Chat />
        </div>
    )
}

const Chat: React.FC = () => {

    return (
        <div>
            <Messages />
            <AddMessageForm />
        </div>
    )
}

const Messages: React.FC = () => {
    const [messages, setMessages] = useState<ChatMessageType[]>([])

    useEffect(() => {
        let ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
        ws.addEventListener('message', (e) => {
            const newMessages = JSON.parse(e.data)
            // setMessages((prevMessages) => [...prevMessages, ...newMessages])
            setMessages(newMessages)
            debugger
        })
        ws.addEventListener('close', () => {
            console.log('closed')
        })
    }, [])
    return (
        <div style={{height: '500px', overflowY: 'auto'}}>
            {messages.map((m, index) => <Message key={index} message={m}/>)}
        </div>
    )
}

const Message: React.FC<{message: ChatMessageType}> = ({message}) => {

    return (
        <div>
            <img style={{width: '30px'}} src={message.photo}/> <b>{message.userName}</b>
            <br/>
            {message.message}
            <hr/>
        </div>
    )
}

const AddMessageForm: React.FC = () => {
    return (
        <div>
            <div>
                <textarea></textarea>
            </div>
            <div>
                <button>Send</button>
            </div>
        </div>
    )
}

export default ChatPage2