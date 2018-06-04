import React from 'react'
import ReactDOM from 'react-dom'

class HolaMundo extends React.Component {
  render() {
    return <h1>¡Hola, Mundo!</h1>
  }
}

ReactDOM.render(<HolaMundo />, document.getElementById('root'));
