const { docs } = require('googleapis/build/src/apis/docs');
const mongoose = require('mongoose');

connectDB().catch(err => console.log(err));

async function connectDB() {
    await mongoose.connect('mongodb://localhost:27017/fileManager');
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

userSchema.statics.findAndModify = function (query, sort, doc, options, callback) {
    return this.collection.findAndModify(query, sort, doc, options, callback);
};

const File = mongoose.model('File', fileSchema);
const User = mongoose.model('User', userSchema);


async function addFile(username, name, md5, size) {
    const file = new File({ name: name, md5: md5, size: size });
    file.save(function (err) {
        if (err) return handleError(err);
    });
    const user = await getUser(username);
    user.files.push(mongoose.Types.ObjectId(file._id))
    await User.findOneAndUpdate({ _id: user._id }, user);
}


async function removeFile(username, fileName) { 
    const user = await getUser(username)
    const file = await getFile(username, fileName);
    var idx = 0;
 
    for( i of user.files){
        if(i._doc.id.toString('hex') == file._id){
            break;
        }
        idx++;
    }

    if (idx > -1) {
        user.files.splice(idx, 1);
    }

    await User.findOneAndUpdate({ _id: user._id }, user); 

    File.findByIdAndRemove(file._id, function (err, docs) {
        if (err){
            console.log(err)
        }
    });


    return true;
}

async function getFileById(id) {
    return await File.find({ _id: id }, null, { limit: 1 }, function (err, docs) {
        if (err) {
            return err;
        }
        return docs[0]
    });
}

async function getFile(username, fileName) {
    const user = await getUser(username)
    var id;
    for (var file of user.files) {
        
        if (file._doc.id) {
            id = file._doc.id.toString('hex')
        }
        else {
            id = file._id.toString('hex')
        }
        const data = await getFileById(id);
        const currFile = data[0]
        if (currFile.name == fileName) {
            return currFile
        }
    }
}

async function getAllFiles(username) {
    var files = []
    var id;
    const user = await getUser(username)
    for (var file of user.files) {
        if (file._doc.id) {
            id = file._doc.id.toString('hex')
        }
        else {
            id = file._id.toString('hex')
        }

        const data = await getFileById(id);
        const currFile = data[0]
        files.push(currFile);
    }

    return files;
}

async function getAllUsers() {
    var data;
    await User.find({}, null, function (err, docs) {
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
    if(!data){
        throw "User Not Found!"
    }
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