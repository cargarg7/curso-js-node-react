import React from 'react'
import ReactDOM from 'react-dom'

class HolaCosa extends React.Component {
  render() {
    return (<h1> Hola, {this.props.cosa}!</h1>)
  }
}

class App extends React.Component {
  render() {
    return <HolaCosa cosa="Mundo" />
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
