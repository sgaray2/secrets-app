import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import {Link} from "react-router-dom";

class SucessDelete extends Component{

    render() {
        return (<div id="id-popup" className="popup-title">
        <p className="success-text">Your secret has been succesfully deleted</p>
        <Link style={{"textDecoration": "none"}} to={"/"}>
        <Button className="btn" variant="contained" onClick={this.props.closePopup}>
        <p className="success">Close me</p>
        </Button> 
        </Link> 
        </div>)
}
}

export default SucessDelete;