const express = require('express')
const app = express()
const cors = require('cors')
const objId = require('mongodb').ObjectId
const { MongoClient, ServerApiVersion } = require('mongodb');
const res = require('express/lib/response');
const port = process.env.PORT || 4000;

// cors for cross origin reference 
app.use(cors())
// body parser (latest rule)
app.use(express.json())

// hard coded user
const users = [
    { id: 1, name: "Sagor", email: "sagor@gmail.com" },
    { id: 2, name: "bagor", email: "bagor@gmail.com" },
    { id: 3, name: "pagol", email: "pagol@gmail.com" },
    { id: 4, name: "Rahat", email: "Rahat@gmail.com" },
    { id: 5, name: "Fahad", email: "Fahad@gmail.com" },
    { id: 6, name: "sadad", email: "sadad@gmail.com" },
    { id: 7, name: "rahim", email: "rahim@gmail.com" },
    { id: 8, name: "karim", email: "karim@gmail.com" }
]

// mongo database configure
const uri = "mongodb+srv://mndbuser1:BtHeIFUiEqxfXDY7@practice-cluster.3oc0m.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        await client.connect();
        const usersCollection = client.db('uder').collection('user');

        // insert data from ui to database via server (Create)
        app.post('/user', async (req, res) => {
            const user = req.body;
            console.log('user:', user);
            const result = await usersCollection.insertOne(user)
            res.send(result)
        })

        // get data from database (Read)
        app.get('/user', async (req, res) => {
            const query = {}
            const cursor = usersCollection.find(query)
            const result = await cursor.toArray()
            res.send(result);

        })

        // delete data item (Delete)
        app.delete('/user/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: objId(id) }
            const result = usersCollection.deleteOne(query)
            res.send(result)
        })

        // Update data from ui to database (Update)
        app.put('/user/:id', async (req, res) => {
            const id = req.params.id;
            const updateUser = req.body
            const query = { _id: objId(id) }
            const options = { upsert: true }
            const updatedDoc = {
                $set: {
                    name: updateUser.name,
                    email: updateUser.email
                }
            }
            const result = await usersCollection.updateOne(query, updatedDoc, options)
            res.send(result);
        })

    } finally {

    }
}

run().catch(console.dir)


// data get
app.get('/', (req, res) => {
    res.send('I am ready to work')
})

//userdata display in backend port
app.get('/users', (req, res) => {
    res.send(users)
})

// port listen
app.listen(port, () => {
    console.log('Port', port)
})



/**
 * username: mndbuser1
 * password: BtHeIFUiEqxfXDY7
 * 
*/