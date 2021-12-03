import React from "react";

export default function Footer(props){
    return(
        <span>
            {props.text}
            <a href={props.url}>{props.name} here</a>
        </span>
    );
}

