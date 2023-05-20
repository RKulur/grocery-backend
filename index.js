const express = require('express')
const ConnectToMongo = require('./db')
const cors = require('cors')

ConnectToMongo()

const app = express();
const port = 7000;

app.use(express.json());
app.use(cors())

app.use("/api/user",require('./router/user_router'))

app.listen(port,()=>{
    console.log('app listening on port '+port)
})