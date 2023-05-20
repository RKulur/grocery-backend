const mongoose = require('mongoose');

const database = 'RRmart'

const MongoURI = `mongodb://127.0.0.1:27017/${database}`

async function ConnectToMongo(){
    try {
        await mongoose.connect(MongoURI)
        console.log('Connect to Mongo')
    } catch (err) {
        console.log(err)
    }
}

module.exports = ConnectToMongo