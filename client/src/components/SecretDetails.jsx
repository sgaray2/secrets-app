import React, { Component } from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";

class SecretDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      secretId: this.props.match.params.id,
      secretFound: [],
    };
  }

  componentDidMount() {
    fetch("/" + this.props.match.params.id)
      .then((res) => res.json())
      .then((data) => this.setState({ secretFound: data }));
  }

  render() {
    return (
      <div>
        <Header />
        <div className="secret-header">
          <h6>Your secret details</h6>
        </div>
        <div className="container">
          <button className="handleSecret">Edit</button>
          <button className="handleSecret">Delete</button>
        </div>
        <div className="data">
          <p className="secretTitle">{this.state.secretFound.title}</p>
          <p className="secretContent">{this.state.secretFound.content}</p>
        </div>
        <div>
        <Link to="/">
        <button className="goBack">
            Go back
          </button>
        </Link>
        </div>
      </div>
    );
  }
}

export default SecretDetails;
