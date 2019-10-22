import React, { Component } from 'react';
import './dashboard.css'

export default class Dashboard extends Component{

    constructor(props){
        super(props);
        this.state = {
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
        this.setState({
            user: Object.values(this.props.location.state),
            time: new Date().getSeconds(),
            lastTime: this.state.time
        })
        
    }
    componentWillUnmount(){
        const popup = document.getElementById('popup');
        popup.classList.remove('active.popup');
    }
    tick() {
        
        const popup = document.getElementById('popup');
        if(popup && this.state.time  === this.state.lastTime){
            popup.classList.add('activePopup');
            console.log("hello");
        }
        if(this.state.time === this.state.lastTime + 2){
            popup.classList.add('desactivePopup');
            // popup.classList.remove('activePopup');
        }
        this.setState({
            time:new Date().getSeconds()
        })
        console.log(this.state.time);
        // console.log(this.state.lastTime);
    }

    render() {
        return(
            <div className="dashboardContainer" id="dashboardContainer">
                <div className="popup" id="popup">
                    <div className="popupText">
                        Welcome Back 
                        <br/>
                        {this.state.user} !
                    </div>
                </div>
            </div>
        )
    }
}