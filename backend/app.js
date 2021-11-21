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
  try {
    const users = await getAllUsers();
    console.log("users:" + users)
    res.send(JSON.stringify(users))
  } catch (error) {
    res.status(400).send(JSON.stringify({err : 'ERROR OCCURED'}));
  }
})


app.post('/getUser', async (req, res) => {
  try {
    const user = await getUser(req.body.username)
    res.send(JSON.stringify(user));
  } catch (error) {
    res.status(400).send(JSON.stringify({err : 'ERROR OCCURED'}));
  }
})

app.post('/addUser', async (req, res) => {
  try {
    await addUser(req.body.username, req.body.password)
    res.send(JSON.stringify({ result: true }))
  } catch (error) {
    res.status(400).send(JSON.stringify({err : 'ERROR OCCURED'}));
  }

})

app.post('/removeUser', async (req, res) => {
  try {
    await removeUser(req.body.username);
    res.send(JSON.stringify({ result: true }))
  } catch (error) {
    res.status(400).send(JSON.stringify({err : 'ERROR OCCURED'}));
  }

})

app.post('/listFiles', async (req, res) => {
  try {
    const files = await getAllFiles(req.body.username);
    res.send(JSON.stringify(files));
  } catch (error) {
    res.status(400).send(JSON.stringify({err : 'ERROR OCCURED'}));
  }

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

    res.send(JSON.stringify({ malicious: counter }))
  });

})

app.post('/fileDetails', async (req, res) => {
  try {
    const file = await getFile(req.body.username, req.body.filename);
    res.send(JSON.stringify(file))
  } catch (error) {
    res.status(400).send(JSON.stringify({err : 'ERROR OCCURED'}));
  }

})


app.post('/removeFile', async (req, res) => {
  try {
    await removeFile(req.body.username, req.body.filename)
    res.send(JSON.stringify({ result: true }))
  } catch (error) {
    res.status(400).send(JSON.stringify({err : 'ERROR OCCURED'}));
  }

})

app.post('/addFile', async (req, res) => {
  try {
    await addFile(...req.body.data);
    res.send(JSON.stringify({ result: true }))
  } catch (error) {
    res.status(400).send(JSON.stringify({err : 'ERROR OCCURED'}));
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
  res.status(400).send(JSON.stringify({err : 'ERROR OCCURED'}));
});

async function main() {
  connectDB();

}

main();

