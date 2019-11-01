import React, {Component} from 'react';
import axios from 'axios';
import Chart from "./Chart";

export default class sleepingHoursList extends Component {

    constructor(props){
        super(props);
        this.state = {
            id : '',
            sleepingHoursList: [],
            chartData :{
                labels :[],
                datasets : []
            }
        }
    }

    componentDidMount(){
        const tab = [] 
        setTimeout(()=>{
            // console.log("this.props.id: "+ this.props.id);
            axios.get('http://localhost:5000/user_route/sl/' + this.props.id)
            .then(response =>{
                this.setState({
                    sleepingHoursList : response.data,
                })
            })
            .catch((error) => {
                console.log(error);
            })
        },1000)

        setTimeout(()=>{
            this.state.sleepingHoursList.forEach(currentSleepingHour => {
                this.state.chartData.labels.push(currentSleepingHour.date.substring(0,10));
                tab.push(currentSleepingHour.hours);
            })
            this.state.chartData.labels.sort();
            this.state.chartData.datasets.push({label:'Sleeping Hours',data : tab});
        },1400)

    }

    render(){
        return(
            <div>
                <Chart chartData={this.state.chartData} type="l" title="Your sleeping hours evolution"/>
            </div>
        );
    }
}   