import React, {Component} from "react";
import Header from "./components/Header";
import CreateSecret from "./components/CreateSecret";
import SecretList from "./components/SecretList";
import SecretItem from "./components/SecretItem";
import Footer from "./components/Footer";

class App extends Component {
    constructor(props) {
        super(props);
        this.state={
            secrets: []
        }
}

fetchSecrets () {
    fetch("/secrets")
    .then(res => res.json())
    .then(data => this.setState({secrets: data}))
}

componentDidMount () {
    this.fetchSecrets();
    this.timer = setInterval(() => this.fetchSecrets(), 1000);
}

    render() {
        return (
            <div>
            <Header/>
            <CreateSecret />
            <SecretList />
            {
                this.state.secrets.map((secret,index) => (
                    <SecretItem 
                        key={index}
                        _id={secret._id}
                        id= {index}
                        title={secret.title}
                        content={secret.content}
                    />
                ))
            }
            <Footer />
            </div>
        )
    }
}

export default App;