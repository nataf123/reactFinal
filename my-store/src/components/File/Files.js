import React from "react";
import { useState } from "react";
import { listFiles } from '../../requestHandler'
import FileCard from "./FileCard";
import ShowFile from "./ShowFile";

const Files = () => {
    var data = [];
    const [files, setFiles] = useState([]);
    const [error, setError] = useState(false);

    React.useEffect(() => {
        async function fetchData() {
            data = await listFiles(sessionStorage.getItem('username'));
            if (data.err) {
                setError(true);
            }
            else {
                setFiles(data)
            }

        }
        fetchData();
    }, []);

    var fileList = files.map(function(file){
        return <div> <li style={{"list-style" : "none"}}>
            <FileCard file={file}/>
            </li> </div>;
      })

    return (
        <div>
            {error && "Error occured!"}
            {files === [] && "Loading Files.."}
            {files !== [] && fileList}
        </div>
    )
}

export default Files;