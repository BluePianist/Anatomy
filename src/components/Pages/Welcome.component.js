import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom'
import forms from './forms.component'
import Navbar from '../Navbar.component'
import './Welcome.css'
import axios from 'axios'

// const delay = ms => new Promise(res => setTimeout(res, ms));


const yourFunction = (activeBackground) => {
    const welcomeContainerBackground = document.getElementById('welcomeContainerBackground')
    switch(activeBackground){
        case 0:
            // await delay(1000);
            welcomeContainerBackground.classList.add('active');
            activeBackground = 1;
            return activeBackground;
        case 1:
            // await delay(4000);
            welcomeContainerBackground.classList.remove('active');
            welcomeContainerBackground.classList.add('active2');
            activeBackground = 2;
            return activeBackground;
        case 2:
            // await delay(4000);
            welcomeContainerBackground.classList.add('active');
            welcomeContainerBackground.classList.remove('active2');
            activeBackground = 3;
            return activeBackground;
        case 3:
            // await delay(4000);
            welcomeContainerBackground.classList.remove('active');
            welcomeContainerBackground.classList.remove('active2');
            activeBackground = 0;
            return activeBackground;
        default:
            break;
    }
  };

export default class Welcome extends Component {

    constructor(props){
        super(props);
        this.state = {
            time: new Date().getSeconds().toLocaleString,
            activeBackground: 0,
            localHour: new Date().getUTCHours() -4,
            localMinutes: new Date().getUTCMinutes(),
            localSeconds: new Date().getUTCSeconds(),
            localTemperature:"29"
        }
    }

    componentDidMount(){
            this.intervalID = setInterval(
            () => this.tick(),
            1000
          );
        axios.get('http://api.weatherstack.com/current?access_key=26ae0f14a9ad89b8a6ddb490bf4931c5&query=Martinique')
        .then(res => {
            this.setState({
                localTemperature: res.data.current.temperature
            })
        })
        .catch(err => {throw err})
    }
    
    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    tick() {
        this.setState({
          time: new Date().getSeconds().toLocaleString(),
          localHour: new Date().getUTCHours().toString() -4,
          localMinutes: new Date().getUTCMinutes().toLocaleString(),
          localSeconds: new Date().getUTCSeconds().toLocaleString(),
        });
        if(this.state.time % 5 === 0){
            this.setState({
                activeBackground: yourFunction(this.state.activeBackground)
            })
        }
    }
    
    render(){
        return (
            <div  className="welcomeContainer" id="welcomeContainer">
                <Navbar/>
                <div className="title">Anatomy</div>
                <div className="buttonContainer">
                    <Route exact path='/forms' component={forms}></Route>
                    <Link  to="/forms">
                        <button className="formButton">Build</button>
                    </Link>
                </div>
                <div className="welcomeContainerBackground" id="welcomeContainerBackground">
                    <div  className="welcomeBackground1" id="welcomeBackground1"></div>
                    <div  className="welcomeBackground2" id="welcomeBackground2"></div>
                    <div  className="welcomeBackground3" id="welcomeBackground3"></div>
                </div>
            </div>
        )
    }
}  