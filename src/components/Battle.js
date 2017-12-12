import React, { Component } from 'react'
import '../App.css';

class Battle extends Component { 
  constructor(props){
    super(props)
    this.state = {
      start: false,
    }
  }

  componentWillReceiveProps= async() => {
  	const{vehiclePlayer1, vehiclePlayer2, goldPlayer, distancePlayer} = this.props

  	const cargoPlayer1 = vehiclePlayer1.cargo_capacity==='unknown' ? '' : parseInt (vehiclePlayer1.cargo_capacity)  
    const speedPlayer1 = parseInt(vehiclePlayer1.speed)
    const tripsPlayer1 = this.state.start&&vehiclePlayer1.cargo_capacity==='unknown'?
      "" : (Math.ceil(goldPlayer/cargoPlayer1)*2)-1 
    const hoursOfChargePlayer1 = Math.ceil(goldPlayer/cargoPlayer1)*2
    const hoursPerTripPlayer1 = (distancePlayer*tripsPlayer1)/speedPlayer1
    const totalHoursPlayer1 = 
      isNaN(tripsPlayer1)?'':
        Math.round(hoursOfChargePlayer1 + hoursPerTripPlayer1)

    const cargoPlayer2 = vehiclePlayer2.cargo_capacity==='unknown' ? '' : parseInt (vehiclePlayer2.cargo_capacity)  
    const speedPlayer2 = parseInt(vehiclePlayer2.speed)
    const tripsPlayer2 = this.state.start&&vehiclePlayer2.cargo_capacity==='unknown'?
      "" : (Math.ceil(goldPlayer/cargoPlayer2)*2)-1 
    const hoursOfChargePlayer2 = Math.ceil(goldPlayer/cargoPlayer2)*2
    const hoursPerTripPlayer2 = (distancePlayer*tripsPlayer2)/speedPlayer2
    const totalHoursPlayer2 = 
      isNaN(tripsPlayer2)?'':
        Math.round(hoursOfChargePlayer2 + hoursPerTripPlayer2) 
	

  	const winner = (totalHoursPlayer1<totalHoursPlayer2)?'PLAYER 1 WINS!!!':
  			(totalHoursPlayer1>totalHoursPlayer2)? 'PLAYER 2 WINS!!!': 'TIE!'

  	try{
      this.setState({
  		wins:winner
  	})
    }
    catch(e) {
      throw e
    }
  }


  render() {
    console.log(this.state)
    return (
      <div>
        <h2 className='winnerText'>{this.state.wins}</h2>
      </div>
    )
  }
}

export default Battle;