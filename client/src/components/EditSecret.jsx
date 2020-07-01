import React, { Component } from "react";
import Header from "./Header";
import { Link } from "react-router-dom";
import UpdatePopup from "../components/UpdatePopup";
import ErrorPopup from "../components/ErrorPopup";

class EditSecret extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopup: false,
      error: false,
      maxCharacters: "",
      id: "",
      title: "",
      content: ""
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.updateSecret = this.updateSecret.bind(this);
  }

  componentDidMount() {
    fetch("/" + this.props.match.params.id)
      .then((res) => res.json())
      .then((secret) => {
          this.setState({
            id: secret._id,
            title: secret.title,
            content: secret.content 
          });
          console.log(this.state);
      })
      .catch(err => console.log(err));
  }

  /*to change the value from false to true and viceversa*/
  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup,
    });
  }

  /*this is for the complete fields error popup*/
  toggleErrorPopup() {
    this.setState({ error: !this.state.error });
  }

  handleInputChange = (event) => {
    const target= event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
        [name]: value
    })
  };

  //updating the secret
  updateSecret = async () => {
      const secretUpdate = {
          title: this.state.title,
          content: this.state.content
      }

      if(secretUpdate.title && secretUpdate.content) {
        await fetch("/edit/" + this.props.match.params.id, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(secretUpdate),
          }).then(() => {
            this.setState({ showPopup: true });
          });
      } else {
          this.setState({error: true})
      }
};

  render() {
    return (
      <div style={{ height: "700px" }}>
        <Header />
        <div className="secret-header">
          <h6>Secret Edition</h6>
        </div>
        <div className="form">
          <input
            type="text"
            maxLength="40"
            required="required"
            onChange={this.handleInputChange}
            name="title"
            autoComplete="off"
            value={this.state.title}
            placeholder="What is your secret about?"
          ></input>
          <textarea
            type="text"
            name="content"
            onChange={this.handleInputChange}
            required
            value={this.state.content}
            maxLength="200"
            placeholder="Hmmm! Type more details..."
          ></textarea>
          {this.state.showPopup ? (
            <button
              style={{ pointerEvents: "none" }}
              className="button-save"
              onClick={this.updateSecret}
            >
              Update
            </button>
          ) : (
            <button className="button-save" onClick={this.updateSecret}>
              Update
            </button>
          )}
          {this.state.showPopup ? (
            <UpdatePopup closePopup={this.togglePopup.bind(this)} />
          ) : null}
          {this.state.error ? (
            <ErrorPopup closeErrorPopup={this.toggleErrorPopup.bind(this)} />
          ) : null}

          <div className="characters-container row">
            <p className="characters col-lg-4">
                Characters: {this.state.content.length + this.state.title.length}/240
            </p>
          </div>
        </div>
        <Link to={"/" + this.state.id}>
          <button className="goBack">Go back</button>
        </Link>
        <br />
      </div>
    );
  }
}

export default EditSecret;
