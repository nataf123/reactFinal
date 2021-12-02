import React from "react";
import { useState } from "react";
import { listFiles, addFile } from '../../requestHandler'
import FileCard from "./FileCard";
import ShowFile from "./ShowFile";
import { process } from "./md5Helper";
import Alert from 'react-bootstrap/Alert'


const Files = () => {
    var data = [];
    const [uploadedFile, setUploadedFile] = useState(false);
    const [files, setFiles] = useState([]);
    const [gotResponse, setgotResponse] = useState(false);
    const [error, setError] = useState(false);


    async function fetchData() {
        data = await listFiles(sessionStorage.getItem('username'));
        if (data.err) {
            setError(true);
        }
        else {
            setFiles(data)
            setgotResponse(true);
        }

    }

    React.useEffect(async () => {
        await fetchData();
    }, []);

    const handlerUpload = async (e) => {
        if (e.target.files[0]) {
            console.log(e.target.files[0])
            const md5 = await process(e.target.files[0])

            var currFile = {
                name: e.target.files[0].name,
                size: (e.target.files[0].size / 1024).toString() + "KB",
                md5: md5
            }
            console.log(currFile);
            const res = await addFile(sessionStorage.getItem("username"), currFile.name, currFile.md5, currFile.size)
            if (res.err) {
                setError(true);
            }
            else {
                setError(false)
                fetchData();
                setUploadedFile(true)
            }
        }
    }

    var fileList = files.map(function (file) {
        return <div> <li style={{ "list-style": "none" }}>
            <FileCard file={file} refresh={fetchData} />
        </li> </div>;
    })

    return (
        <div>
            {uploadedFile &&
                <Alert variant="success">
                    Added file successfully!
                </Alert>
            }

            <div>
                <label for="formFileLg" class="form-label" ></label>
                <input class="form-control form-control-lg" id="formFileLg" type="file" onChange={handlerUpload} style={{ backgroundColor: "#43a047" }} />
            </div>

            <div>
                {error && "Error occured!"}
                {files.length == 0 && !gotResponse && <h> Loading Files..</h>}
                {files.length == 0 && gotResponse && <h>You Don't have any files!</h>}
                {files !== [] && fileList}
            </div>

        </div>
    )
}

export default Files;