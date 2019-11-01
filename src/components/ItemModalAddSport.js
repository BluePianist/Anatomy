import {
    Button,
    Modal,
    ModalHeader,
    ModalBody
  } from 'reactstrap';
import React, {Component} from 'react';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from 'react-datepicker';

export default class ItemModalAddSport extends Component {
    constructor(props){
        super(props);
        this.state = {
            modal : false,
            sport_name :'',
            duration : 0,
            burnt_calories : 0,
            date : new Date(),
        }
    }


    toggle = () => {
        this.setState({
            modal : !this.state.modal
        });
    }

    onChangeSportName = (e) => {
        this.setState({
            sport_name : e.target.value
        });
    }

    onChangeDuration = (e) => {
        this.setState({
            duration : e.target.value
        });
    }
 
    onChangeBurntCalories = (e) => {
        this.setState({
            burnt_calories : e.target.value
        });
    }

    onChangeDate = (date) => {
        this.setState({
            date : date
        });
    }

    onSubmit = (e) => {
        e.preventDefault();

        const exercice = {
            sport_name : this.state.sport_name,
            duration : this.state.duration,
            burnt_calories : this.state.burnt_calories,
            date : this.state.date
        }
        
        const url = 'http://localhost:5000/user_route/add_sp/'+this.props.id;
        console.log("url:" + url);
        axios.post(url, 
        {
            "sportsList" :{
                sport_name : this.state.sport_name,
                duration : this.state.duration,
                burnt_calories : this.state.burnt_calories,
                date : this.state.date
            }
        }
        )
        .then(res => console.log("data : " + res.data))
        .catch((error) => {
            console.log("error :" + error);
        });

        console.log(exercice);
        this.toggle();  //Close the modal
    }

    render(){
        return(
            <div>
                <Button
                    onClick={this.toggle}
                >Add Sport</Button>

                <Modal className="Modal"
                    isOpen = {this.state.modal}
                    toggle = {this.toggle}
                >
                    <ModalHeader toggle = {this.toggle}>Add a sport to the list</ModalHeader>
                    <ModalBody>
                        <form onSubmit={this.onSubmit}>
                            <p>id : {this.props.id}</p>
                            <div className="form-group">
                                <label>Sport: </label>
                                <input type="text"
                                    required
                                    className ="form-control"
                                    value= {this.state.sport_name}
                                    onChange={this.onChangeSportName}
                                />
                            </div>
        
                            <div className="form-group">
                                <label>Duration: </label>
                                <input type="text"
                                    required
                                    className ="form-control"
                                    value= {this.state.duration}
                                    onChange={this.onChangeDuration}
                                    />
                            </div>
        
                            <div className="form-group">
                                <label>Burnt calories: </label>
                                <input type="text"
                                    required
                                    className ="form-control"
                                    value= {this.state.burnt_calories}
                                    onChange={this.onChangeBurntCalories}
                                    />
                            </div>
        
                            <div className="form-group">
                                <label>Date: </label>
                                <div>
                                    <DatePicker
                                    selected={this.state.date}
                                    onChange={this.onChangeDate}
                                    />
                                </div>
                            </div>
        
                            <div className="form-group">
                                <Button type="submit" className ="btn">Add</Button>
                            </div>
        
                        </form>      
                    </ModalBody>
                </Modal>
            </div>
        );
    }
    
}