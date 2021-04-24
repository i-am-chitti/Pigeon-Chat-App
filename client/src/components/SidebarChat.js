import { Avatar } from '@material-ui/core';
import React, { useState,useEffect } from 'react'
import './SidebarChat.css';
import db from '../firebase';
import { Link } from 'react-router-dom';

function SidebarChat({ id, name, addNewChat }) {

    const [seed,setSeed] = useState('');
    const [messages,setMessages] = useState([]);

    useEffect(() => {
        if(id) {
            const unsubscribe = db.collection('rooms').doc(id).collection('messages')
                .orderBy('timestamp', 'desc').onSnapshot((snapshot) => 
                setMessages(snapshot.docs.map((doc) => doc.data())));

            return () => unsubscribe();
        }
        
    }, [id]);

    useEffect(() => {
        setSeed(Math.floor(Math.random()*5000));
    }, []);

    const createChat = () => {
        const roomName = prompt("Please enter name for chat");
        if(roomName) {
            // do some dB stuff ... 
            db.collection('rooms').add({
                name: roomName,
            });
        }
    };

    return !addNewChat ? (
        <Link to={`/rooms/${id}`}>
            <div className="sidebar_chat">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className="sidebar_chatInfo">
                    <h2>{name}</h2>
                    <p>{messages[0]?.message}</p>
                </div>
            </div>
        </Link>
    ) : (
        <div onClick={createChat} className="sidebar_chat">
            <h2>Add New Chat</h2> 
        </div>
    )
}

export default SidebarChat;
