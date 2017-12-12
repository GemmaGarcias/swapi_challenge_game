import React, { Component } from 'react'
import '../App.css';

class StadisticsPlayer2 extends Component { 
  constructor(props){
    super(props)
    this.state = {
      start: false,
      tripsPlayer2:'',
      totalHoursPlayer2:''
    }
  }
  
  componentWillReceiveProps = async() => {
    const {goldPlayer2, distancePlayer2} = this.props
    const cargoPlayer2= this.props.cargoPlayer2==='unknown' ?'' : 
    parseInt(this.props.cargoPlayer2)

    const speedPlayer2 = parseInt(this.props.speedPlayer2)

    // Number of trips is the result of total cargo devided capacity in the ship per trip
    // The ship will do the trips two times to go to get more gold.
    // I don't count the last trip because I don't want to return when finish to bring the charge.
    // There are two ours of charge and empty the ship per trip with charge
    // To get the hours, I diveded total distance by speed per hour 
    // There are two trips per total distance: 
    // Because the ship goes to give the gold and return to charge more.
    const tripsPlayer2 = this.state.start&&this.props.cargoPlayer2==='unknown'?
      "The ship can't transport gold. No" : (Math.ceil(goldPlayer2/cargoPlayer2)*2)-1 //to round up
    const hoursOfChargePlayer2 = Math.ceil(goldPlayer2/cargoPlayer2)*2
    const hoursPerTripPlayer2 = (distancePlayer2*tripsPlayer2)/speedPlayer2
    const totalHoursPlayer2 = 
      this.state.start&&isNaN(tripsPlayer2)?'No': 
        Math.round(hoursOfChargePlayer2 + hoursPerTripPlayer2) //to round to nearest integer
    try{
      this.setState({
        start: true,
        tripsPlayer2,
        totalHoursPlayer2
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
        <p className= 'player2'>{this.state.totalHoursPlayer2} Hours</p>
        <p className= 'player2'>{this.state.tripsPlayer2} Trips</p>
      </div>
    )
  }
}

export default StadisticsPlayer2;