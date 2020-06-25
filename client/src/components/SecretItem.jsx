import React, {Component} from "react";
import { Link } from "react-router-dom";


class SecretItem extends Component {
constructor(props){
  super(props);
  this.state= {
    secretItem: ""
  }
}

  render() {
    return (
       <div className="card-section">
          <div className="secret-title">
          <h5 className="title">{this.props.title}</h5>
          <br/>     
          </div> 
          <Link to={"/"+this.props._id}>
          <button className="btn-open">Read Me</button>
          </Link>
      </div>)
      }
  }


export default SecretItem;
