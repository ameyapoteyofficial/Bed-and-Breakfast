import React from "react";

export default function MenuOutside(props){
    return(
        <div className={"main"}>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark navbar-default navbar-fixed-top">
              <a className="navbar-brand" href="/">
                <span style={{fontWeight: 'bold', fontStyle: 'italic'}}>Bread & Breakfast</span>
              </a>
              </nav>
       </div>
    );
}