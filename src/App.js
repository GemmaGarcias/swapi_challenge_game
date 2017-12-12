import React, { Component } from 'react';
import {Grid, Row, Col} from 'react-bootstrap'
import {getPeople, getSpecies, getVehicles} from './services/swapi'
import './App.css';
import StadisticsPlayer1 from './components/StadisticsPlayer1'
import StadisticsPlayer2 from './components/StadisticsPlayer2'
import Battle from './components/Battle'

class App extends Component {
    constructor(props){
    super(props)
    this.state = {
      people:[],
      play:'',
      gold:'',
      distance:'',
      player1:'', 
      player2:'',
      speciePlayer1: '',
      speciePlayer2: '',
      vehiclePlayer1: '',
      vehiclePlayer2: ''
    }
    this.handleClick = this.handleClick.bind(this)
    this.getRandomPlayers = this.getRandomPlayers.bind(this)
    this.getRandomVars = this.getRandomVars.bind(this)
    this.getSpeciePlayer1 = this.getSpeciePlayer1.bind(this)
    this.getSpeciePlayer2 = this.getSpeciePlayer2.bind(this)
    this.getVehiclePlayer1 = this.getVehiclePlayer1.bind(this)
    this.getVehiclePlayer2 = this.getVehiclePlayer2.bind(this)  
  }
  
// To obtain all People from Api:
  componentDidMount(){
      let urlss= 'https://swapi.co/api/people/?page='
      const aUrlss= Array(9).fill(urlss)
      const aUrlsIterate=aUrlss.map((url,i)=>{return url+(i+1)})

      aUrlsIterate.map((url)=>{
        return getPeople(url)
        .then(data => {
          this.setState({
            people: this.state.people.concat(data.results)
          })
       })
    })
  }

//Start Game with Button:
  handleClick(event){
    event.preventDefault()
    this.setState({
      play:!this.state.play
    })
    this.getRandomPlayers()
    this.getRandomVars()
  }


// Filtering all People who have vehicle. Take 2 Random Players:
  getRandomPlayers= async()=>{    
    const getPlayer = this.state.people.filter(
     (people) => { return people.vehicles.length!==0})

    let random1 = Math.floor(Math.random()*getPlayer.length)
    let random2 = Math.floor(Math.random()*getPlayer.length)
    let player1 = getPlayer[random1]
    let player2 = getPlayer[random2]
    
    this.setState({
      player1,
      player2
    })
    try{
      await this.getSpeciePlayer1()
      await this.getSpeciePlayer1()
      await this.getSpeciePlayer2()
      await this.getVehiclePlayer1()
      await this.getVehiclePlayer2()
    }
    catch(e) {
      throw e
    }
  }


//Getting both randoms gold and distance:
  getRandomVars(){
    function randomIntFromInterval(min,max){
       return Math.floor(Math.random()*(max-min+1)+min)
    }
    const randomG =randomIntFromInterval(100,10000)
    let gold = randomG - (randomG % 100)

    const randomD = randomIntFromInterval(1000,100000)
    let distance = randomD -(randomD % 100)
    this.setState({
      gold,
      distance
    })
  }

// Getting Species from Api:
  getSpeciePlayer1 () {
    getSpecies(this.state.player1.species)
      .then(data => {
        this.setState({
          speciePlayer1: data.name
        })
      })
    }

  getSpeciePlayer2 () {
    getSpecies(this.state.player2.species)
      .then(data => {
        this.setState({
          speciePlayer2: data.name
        })
      })
    }

// Getting Vehicles from Api:
  getVehiclePlayer1 () {
    const vehicles1 = this.state.player1.vehicles
    let random1 = Math.floor(Math.random()*vehicles1.length)
    let playerUrlVehicle1 = vehicles1[random1]
    getVehicles(playerUrlVehicle1)
      .then(data => {
        this.setState({
          vehiclePlayer1:{  
            name: data.name,
            cargo_capacity: data.cargo_capacity,
            speed: data.max_atmosphering_speed
          }
        })
      })
    }

