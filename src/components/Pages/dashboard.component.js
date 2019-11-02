import React, {Component} from 'react';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";
import './dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';


import ItemModalAddSport from "../ItemModalAddSport";
import ItemModalAddWeight from "../ItemModalAddWeight";
import ItemModalAddSleepingHours from "../ItemModalAddSleepingHours";
import ExerciceList from "../exerciceList.component"; 
import WeightList from "../weightList.component";
import SleepingHoursList from "../SleepingHoursList.component";
import Description from "../description.component"

export default class Dashboard extends Component{

    constructor(props){
        super(props);
        this.state = {
            id : '',
            user:[] ,
            time: new Date().getSeconds(),
            lastTime:null
        }
    }

    componentDidMount(){ 
            this.intervalID = setInterval(
                () => this.tick(),
                1000
            );
            
        setTimeout(()=>{
            this.setState({
                user: Object.values(this.props.location.state),
                time: new Date().getSeconds(),
                lastTime: this.state.time
            }) 

            axios.get('http://localhost:5000/user_route/user/'+ this.state.user)
            .then(response => {
                if (response.data.length > 0) {
                    // console.log(response.data);
                this.setState({
                    id : response.data
                });
                }
            })
            .catch((error) => {
                console.log("The username is not existent");
                console.log(error);
            })
        },200)
        
        
        
    }

    componentWillUnmount(){
        const popup = document.getElementById('popup');
        popup.classList.remove('active.popup');
    }
    tick() {
        
        const popup = document.getElementById('popup');
        if(popup && this.state.time  === this.state.lastTime){
            popup.classList.add('activePopup');
        }
        if(this.state.time === this.state.lastTime + 2){
            popup.classList.add('desactivePopup');
            // popup.classList.remove('activePopup');
        }
        this.setState({
            time:new Date().getSeconds()
        })
        // console.log(this.state.time);
        // console.log(this.state.lastTime);
    }

    render() {
        return(
            <div>
                <div className="popup" id="popup">
                        <div className="popupText">
                            Welcome Back 
                            <br/>
                            {this.state.user} !
                        </div>
                </div>
                <div className ="navbar2">
                    ANATOMY
                    <ItemModalAddSport id={this.state.id}/>
                    <ItemModalAddWeight id={this.state.id}/>
                    <ItemModalAddSleepingHours id={this.state.id}/>
                </div>
                <div className="dashboardContainer" id="dashboardContainer">
                    <div className="box">
                        <Description id={this.state.id}/>
                    </div>
                    <div className="content">
                        <div className="headerDash">
                            Welcome to ANATOMY ! 
                        </div>
                        <WeightList id={this.state.id}/>
                        <SleepingHoursList id={this.state.id}/>
                        <ExerciceList id={this.state.id}/>
                    </div>
                </div>
            </div>
        )
    }
}

{/* <ItemModalAddSport id={this.state.id}/>
                <ItemModalAddWeight id={this.state.id}/>
                <ItemModalAddSleepingHours id={this.state.id}/>
                <div className="Chart">
                    <WeightList id={this.state.id}/>
                    <SlepingHoursList id={this.state.id}/>
                    <ExerciceList id={this.state.id}/>
            </div> */}