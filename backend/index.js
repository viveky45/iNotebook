const connectTOMongo = require('./db');
const express = require('express');
var cors = require('cors')


connectTOMongo();
const app = express();
const port = 5000;

app.use(cors())
app.use(express.json())

app.use(express.json())

app.get('/', (req, res) => {
    res.send('hello vivek');
})

app.get('/api/v1/login', (req, res) => {
    res.send("hello login");
})

app.get('/api/v1/signup', (req, res) => {
    res.send('hello signup')
})
app.use('/api/auth', require('./routes/auth'))

app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})