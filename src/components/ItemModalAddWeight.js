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

export default class ItemModalAddWeight extends Component {
    constructor(props){
        super(props);

        this.state = {
            modal : false,
            weight : '',
            date : new Date()
        }
    }

    toggle = () => {
        this.setState({
            modal : !this.state.modal
        });
    }

    onChangeWeight = (e) => {
        this.setState({
            weight : e.target.value
        });
    }

    onChangeDate = (date) => {
        this.setState({
            date : date
        });
    }

    onSubmit = (e) => {
        e.preventDefault();

        const weightList = {
            weight : this.state.weight,
            date : this.state.date
        }

        const url = 'http://localhost:5000/user_route/add_we/'+this.props.id;
        console.log("url:" + url);
        axios.post(url, 
        {
            "weight_evolution" :{
                weight : this.state.weight,
                date : this.state.date
            }
        }
        )
        .then(res => console.log("data : " + res.data))
        .catch((error) => {
            console.log("error :" + error);
        });

        console.log(weightList);
        window.location.reload();
        this.toggle();  //Close the modal
    }

    render(){
        return(
            <div>
                <button className="button"
                    onClick={this.toggle}
                >Add Weight</button>

                <Modal
                    isOpen = {this.state.modal}
                    toggle = {this.toggle}
                >
                    <ModalHeader toggle = {this.toggle}>Add your weight</ModalHeader>
                    <ModalBody>
                    <form onSubmit={this.onSubmit}>
                        
                        <div className="form-group">
                            <label>Weight: (kg) </label>
                            <input type="text"
                                required
                                className ="form-control"
                                value= {this.state.weight}
                                onChange={this.onChangeWeight}
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
                            <Button type="submit" className ="btn btnprimary">Add</Button>
                        </div>
    
                    </form>      
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}