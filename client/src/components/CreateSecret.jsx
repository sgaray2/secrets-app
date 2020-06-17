import React, { Component} from "react";


class CreateSecret extends Component {
  constructor(props) {
    super(props);
    this.state={
      title: "",
      content: ""
    }
  }

/*this is to handle the inputs and save into states*/
handleChange = async event => {

        //destructuring the inputs
        const {name, value}= event.target;

        this.setState((prevValue) => {
            return {...prevValue, [name]: value};
        });
    }

/*this is the function for add button*/
addSecret = async () =>{
  const {title, content}= this.state;
  const data= {title,content}

  fetch("/secrets" , {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
}

  render() {
    return (
      <div>
        <div className="secret-header">
        <h6>Create a new secret</h6>
        </div>
        <div>
        <div className="form">
          <input 
          type="text" 
          onChange={this.handleChange}
          name="title"
          required
          autoComplete="off"
          value= {this.state.title}
          placeholder="Secret title">
          </input>
          <textarea
            type="text"
            onChange={this.handleChange}
            name="content"
            required
            value= {this.state.content}
            placeholder="Type more details about your secret..."
          ></textarea>
          <button className="button-save" onClick={this.addSecret}>Save</button>
        </div>
        </div>
        </div>
  );
    }
}

export default CreateSecret;
