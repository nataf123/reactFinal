const express = require('express')
const {connectDB, addFile, getFile, addUser, getUser, removeUser, getAllUsers} = require("./dbManager")
const {urlGoogle, getGoogleAccountFromCode} = require('./googleSignup')
const app = express()
const cors = require('cors');
app.use(cors());

const port = 3456

app.get('/listUsers', async (req, res) => {

})

app.get('/getUser', async (req, res) => {

})

app.get('/addUser', async (req, res) => {

})
app.get('/removeUser', async (req, res) => {

})

app.get('/listFiles', async (req, res) => {

})

app.post('/fileDetail/virustotal', async (req, res) => {
  
})

app.post('/fileDetail', async (req, res) => {
  
})

app.post('fileDetail/remove', async (req, res) => {

})

app.post('/addFile', async (req, res) => {
  console.log(req.body.data)
  await addFile(...req.body.data);
  res.send('added')
})

app.get('/', (req, res) => {
  console.log('connected')
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})


async function main() {
  connectDB();
  
}

main();