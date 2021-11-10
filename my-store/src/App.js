import './App.css';
import React, {Component} from 'react'

class App extends Component{
constructor(props) 
{
  super(props);
  this.state = { response: "" };
}

callAPI() 
{
  fetch("http://localhost:3000/testAPI")
      .then(res => res.text())
      .then(res => this.setState({ apiResponse: res }));
}

componentWillMount() 
{
  this.callAPI();
}


render() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <p className="App-intro">;{this.state.apiResponse}</p>
    </div>
  );
}

}
export default App;
