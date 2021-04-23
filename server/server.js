import express from 'express';
import mongoose from 'mongoose';
import Messages from './dbMessages.js';
import Pusher from 'pusher';
import cors from 'cors';

// app config
const app = express();
const port = process.env.PORT || 9000;
const pusher = new Pusher({
    appId: "1192892",
    key: "98e1ebcf67495f1cfa6d",
    secret: "07cea488ebc74daad66c",
    cluster: "ap2",
    useTLS: true
  });

// middleware
app.use(express.json());
app.use(cors());

const connection_url = 'mongodb+srv://admin:WaN9pLQeoNj3mrM0@cluster0.ja3it.mongodb.net/pigeondb?retryWrites=true&w=majority';
mongoose.connect(connection_url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db=mongoose.connection;
db.once("open", () => {
    console.log("DB Connected");

    // monitor the specific collection
    const msgCollection = db.collection('messagecontents');
    const changeStream = msgCollection.watch();

    changeStream.on('change', (change) => {
        if(change.operationType === 'insert') {
            // console.log("insert event triggered");
            const msgDetails = change.fullDocument;
            // messages is a channel and inserted is the event that is going to be
            // triggered, on front side, just subscribe to this channel with this event 
            // to receive the update
            pusher.trigger('messages','inserted', {
                id: msgDetails._id,
                name: msgDetails.name,
                message: msgDetails.message,
                timestamp: msgDetails.timestamp,
                received: msgDetails.received,
            });
        }
        else {
            console.log("Error triggering pusher");
        }
    })
})


app.get('/',(req,res) => res.status(200).send("Connected to Backend"));

app.get('/messages/sync', (req,res) => {
    Messages.find((err,data) => {
        if(err) res.status(501).send(err);
        else res.status(200).send(data);
    })
})

app.post('/messages/new', (req,res) => {
    const dbMessage = req.body;
    Messages.create(dbMessage, (err,data) => {
        if(err) res.status(500).send(err);
        else res.status(201).send(data);
    })
})

app.listen(port,() => console.log("Listening on localhost:"+port));