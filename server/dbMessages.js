import mongoose from 'mongoose';

const dbSchema = mongoose.Schema({
    message: String,
    name: String,
    timestamp: String,
    received: Boolean
});

// collection: messageContent
export default mongoose.model('messagecontents', dbSchema);
