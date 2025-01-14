import React, {Component} from 'react'
import Filters from './Filters'
import PetBrowser from './PetBrowser'

export default class App extends Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  handleChangeType = (e) => {
    this.setState({filters: {type: e.target.value}})
  }

  getPets = () => {
    let baseURL = '/api/pets'

    if (this.state.filters.type !== 'all') {
      baseURL = baseURL + '?type=' + this.state.filters.type
    }

    fetch(baseURL)
    .then(response => response.json())
    .then(data => this.setState({pets: data}))
  }

  onAdoptPet = id => {
    const pets = this.state.pets.map( pet => {
      return pet.id === id ? {...pet, isAdopted: true} : pet
    })
    this.setState({pets})
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={e => this.handleChangeType(e)} onFindPetsClick={this.getPets}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
