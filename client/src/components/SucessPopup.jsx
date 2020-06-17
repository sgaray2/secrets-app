import React, { Component } from "react";
import Button from '@material-ui/core/Button';

/*this.props.onClose is the parent function that is on createSecret component,
so there we are going to do some actions when the user clicks on this button*/
class SuccessPopup extends Component{
    

    render() {
        let popup= (
           
            <div id="id-popup" className="popup-title">
            <p className="success-text">Your secret has been saved succesfully</p>
            <Button className="btn" variant="contained" onClick={this.props.onClose}>
            <p className="success">Close me</p>
            </Button>
            </div>
            )

        if(! this.props.isOpen) {
            popup=null;
        }

        return (<div>
        {popup}
        </div>)
        
}
}

export default SuccessPopup;

