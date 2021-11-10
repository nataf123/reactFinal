const mongoose = require('mongoose');

connectDB().catch(err => console.log(err));

 async function connectDB() {
  await mongoose.connect('mongodb://localhost:27017/test');
 }

const fileSchema = new mongoose.Schema({
    name: String,
    md5 : String,
    size: String,
});

const userSchema = new mongoose.Schema({
    username: String,
    password : String,
    files : [fileSchema]
});

  const File = mongoose.model('File', fileSchema);
  const User = mongoose.model('User', userSchema);


  async function addFile(name, md5, size){
    const file = new File({ name: name, md5: md5, size: size});

    file.save(function (err) {
        if (err) return handleError(err);
      });
  }
  

async function getFile(name)
{
    return await File.find({ name: name });
    
}

async function removeFile(name)
{

}

async function addUser()
{

}

async function getUser(name)
{

}



module.exports = {connectDB, addFile, getFile}