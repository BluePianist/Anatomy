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

export default class ItemModalAddSleepingHours extends Component {
    constructor(props){
        super(props);

        this.state = {
            modal : false,
            hours : '0',
            date : new Date()
        }
    }

    toggle = () => {
        this.setState({
            modal : !this.state.modal
        });
    }

    onChangeHours = (e) => {
        this.setState({
            hours : e.target.value   
        })
    }

    onChangeDate = (date) => {
        this.setState ({
            date : date
        })
    }

    onSubmit = (e) => {
        e.preventDefault();

        const sleepingHours = {
            hours : this.state.hours,
            date : this.state.date
        }

        const url = 'http://localhost:5000/user_route/add_sh/'+this.props.id;
        console.log("url:" + url);
        axios.post(url, 
        {
            "sleepingHours" :{
                hours : this.state.hours,
                date : this.state.date
            }
        }
        )
        .then(res => console.log("data : " + res.data))
        .catch((error) => {
            console.log("error :" + error);
        });
        console.log(sleepingHours);
        
        this.toggle();  //Close the modal
    }

    render(){
        return(
            <div>
                <button className="button"
                    onClick={this.toggle}
                >Add Sleeping Hours</button>

                <Modal 
                    isOpen = {this.state.modal}
                    toggle = {this.toggle}
                >
                    <ModalHeader toggle = {this.toggle}>Add your sleeping hours to the list</ModalHeader>
                    <ModalBody>
                    <form onSubmit={this.onSubmit}>
                        
                    <div className="form-group">
                        <label>Sleeping Hours: </label>
                        <input type="text"
                            required
                            className ="form-control"
                            value= {this.state.hours}
                            onChange={this.onChangeHours}
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
                        <Button type="submit" className ="btn btnprimary">Add a new exercice</Button>
                    </div>

                </form>      
                    </ModalBody>
                </Modal>
            </div>
        );
    }

}