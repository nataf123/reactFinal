const URL = 'http://localhost:3456/'

export async function listUsers() {
    console.log("in listUsers")
    const response = await fetch(URL + 'listUsers')
    return await response.json();
}

export async function getUser(name) {
    const response = await fetch(URL + 'getUser', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username: name})          
      })
    return await response.json();
}

export async function addUser(username, password) {
  console.log("in add user")
    const response = await fetch(URL + 'addUser', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username: username, password: password})
      })
      const res = await response.json();
      return res.result;
}

export async function removeUser(username) {
    const response = await fetch(URL + 'removeUser', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username: username})
      })
      const res = await response.json();
      return res.result;
}

export async function listFiles(username) {
    const response = await fetch(URL + 'listFiles', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username: username})
      })
    return await response.json();
}


export async function virustotal(md5) {
    const response = await fetch(URL + 'virustotal', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({md5: md5})
      })
    return await response.json();
}


export async function fileDetails(username, filename) {
    const response = await fetch(URL + 'fileDetails', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username: username, filename : filename})
      })
    return await response.json();
}

export async function removeFile(username, fileId) {
    const response = await fetch(URL + 'removeFile', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username: username, fileId : fileId})
      })
    return await response.json();
}

export async function addFile(username, filename, md5, size) {
    const response = await fetch(URL + 'addFile', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({data: [username, filename, md5, size]})
      })
    return await response.json();
}
