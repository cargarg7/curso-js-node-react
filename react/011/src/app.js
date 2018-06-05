import React, { Component } from 'react'
import weather from './lib/city-weather'
import Banner from './components/banner'
// tu codigo aqui

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      city: null,
      weather: null,
      loading: false,
      error: null
    }
    this.searchCity = this.searchCity.bind(this)
  }
  searchCity(city) {
    // tu codigo aqui
  }
  render() {
    const { searchCity } = this
    const { weather, city, loading, error } = this.state
    return (
      <div className="main-content wrapper">
        <div className="widget">
          <div className="widget-content">
            <Banner>Introduce la ciudad</Banner>
            <h1>Tu código aquí</h1>
            <h5>(pero no todo aquí! haz componentes!)</h5>
          </div>
        </div>
      </div>
    )
  }
}

export default App
