import React from "react";

function SecretItem(props) {

        return (
            <div className="cards">
              <div 
              className="card-section">
              <div className="secret-title">
              <h5>{props.title}</h5>                    
              </div>
              <div>
              <button className="btn-open">
              Read Me
              </button>   
              </div>
              </div>
            </div>
        );}
       

export default SecretItem;
