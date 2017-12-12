import React, { Component } from 'react'
import '../App.css';

class StadisticsPlayer1 extends Component { 
  constructor(props){
    super(props)
    this.state = {
      start: false,
      tripsPlayer1:'',
      totalHoursPlayer1:''
    }
  }
  
  componentWillReceiveProps = async() => {
    const {goldPlayer1, distancePlayer1} = this.props
    const cargoPlayer1 = this.props.cargoPlayer1==='unknown' ? '' : 
    parseInt (this.props.cargoPlayer1)
    
    const speedPlayer1 = parseInt(this.props.speedPlayer1)

    // Number of trips is the result of total cargo devided capacity in the ship per trip
    // The ship will do the trips two times to go to get more gold.
    // I don't count the last trip because I don't want to return when finish to bring the charge.
    // There are two ours of charge and empty the ship per trip with charge
    // To get the hours, I diveded total distance by speed per hour 
    // There are two trips per total distance: 
    // Because the ship goes to give the gold and return to charge more.
    const tripsPlayer1 = this.state.start&&this.props.cargoPlayer1==='unknown'?
      "The ship can't transport gold. No" : (Math.ceil(goldPlayer1/cargoPlayer1)*2)-1 //to round up
    const hoursOfChargePlayer1 = Math.ceil(goldPlayer1/cargoPlayer1)*2
    const hoursPerTripPlayer1 = (distancePlayer1*tripsPlayer1)/speedPlayer1
    const totalHoursPlayer1 = 
      this.state.start&&isNaN(tripsPlayer1)?'No':
        Math.round(hoursOfChargePlayer1 + hoursPerTripPlayer1) //to round to nearest integer
    try{
      this.setState({
        start: true,
        tripsPlayer1,
        totalHoursPlayer1
      })
    }
    catch(e) {
      throw e
    }
  }

  render() {

    return (
      <div>
        {this.props.player1==='unknown'?
          <p></p>:<p className= 'player1'>{this.state.totalHoursPlayer1} Hours</p>}
        <p className= 'player1'>{this.state.tripsPlayer1} Trips</p>
      </div>
    )
  }
}

export default StadisticsPlayer1;