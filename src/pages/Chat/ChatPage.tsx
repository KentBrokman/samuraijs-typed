import React, {useEffect, useState} from "react"



export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}

const ChatPage: React.FC = () => {                 // Страница
    return (
        <div>
            <Chat />
        </div>
    )
}

const Chat: React.FC = () => {                     // Сообщения и форма
    const [wsChannel, setWsChannel] = useState<WebSocket | null>(null)

    useEffect(() => {
        function createChannel() {
            // setWsChannel(new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx'))
            let ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
            ws.addEventListener('close', () => {
                console.log('Closed ws')
            })
            setWsChannel(ws)
        }
        createChannel()
    }, [])
    // useEffect(() => {
    //     // @ts-ignore
    //
    //     if (wsChannel !== null) {
    //         wsChannel.onopen = function(e) {
    //             console.log('соединение установлено')
    //         }
    //         // @ts-ignore
    //         console.log(wsChannel.readyState)
    //     }
    //     wsChannel?.addEventListener('close', () => {
    //         console.log('Closed ws')
    //
    //     })
    //
    //     if (wsChannel !== null) {
    //         wsChannel.onclose = function(e) {
    //             console.log('соединение закрыто')
    //         }
    //     }
    //
    // }, [wsChannel])
    const showStatus = () => {
        console.log(wsChannel)
    }
    const closeSocket = () => {
        wsChannel?.close()
    }

    return (
        <div>
            <button onClick={showStatus}>Show</button>
            <button onClick={closeSocket}>Close</button>
            <Messages wsChannel={wsChannel}/>
            <AddMessageForm wsChannel={wsChannel}/>
        </div>
    )
}

const Messages: React.FC<{ wsChannel: WebSocket | null}> = ({wsChannel}) => {                  // Сообщения
    const [messages, setMessages] = useState<Array<ChatMessageType>>([])

    useEffect(() => {
        wsChannel?.addEventListener('message', (e: MessageEvent) => {
            const newMessages = JSON.parse(e.data);
            // debugger
            setMessages((prevMessages) => [...prevMessages, ...newMessages]);
        })
    }, [wsChannel])
    return (
        <div style={{height: '500px', overflowY: 'auto'}}>
            {messages.map((m, index) => <Message key={index} message={m}/>)}
        </div>
    )
}

const Message: React.FC<{message: ChatMessageType}> = ({message}) => {      // Одно сообщение
    return (
        <div>
            <img style={{width: '30px'}} src={message.photo} />
            <b>{message.userName}</b>
            <br/>
            {message.message}
            <hr/>
        </div>
    )
}

const AddMessageForm: React.FC<{ wsChannel: WebSocket | null}> = ({wsChannel}) => {                               // Форма
    const [message, setMessage] = useState('')
    const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending')

    useEffect(() => {
        wsChannel?.addEventListener('open', () => {
            setReadyStatus('ready')
        })
    }, [wsChannel])
    const sendMessage = () => {
        if(!message) {
            return
        }
        wsChannel?.send(message)
        setMessage('')
    }
    return (
        <div>
            <div>
                <textarea onChange={(e) => setMessage(e.currentTarget.value)}
                          value={message}></textarea>
            </div>
            <div>
                <button disabled={wsChannel === null || readyStatus !== 'ready'} onClick={sendMessage}>Send</button>
            </div>
        </div>
    )
}



export default ChatPage