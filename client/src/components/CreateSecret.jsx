import React, { Component} from "react";
import SuccessPopup from "./SucessPopup";
import ErrorPopup from "./ErrorPopup";

class CreateSecret extends Component {
  constructor(props) {
    super(props);
    this.state={
      title: "",
      content: "",
      maxCharacters: "",
      showPopup: false,
      error: false
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

    /*to change the value from false to true and viceversa*/ 
    togglePopup() {
      this.setState({
        showPopup: !this.state.showPopup
      });
    }

    /*this is for the complete fields error popup*/ 
    toggleErrorPopup () {
      this.setState({error: !this.state.error});
    }

/*this is the function for add button*/
addSecret = async (e) =>{
  const {title, content}= this.state;
  const data= {title,content}

  if(this.state.title && this.state.content){
    this.setState({showPopup: true, error: false})
   
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
else {
  this.setState({error: true})
}
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
          required
          name="title"
          autoComplete="off"
          value= {this.state.title}
          placeholder="What is your secret about?"
          >
          </input>
          <textarea
            type="text"
            onChange={this.handleChange}
            name="content"
            required
            maxLength="240"
            value= {this.state.content}
            placeholder="Hmmm! Type more details...">
          </textarea>
          {
            this.state.showPopup ?
            <button style={{pointerEvents: "none"}} className="button-save" onClick={this.addSecret}>Save</button>
            : <button className="button-save" onClick={this.addSecret}>Save</button>
          }
          
          <div className="characters-container row">
          <p className="characters col-lg-4">
          Characters: {this.state.maxCharacters.length}/240
          </p>
          </div>          
        </div>
        {this.state.showPopup ? 
          <SuccessPopup
            closePopup={this.togglePopup.bind(this)}
          />
          : null
        }

        {
        this.state.error ?
        <ErrorPopup 
          closeErrorPopup={this.toggleErrorPopup.bind(this)}
        /> : null

        }
        </div>
        </div>
  );
    }
}

export default CreateSecret;
