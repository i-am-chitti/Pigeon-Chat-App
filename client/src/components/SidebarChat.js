import { Avatar } from '@material-ui/core';
import React, { useState,useEffect } from 'react'
import './SidebarChat.css';

function SidebarChat({ addNewChat }) {

    const [seed,setSeed] = useState('');

    useEffect(() => {
        setSeed(Math.floor(Math.random()*5000));
    }, []);

    const createChat = () => {
        const roomName = prompt("Please enter name for chat");
        if(roomName) {
            // do some dB stuff ... 
        }
    };

    return !addNewChat ? (
        <div className="sidebar_chat">
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
            <div className="sidebar_chatInfo">
                <h2>Room name</h2>
                <p>Last message...</p>
            </div>
        </div>
    ) : (
        <div onClick={createChat} className="sidebar_chat">
            <h2>Add New Chat</h2> 
        </div>
    )
}

export default SidebarChat
