import React, {Component} from 'react'; 
// import {Link,Switch,  BrowserRouter as Router, Route} from 'react-router-dom';
import axios from 'axios'; 

import avatar from "./Pages/Sport/User_Avatar.png";





export default class description extends Component{
    constructor(props){
        super(props);
        this.state = {
            user: []
        }
    }

    componentDidMount(){
        setTimeout(()=>{
            axios.get('http://localhost:5000/user_route/'+this.props.id)
            .then(response =>{
                this.setState({
                    user : response.data
                })
                // console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
        },1000)
    }

   

    render(){
        return(
            <div >
                <img className="pic" src={avatar}/>
                <p className="descr"><br/>
                <b>Name : </b>{this.state.user.Name} <br/>
                <b>Email :</b> {this.state.user.Email} <br/>
                <b>Height : {this.state.user.height}</b><br/>
                <b>Current weight : {this.state.user.weight}</b><br/>
                <b>Ideal weight : {this.state.user.idealWeight}</b><br/>
                </p>
            </div>
        );
    }
}