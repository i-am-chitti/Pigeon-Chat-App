import React, { useState,useEffect } from 'react'
import { Avatar, IconButton } from '@material-ui/core';
import './Chat.css';
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import SendIcon from '@material-ui/icons/Send';
import { AttachFile, MoreVert, SearchOutlined} from '@material-ui/icons';
import MicIcon from "@material-ui/icons/Mic";

function Chat() {

    const [input,setInput] = useState('');
    const [seed,setSeed] = useState('');

    const sendMessage = (e) => {
        e.preventDefault();
        console.log("Message to be sent: " + input);
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
                <p className={`chat_message ${true && 'chat_reciever'}`}>
                    <span className="chat_name">
                        Deepak Kumar
                    </span>
                    Hey Guys!
                    <span className="chat_timestamp">
                        2:31pm
                    </span>
                </p>
                <p className="chat_message">Hey Guys!</p>
            </div>

            <div className="chat_footer">
                <IconButton>
                    <InsertEmoticonIcon />
                </IconButton>
                <form>
                    <input value={input} onChange={(e) => setInput(e.target.value)} type="text" />
                    <IconButton onClick={sendMessage} >
                        <SendIcon />
                    </IconButton>
                    
                </form>
                <IconButton>
                    <MicIcon />
                </IconButton>
            </div>

        </div>
    )
}

export default Chat
