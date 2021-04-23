import React, { useState, useEffect } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import Pusher from 'pusher-js';
import axios from './axios';

function App() {

  const [ messages,setMessages ] = useState([]);

  useEffect(() => {
    axios.get('/messages/sync')
      .then(response => {
        setMessages(response.data);
      });
  }, []);

  useEffect(() => {
    // initializing pusher on front end
    var pusher = new Pusher('98e1ebcf67495f1cfa6d', {
      cluster: 'ap2'
    });
    var channel = pusher.subscribe('messages');
    channel.bind('inserted', (newMessage) => {
      // new data
      // alert(JSON.stringify(data));
      setMessages([...messages, newMessage]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    }
  }, [messages]);

  // console.log(messages);

  return (
    <div className="app">
      <div className="app_body">
        <Sidebar />
        <Chat messages={messages} />
      </div>
    </div>
  );
}

export default App;
