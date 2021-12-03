import React from "react";
import Form from "react-bootstrap/Form";

function Formcontent(props){
    return(
        <div>
            <Form.Group id={props.id}>
                <Form.Label>{props.label}</Form.Label>
                <Form.Control type={props.type} value={props.value} onChange={props.onChange} 
                className={props.className} placeholder={props.placeholder}/>
            </Form.Group>
        </div>
    );
}

export default Formcontent;