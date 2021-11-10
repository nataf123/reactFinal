const express = require('express')
const nvt = require('node-virustotal');
const { connectDB, addFile, getFile, addUser, getUser, removeUser, getAllUsers, removeFile, getAllFiles } = require("./dbManager")
const { urlGoogle, getGoogleAccountFromCode } = require('./googleSignup')
const app = express()
const cors = require('cors');
app.use(cors());

const port = 3456

app.get('/listUsers', async (req, res) => {
  const users = await getAllUsers();
  console.log("users:" + users)
  res.send(JSON.stringify(users))

})

app.post('/getUser', async (req, res) => {
  console.log(req)
  const user = await getUser(req.body.username)
  res.send(JSON.stringify(user));

})

app.post('/addUser', async (req, res) => {
  await addUser(req.body.username, req.body.password)
  res.send('added')
})

app.post('/removeUser', async (req, res) => {
  await removeUser(req.body.username);
  res.send("removed");
})

app.post('/listFiles', async (req, res) => {
  const files = await getAllFiles(req.bodt.username);
  res.send(JSON.stringify(files));
})

app.post('/virustotal', async (req, res) => {
  var result;
  const defaultTimedInstance = nvt.makeAPI();
  const theSameObject = await defaultTimedInstance.fileLookup(req.body.md5, function (err, res) {
    if (err) {
      console.log(err);
      return;
    }
    result = JSON.stringify(res);
    console.log(result);
  });
  res.send(JSON.stringify(result))
})

app.post('/fileDetails', async (req, res) => {
  const file = await getFile(req.body.username, req.body.filename);
  res.send(JSON.stringify(file))
})


app.post('removeFile', async (req, res) => {
  await removeFile(req.body.username, req.body.filename)
  res.send("removed")
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

