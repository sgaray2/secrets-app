import React, { Component } from "react";
import Button from '@material-ui/core/Button';

class SuccessPopup extends Component{

    render() {
        return (<div id="id-popup" className="popup-title">
        <p className="success-text">Your secret has been saved succesfully</p> 
        <Button className="btn" variant="contained" onClick={this.props.closePopup}>
        <p className="success">Close me</p>
        </Button></div>)
}
}

export default SuccessPopup;

