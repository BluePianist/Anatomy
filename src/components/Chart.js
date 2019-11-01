import React, {Component} from 'react';
import { Bar, Line, Pie} from 'react-chartjs-2';
// import {render} from 'react-dom';
import './Chart.css'

/* <Chart /> */

export default class Chart extends Component {
    constructor(props){
        super(props);
        this.state = {
            chartData : this.props.chartData,
            type: this.props.type
        }
    }

    type = () => {
        if (this.state.type === 'l'){
            return(
                <Line
                data={this.state.chartData}
                options={{
                    maintainAspectRatio: false,
                    responsive: true,
                    title:{
                        display : true , 
                        text : this.props.title,
                        fontSize : 25
                    }
                }}
                />
            );
        }else if (this.state.type === 'b'){
            return(
                <Bar
                    data={this.state.chartData}
                    options={{
                        maintainAspectRatio: false,
                        responsive: true,
                        title:{
                            display : true , 
                            text : this.props.title,
                            fontSize : 25
                        }
                    }}
                />
            );
        }else if(this.state.type === 'p'){
            return(
                <Pie
                    data={this.state.chartData}
                    options={{
                        maintainAspectRatio: false,
                        responsive: true,
                        title:{
                            display : true , 
                            text : this.props.title,
                            fontSize : 25
                        }
                    }}
                />
            );
        }
    }

    componentDidMount(){
        setTimeout(()=>{
            this.setState({
                chartData : this.props.chartData
            })
        },1001)    
    }

    render(){
        return(
            <div className ="chart">
                {this.type()}
            </div>
        );
    }
}
