import React from "react";

function SecretItem(props) {

  return (
      <div className="card-section">
      <div className="secret-title">
      <h5 className="title">{props.title}</h5>
      <br/>     
      </div> 
      <button className="btn-open">
      Read Me
      </button>  
      </div>
);}

       

export default SecretItem;
