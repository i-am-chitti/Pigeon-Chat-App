import React, { useState,useEffect } from 'react'
import { Avatar, IconButton } from '@material-ui/core';
import './Chat.css';
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import { AttachFile, MoreVert, SearchOutlined} from '@material-ui/icons';
import MicIcon from "@material-ui/icons/Mic";
import axios from '../axios';

function Chat({ messages }) {

    const [input,setInput] = useState('');
    const [seed,setSeed] = useState('');

    const sendMessage = async (e) => {
        e.preventDefault();
        await axios.post('/messages/new', {
            message: input,
            name: "asd",
            timestamp: "Just now",
            received: false,
        });
        setInput('');
    }

    useEffect(() => {
        setSeed(Math.floor(Math.random()*5000));
    }, []);

    return (
        <div className="chat">

            <div className="chat_header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />

                <div className="chat_headerInfo">
                    <h3>Room Name</h3>
                    <p>Last seen at ... </p>
                </div>

                <div className="chat_headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>

            <div className="chat_body">
                {messages.map((message) => {
                return (<p key={message._id} className={`chat_message ${message.received && 'chat_reciever'}`}>
                            <span className="chat_name">
                                {message.name}
                            </span>
                            {message.message}
                            <span className="chat_timestamp">
                                {message.timestamp}
                            </span>
                        </p>);
                })}
            </div>

            <div className="chat_footer">
                <IconButton>
                    <InsertEmoticonIcon />
                </IconButton>
                <form>
                    <input value={input} onChange={(e) => setInput(e.target.value)} type="text" />
                    <button onClick={sendMessage} type="submit">Send</button>
                    
                </form>
                <IconButton>
                    <MicIcon />
                </IconButton>
            </div>

        </div>
    )
}

export default Chat
