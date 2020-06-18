import React, { Component} from "react";


class CreateSecret extends Component {
  constructor(props) {
    super(props);
    this.state={
      title: "",
      content: "",
      maxCharacters: ""
    }
  }

/*this is to handle the inputs and save into states*/
handleChange = async event => {
  this.setState({maxCharacters: event.target.value});

        //destructuring the inputs
        const {name, value}= event.target;

        this.setState((prevValue) => {
            return {...prevValue, [name]: value};
        });
    }

/*this is the function for add button*/
addSecret = async (e) =>{
  const {title, content}= this.state;
  const data= {title,content}

  fetch("/secrets" , {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(()=> {
    this.setState({title: "", content: "", maxCharacters: ""})
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
          maxLength="40"
          onChange={this.handleChange}
          name="title"
          required
          autoComplete="off"
          value= {this.state.title}
          placeholder="What is your secret about?">
          </input>
          <textarea
            type="text"
            onChange={this.handleChange}
            name="content"
            required
            maxLength="240"
            value= {this.state.content}
            placeholder="Hmmm! Type more details..."
          >
          </textarea>
          <button className="button-save" onClick={this.addSecret}>Save</button>
          <div className="characters-container row">
          <p className="characters col-lg-4">
          Characters: {this.state.maxCharacters.length}/240
          </p>
          </div>
        </div>
        
        </div>
        </div>
  );
    }
}

export default CreateSecret;
