import express from 'express'

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.get('/data', (req, res) => {
    console.log('Data recieved')
    res.send('Here is your response')
})

app.listen(8000, () => {
    console.log("Server is running...")
})