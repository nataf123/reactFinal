const express = require('express')
const bp = require('body-parser')
const mhr = require("cymru-mhr")
const { connectDB, addFile, getFile, addUser, getUser, removeUser, getAllUsers, removeFile, getAllFiles } = require("./dbManager")
const app = express()
const cors = require('cors');
app.use(cors());
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

const port = 3456

app.get('/listUsers', async (req, res) => {
  try {
    const users = await getAllUsers();
    res.send(JSON.stringify(users))
  } catch (error) {
    res.send(JSON.stringify({ err: 'ERROR OCCURED' }));
  }
})


app.post('/getUser', async (req, res) => {
  try {
    const user = await getUser(req.body.username)
    res.send(JSON.stringify(user));
  } catch (error) {
    console.log(error);
    res.send(JSON.stringify({ err: 'ERROR OCCURED' }));
  }
})

app.post('/addUser', async (req, res) => {
  try {
    await addUser(req.body.username, req.body.password)
    res.send(JSON.stringify({ result: true }))
  } catch (error) {
    res.send(JSON.stringify({ err: 'ERROR OCCURED' }));
  }

})

app.post('/removeUser', async (req, res) => {
  try {
    await removeUser(req.body.username);
    res.send(JSON.stringify({ result: true }))
  } catch (error) {
    res.send(JSON.stringify({ err: 'ERROR OCCURED' }));
  }

})

app.post('/listFiles', async (req, res) => {
  try {
    const files = await getAllFiles(req.body.username);
    res.send(JSON.stringify(files));
  } catch (error) {
    console.log(error);
    res.send(JSON.stringify({ err: 'ERROR OCCURED' }));
  }

})

app.post('/virustotal', async (req, res) => {
  res.send(JSON.stringify({ malicious: 0 }));

})

app.post('/fileDetails', async (req, res) => {
  try {
    const file = await getFile(req.body.username, req.body.filename);
    res.send(JSON.stringify(file))
  } catch (error) {
    res.send(JSON.stringify({ err: 'ERROR OCCURED' }));
  }

})


app.post('/removeFile', async (req, res) => {
  try {
    await removeFile(req.body.username, req.body.fileId)
    res.send(JSON.stringify({ result: true }))
  } catch (error) {
    res.send(JSON.stringify({ err: 'ERROR OCCURED' }));
  }

})

app.post('/addFile', async (req, res) => {
  try {
    await addFile(...req.body.data);
    res.send(JSON.stringify({ result: true }))
  } catch (error) {
    res.send(JSON.stringify({ err: 'ERROR OCCURED' }));
  }

})

app.get('/', (req, res) => {
  console.log('connected')
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})

app.use(function (err, req, res, next) {
  res.status(400).send(JSON.stringify({ err: 'ERROR OCCURED' }));
});

async function main() {
  connectDB();

}

main();

