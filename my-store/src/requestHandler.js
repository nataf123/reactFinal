const URL = 'http://localhost:3456/'

export async function listUsers() {
    console.log("in listUsers")
    const response = await fetch(URL + 'listUsers')
    return await response.json();
}

export async function getUser(name) {
    const response = await fetch(URL + 'getUser', {
        method: 'post',
        headers: {'Accept': 'application/json'},
        body: JSON.stringify({username: name})          //TODO: check why cant find body
      })
      
    return await response.json();
}

export async function addUser(username, password) {
    const response = await fetch(URL + 'addUser', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username: username, password: password})
      })
    return await response.json();
}

export async function removeUser(username) {
    const response = await fetch(URL + 'removeUser', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username: username})
      })
    return await response.json();
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

export async function removeFile(username, filename) {
    const response = await fetch(URL + 'removeFile', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username: username, filename : filename})
      })
    return await response.json();
}

export async function addFile(filename, md5, size) {
    const response = await fetch(URL + 'addFile', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({data: [filename, md5, size]})
      })
    return await response.json();
}
