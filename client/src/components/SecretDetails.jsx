import React, { Component } from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import DeletePopup from "./DeletePopup";
import SucessDelete from "./SuccessDelete";

class SecretDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      secretId: this.props.match.params.id,
      secretFound: [],
      titleUpdate: "",
      contentUpdate: "",
      openPopup: false,
      successPopup: false
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.deleteSecret = this.deleteSecret.bind(this);
    this.openPopup = this.openPopup.bind(this);
    this.closeDeletePopup = this.closeDeletePopup.bind(this);
  }

  componentDidMount() {
    fetch("/" + this.props.match.params.id)
      .then((res) => res.json())
      .then((data) => this.setState({ secretFound: data }));
  }

  handleDelete() {
    this.setState({ deleteSecret: !this.state.deleteSecret });
  }

  async deleteSecret () {
    this.setState({successPopup: true})
    this.setState({openPopup: !this.state.openPopup})
    await fetch("/"+this.props.match.params.id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
  }

  closeDeletePopup () {
    this.setState({successPopup: !this.state.successPopup})
  }

  openPopup () {
    this.setState({
      openPopup: !this.state.openPopup
    })
  }

  render() {
    return (
      <div>
        <Header />
        <div className="secret-header">
          <h6>Your secret details</h6>
        </div>
        <div className="container">
          <Link to={"/edit/" + this.state.secretId}>
            <button className="handleSecret">Edit</button>
          </Link>
          <button className="handleSecret" onClick={this.openPopup}>
            Delete
          </button>
          {this.state.openPopup ? 
            <DeletePopup deleteSecret={this.deleteSecret}
            closePopup={this.openPopup}
          /> : null}
        </div>
        {
         this.state.successPopup ?
         <SucessDelete 
           closePopup={this.closeDeletePopup}
         /> : null
        }

        <div className="data">
          <p className="secretTitle">{this.state.secretFound.title}</p>
          <p className="secretContent">{this.state.secretFound.content}</p>
        </div>
        <div>
          <Link to="/">
            <button className="goBack">Go back</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default SecretDetails;
