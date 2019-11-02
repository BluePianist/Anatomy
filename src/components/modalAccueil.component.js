import {
    Button,
    Modal,
    ModalHeader,
    ModalBody
  } from 'reactstrap';
import React, {Component} from 'react';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";

export default class ModalAddInformations extends Component {
    constructor(props){
        super(props);

        this.state = {
            userName:[],
            userData:undefined,
            time: new Date().getSeconds(),
            lastTime:null,
            isOpen: '',
            height:'',
            idealWeight:'',
            needInfo: undefined,
        }
    }

    componentDidMount(){
        this.setState({
            isOpen : this.props.isOpen
        })
    }

    modalToggle = ()=>{
        this.setState({isOpen: !this.state.isOpen})
        console.log(this.props.isOpen);
    }
    onChange = e => {
        e.preventDefault();
        const {name, value} = e.target
        this.setState({[name]: value})
    }
    onSubmit = e => {
        e.preventDefault();
        const url = 'http://localhost:5000/user_route/update/'+this.props.id;
        const values = {
            height: this.state.height,
            idealWeight: this.state.idealWeight,
        }
        
        axios.put(url, values)
        .then(() => {
            this.modalToggle();
            console.log('updated');
        }).catch(e => console.log('error: '+e))
        console.log(this.state.user);
        window.location.reload();
    }


    render(){
        return(
            <div className="modalContainer">
                <button className="button"
                    onClick={this.modalToggle}
                >Update your informations</button>
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
}