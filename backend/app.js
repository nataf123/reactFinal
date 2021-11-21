const express = require('express')
const bp = require('body-parser')
const nvt = require('node-virustotal');
const { connectDB, addFile, getFile, addUser, getUser, removeUser, getAllUsers, removeFile, getAllFiles } = require("./dbManager")
const { urlGoogle, getGoogleAccountFromCode } = require('./googleSignup')
const app = express()
const cors = require('cors');
app.use(cors());
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

const port = 3456

app.get('/listUsers', async (req, res) => {
  const users = await getAllUsers();
  console.log("users:" + users)
  res.send(JSON.stringify(users))

})

app.post('/getUser', async (req, res) => {
  const user = await getUser(req.body.username)
  res.send(JSON.stringify(user));

})

app.post('/addUser', async (req, res) => {
  console.log(req)
  await addUser(req.body.username, req.body.password)
  res.send(JSON.stringify({ result: true }))
})

app.post('/removeUser', async (req, res) => {
  await removeUser(req.body.username);
  res.send(JSON.stringify({ result: true }))
})

app.post('/listFiles', async (req, res) => {
  const files = await getAllFiles(req.body.username);
  res.send(JSON.stringify(files));
})

app.post('/virustotal', async (req, res) => {
  var counter = 0;
  var result;
  const key = 'd89a8358376d0a222508032c96738c47ac348712b4de1eb9107c276d5a0d6579';
  const defaultTimedInstance = nvt.makeAPI();
  const theSameKey = defaultTimedInstance.setKey(key);

  const theSameObject = await defaultTimedInstance.fileLookup(req.body.md5, function (err, resFromApi) {
    if (err) {
      console.log(err);
      res.send(JSON.stringify({ result: false }));
    }
    var re = /"category": "(.+)"/g;
    var m;
    var lst = [];
    do {
      m = re.exec(resFromApi);//getting the relevant data by regEx
      if (m) {
        lst.push(m[1]);
      }
    } while (m);

    if (typeof lst !== "undefined") {
      lst.forEach((i) =>//getting just the malicious
      {
        if (i == "malicious") {
          counter++;
        }
      });
    }

    console.log(counter);
    res.send(JSON.stringify({ malicious: counter }))
  });

})

app.post('/fileDetails', async (req, res) => {
  const file = await getFile(req.body.username, req.body.filename);

  console.log(file)
  res.send(JSON.stringify(file))
})


app.post('/removeFile', async (req, res) => {
  await removeFile(req.body.username, req.body.filename)
  res.send(JSON.stringify({ result: true }))
})

app.post('/addFile', async (req, res) => {
  console.log(req.body.data)
  await addFile(...req.body.data);
  res.send(JSON.stringify({ result: true }))
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

