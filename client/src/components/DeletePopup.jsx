import React, { Component } from "react";
import Button from '@material-ui/core/Button';

class DeletePopup extends Component {

    render() {
        return (
        <div id="id-popup" className="popup-title">
        <p className="success-text">Are you sure you want to delete this secret?</p>
        <Button className="btn-yes" variant="contained" onClick={this.props.deleteSecret}>
        <p className="success">Yes</p>
        </Button>
        <Button className="btn-no" variant="contained" onClick={this.props.closePopup}>
        <p className="success">No</p>
        </Button>
        </div>)
}
}

export default DeletePopup;