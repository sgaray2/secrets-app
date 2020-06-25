import React, { Component } from "react";
import Button from '@material-ui/core/Button';

class ErrorPopup extends Component {


render() {
    return (<div id="id-popup" className="popup-title">
        <p className="success-text">Ups, please complete all the fields</p> 
        <Button className="btn" variant="contained" onClick={this.props.closeErrorPopup}>
        <p className="success">Close me</p>
        </Button></div>)
}
}

export default ErrorPopup;