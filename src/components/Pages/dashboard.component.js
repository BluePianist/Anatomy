import React, {Component} from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody
  } from 'reactstrap';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";
import './dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import ModalAddInformations from "../modalAccueil.component"
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
            userName:[],
            userData:undefined,
            time: new Date().getSeconds(),
            lastTime:null,
            isOpen: true,
            height:'',
            idealWeight:'',
            needInfo: undefined,
        }
    }

    componentDidMount(){ 
            this.intervalID = setInterval(
                () => this.tick(),
                1000
            );
            
        setTimeout(()=>{
            this.setState({
                userName: Object.values(this.props.location.state),
                time: new Date().getSeconds(),
                lastTime: this.state.time
            }) 

            axios.get('http://localhost:5000/user_route/user/'+ this.state.userName)
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
            setTimeout(() => {
                axios.get('http://localhost:5000/user_route/'+this.state.id)
                .then(response =>{
                    this.setState({
                        userData : response.data
                    })
                    // console.log(response.data);
                })
                .catch((error) => {
                    console.log(error);})
                
            }, 200);
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
    modalToggle = () => {
        this.setState({isOpen: !this.state.isOpen})
    }
    onChange = e => {
        e.preventDefault();
        const {name, value} = e.target
        this.setState({[name]: value})
    }
    onSubmit = e => {
        e.preventDefault();
        const url = 'http://localhost:5000/user_route/update/'+this.state.id;
        const values = {
            height: this.state.height,
            idealWeight: this.state.idealWeight,
        }
        console.log(values);
        axios.put(url, values)
        .then(() => {
            this.modalToggle();
            console.log('updated');
        }).catch(e => console.log('error: '+e))
        console.log(this.state.userName);
        window.location.reload();
    }

    get displayModal () {
        setTimeout(() => {
            if(this.state.userData && (this.state.userData.weight === 0 || this.state.userData.weight === undefined)){
                return (
                    <div className="modalContainer">
                        <Modal isOpen={this.state.isOpen} toggle={this.modalToggle}>
                            <ModalHeader toggle={this.modalToggle}>We need a couple information to begin</ModalHeader>
                            <ModalBody>
                                <form onSubmit={this.onSubmit}>
                                    <label>Please give us your height in cm</label> <br/>
                                    <input type="text"
                                    required
                                    name="height"
                                    className ="inputHeight"
                                    placeholder="Ex: 190"
                                    value= {this.state.height}
                                    onChange={this.onChange}
                                    /> <br/>
                                    <label >Please give us your ideal weight in kg</label> <br/>
                                    <input type="text"
                                    required
                                    name="idealWeight"
                                    className ="inputIdealWeight"
                                    placeholder="Ex: 90"
                                    value= {this.state.idealWeight}
                                    onChange={this.onChange}
                                    /><br/><br/>
                                    <Button type="submit" className ="btn btnprimary">submit</Button>
                                </form>
                            </ModalBody>
                        </Modal>
                    </div>
                );
            }
        }, 1000)
    }

    render() {
        return(
            <div>
                <div className="popup" id="popup">
                        <div className="popupText">
                            Welcome Back 
                            <br/>
                            {this.state.userName} !
                        </div>
                </div>
                <div className ="navbar2">
                    <h3 className="log_tit">ANATOMY</h3>
                    <ItemModalAddSport id={this.state.id}/>
                    <ItemModalAddWeight id={this.state.id}/>
                    <ItemModalAddSleepingHours id={this.state.id}/>
                    <ModalAddInformations id={this.state.id} isOpen={false}/>
                </div>
                {this.displayModal}
                <div className="dashboardContainer" id="dashboardContainer">
                    <div className="box">
                        <Description id={this.state.id}/>
                    </div>
                    <div className="content">
                        <div className="headerText">
                            Keep track of your body performance
                        </div>
                        <div className="two_dash">
                        <WeightList id={this.state.id}/>
                        <SleepingHoursList id={this.state.id}/>
                        </div>
                        <ExerciceList id={this.state.id}/>
                    </div>
                </div>
            </div>
        )
    }
}
