const { docs } = require('googleapis/build/src/apis/docs');
const mongoose = require('mongoose');

connectDB().catch(err => console.log(err));

async function connectDB() {
    await mongoose.connect('mongodb://localhost:27017/test');
}

const fileSchema = new mongoose.Schema({
    name: String,
    md5: String,
    size: String,
});

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    files: [fileSchema]
});

const File = mongoose.model('File', fileSchema);
const User = mongoose.model('User', userSchema);


async function addFile(username, name, md5, size) {
    const file = new File({ name: name, md5: md5, size: size });
    const user = getUser(username);
    user.files.push(file)
    await User.findOneAndUpdate({ _id: user._id }, user);
}


async function getFile(username, fileName) {
    const user = await getUser(username)
    var file;
    for (var i of user.files) {
        if (i.name == fileName) {
            return i;
        }
    }
}

async function removeFile(username, fileName) { //TODO: check of works
    const user = await getUser(username)
    const file = getFile(username, fileName);

    const idx = user.files.indexOf(file);
    if (idx > -1) {
        user.files.splice(idx, 1);
    }

    await User.findOneAndUpdate({ _id: user._id }, user);
    console.log(await getUser(username))


}

async function getAllFiles(username) {
    const user = await getUser(username)
    return user.files;
}

async function getAllUsers() {
    var data;
    await User.find({}, null, { limit: 5 }, function (err, docs) {
        if (err) {
            return err;
        }
        data = docs
    });
    return data;
}

async function addUser(username, password) {
    const user = new User({ username: username, password: password, files: [] });

    user.save(function (err) {
        if (err) return handleError(err);
    });

}

async function getUser(name) {
    var data;
    await User.find({ username: name }, null, { limit: 1 }, function (err, docs) {
        if (err) {
            return err;
        }
        data = docs[0]
    });
    return data;
}

async function removeUser(username) {
    const user = await getUser(username)

    if (user) {
        User.findByIdAndRemove(user._id, function (err, user) {
            console.log('deleting user', user.username);
            if (err)
                throw err;
        });
    }
}



module.exports = { connectDB, addFile, getFile, addUser, getUser, removeUser, getAllUsers, removeFile, getAllFiles }