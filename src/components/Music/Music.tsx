import React from 'react';
import axios from "axios";
import s from './Music.module.css';


const Music: React.FC<{}> = () => {
    let message = 'hello'
    let sendMessagege = () => {
        axios.get('https://social-network.samuraijs.com/api/1.0/dialogs/messages/new/count')
    }
    return (
        <div>
            {['Splean', 'Beatles', 'NoizeMC']}
            <div>
                <button onClick={sendMessagege}>send</button>
            </div>
        </div>
    )
}

export default Music;