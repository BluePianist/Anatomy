import React, {Component} from 'react'; 
// import {Link,Switch,  BrowserRouter as Router, Route} from 'react-router-dom';
import axios from 'axios'; 

import avatar from "./Pages/Sport/User_Avatar.png";





export default class description extends Component{
    constructor(props){
        super(props);
        this.state = {
            user: [],
            weight :0
        }
    }

    componentDidMount(){
        setTimeout(()=>{
            axios.get('http://localhost:5000/user_route/'+this.props.id)
            .then(response =>{
                this.setState({
                    user : response.data,
                    weight : response.data.weight_evolution[(response.data.weight_evolution.length) - 1].weight
                })
            })
            .catch((error) => {
                console.log(error);
            })
        },1000)
    }
    
    render(){
        return(
            <div >
                <img className="pic" src={avatar} alt=""/>
                <p className="descr"><br/>
                <b>Name : </b>{this.state.user.Name} <br/>
                <b>Email :</b> {this.state.user.Email} <br/>
                <b>Height :</b> {this.state.user.height} cm<br/>
                <b>Current weight : </b> {this.state.weight} kg<br/>
                <b>Ideal weight :</b> {this.state.user.idealWeight} kg<br/>
                </p>
            </div>
        );
    }
}