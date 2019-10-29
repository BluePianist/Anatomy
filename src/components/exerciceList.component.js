import React, {Component} from 'react'; 
// import {Link,Switch,  BrowserRouter as Router, Route} from 'react-router-dom';
import axios from 'axios'; 

const Exercice = props => (
    <tr>
        <td>{props.exercice.sport_name}</td>
        <td>{props.exercice.duration}</td>
        <td>{props.exercice.burnt_calories}</td>
        <td>{props.exercice.date.substring(0,10)}</td>
    </tr>
)

export default class exerciceList extends Component{
    constructor(props){
        super(props);
        this.state = {
            exercices: []
        }
    }

    componentDidMount(){
        setTimeout(()=>{
            axios.get('http://localhost:5000/user_route/sp/'+this.props.id)
            .then(response =>{
                this.setState({
                    exercices : response.data
                })
                // console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
        },1000)
    }

    exerciceList = () => {
        if(this.state.exercices != null){
            return this.state.exercices.map(currentexercice => {
                return <Exercice exercice={currentexercice} key={currentexercice._id}/>
            })
        }
    }

    render(){
        return(
            <div>
                <h3>Exercices List</h3>
                <div className="tableau">
                    <table className="table">
                            <thead className="header-tab">
                                    <tr>
                                        <th>Sport</th>
                                        <th>Duration</th>
                                        <th>Burnt calories</th>
                                        <th>Date</th>
                                    </tr>
                            </thead>
                            <tbody>
                                { this.exerciceList() }
                            </tbody>
                    </table>
                </div>
            </div>
        );
    }
}