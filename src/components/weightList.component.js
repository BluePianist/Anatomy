import React, {Component} from 'react';
import axios from 'axios';
import Chart from "./Chart";

export default class weightList extends Component {

    constructor(props){
        super(props);
        this.state = {
            id : '',
            weightList: [],
            chartData :{
                labels :[],
                datasets : []
            }
        }
    }

    componentDidMount(){
        const tab = []

        setTimeout(()=>{
            axios.get('http://localhost:5000/user_route/we/'+this.props.id)
            .then(response =>{
                this.setState({
                    weightList : response.data,
                })
                // console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
                console.log("erreur ici");
            })
        },1000)

        setTimeout(()=>{
            this.state.weightList.forEach(currentweight => {
                this.state.chartData.labels.push(currentweight.date.substring(0,10));
                tab.push(currentweight.weight);
            })
            this.state.chartData.labels.sort();
            this.state.chartData.datasets.push({label:'Weight',data : tab});

        },1400)

    }

    render(){
        return(
            <div>
                <Chart chartData={this.state.chartData} type="l" title="Your weight evolution"/>
            </div>
        );
    }
}   