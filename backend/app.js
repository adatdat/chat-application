const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://chat-admin:bruhlmao123@cluster-chat.0sque.mongodb.net/chat-application';

const client = new MongoClient(uri);
async function run() {
  try {
    await client.connect();
    const users = await client.db('chat-application').collection('User');
    const query = {'userName' : 'Ronaldo'}
    const userInfo = await users.findOne(query);
    console.log(userInfo);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
