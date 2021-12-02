import React from "react";
import { useState } from "react";

const User = (props) => {
    

    var fileList = props.user.files.map(function (file) {
        return <li>{file.name}</li>;
    })


    return (
        <div>
            <div>
                {props.user.username}
            </div>
            {/* <div>
                <ul>{fileList}</ul>
            </div> */}
        </div>
    )
}

export default User;