  getVehiclePlayer2(){
    const vehicles2 = this.state.player2.vehicles
    let random2 = Math.floor(Math.random()*vehicles2.length)
    let playerUrlVehicle2 = vehicles2[random2]
    console.log('getvehicle')
    getVehicles(playerUrlVehicle2)
      .then(data => {
        this.setState({
          vehiclePlayer2:{
            name: data.name,
            cargo_capacity: data.cargo_capacity,
            speed: data.max_atmosphering_speed
          }
        })
      })
    }


  render() {
    console.log(this.state)
    let start= this.state.play
    
    if(this.state.people.length!== 87)
    {return (
      <img className='time-spin' src="/img/hourglass.png" alt=""/>
      )
    }else
    { return(
      <div className= 'container App'>
        <Grid>
          {this.state.play?<Battle
            vehiclePlayer1= {this.state.vehiclePlayer1}
            vehiclePlayer2= {this.state.vehiclePlayer2}
            goldPlayer = {this.state.gold}
            distancePlayer = {this.state.distance} 
          />: <h2 className='winnerText'>STAR WARS BATTLE</h2>}
          <Row> 
            <Col md={4} mdOffset={1} >
              <div className='centered'>
                <p className='player1'> Player 1 </p>
                <p className='playerText'>{start&&this.state.player1.name}</p>
                <p className='playerText'>{start&&this.state.speciePlayer1}</p>
                <img className='imgSpace' src="./img/space.png" alt=""/> 
                {start&&<p className='playerText'>{this.state.vehiclePlayer1.name}</p>}
                {start&&(this.state.vehiclePlayer1.length!==0)&&<StadisticsPlayer1 
                goldPlayer1={this.state.gold}
                distancePlayer1={this.state.distance}
                cargoPlayer1={this.state.vehiclePlayer1.cargo_capacity}
                speedPlayer1={this.state.vehiclePlayer1.speed}      
                />}
                {start&&<p className='playerText'>Cargo: 
                  {this.state.vehiclePlayer1.cargo_capacity==='unknown'? 0 :
                   this.state.vehiclePlayer1.cargo_capacity} kg</p>}
                {start&&<p className='playerText'>
                Speed: {this.state.vehiclePlayer1.speed} km/h</p>}
              </div>
            </Col>
            <Col md={2}>
              <div>
                <div className='goldcontain'>
                  <img className="gold" src="/img/gold.png" alt="public"/>
                      <p className='textgold'> {start&&this.state.gold} kg</p>}
                </div> 
                <div className='distancecontain'>
                  <img className="gold" src="/img/distance.png" alt="public"/>
                  <p className='textgold'> {start&&this.state.distance} km</p> 
               </div>
              </div>}
              <button type="button" onClick={this.handleClick} 
              className="btn btn-warning playButton">
                {this.state.play?<span>Next Match</span>:<span>Play</span>}
              </button>      
            </Col>
            <Col md={3} mdOffset={1}>
              <p className='player2'>Player 2</p>
              <p className='playerText'>{start&&this.state.player2.name}</p>
              <p className='playerText'>{start&&this.state.speciePlayer2}</p>
              <img className='imgSpace' src="./img/space.png" alt=""/>
              {start&&<p className='playerText'>{this.state.vehiclePlayer2.name}</p>}
              {start&&(this.state.vehiclePlayer2.length!==0)&&<StadisticsPlayer2 
              goldPlayer2 = {this.state.gold}
              distancePlayer2 = {this.state.distance}
              cargoPlayer2 = {this.state.vehiclePlayer2.cargo_capacity}
              speedPlayer2 = {this.state.vehiclePlayer2.speed}      
              />}
              {start&&<p className='playerText'>
                Cargo: {this.state.vehiclePlayer2.cargo_capacity==='unknown'? 0 :
                  this.state.vehiclePlayer2.cargo_capacity} kg</p>}
              {start&&<p className='playerText'>Speed: {this.state.vehiclePlayer2.speed} km/h</p>}
            </Col>
          </Row>
        </Grid>
      </div>
      )
    }
  }
}

export default App;
