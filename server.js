import { MongoClient } from "mongodb";
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import bodyParser from "body-parser";
var cors = require('cors')


const AuthRoute = require('./routes/auth')


const url = "mongodb+srv://rishi:rishi@cluster0.1p9wgf3.mongodb.net/Data-server?retryWrites=true&w=majority"


mongoose.connect(url)
    .then(() => {
        console.log('Connected to the database');
    })
    .catch((err) => {
        console.error(`Error connecting to the database ${err}`);
    })

async function listDatabases(client) {
    console.log('working')
    const databasesList = await client.db().admin().listDatabases();
    console.log("Databases");
    databasesList.databases.forEach(db => {
        console.log(`- ${db.name}`);
    })
}

const app = express()
app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is runnning on port ${PORT}`);
})

app.get('/', (req, res) => {
    return res.status(200).send('Welcome')
})
app.use('/api', AuthRoute)