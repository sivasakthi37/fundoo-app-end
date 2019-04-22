import React, { Component } from 'react';
import '../App.css';
import { Button } from '@material-ui/core';
class QansA extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: "",
        }
    }


    handleToggle = () => {
        this.props.questionstatus();
    }

    qadetails1(title, description) {
        this.setState({
            title: title,
            description: description,

        })

    }


    render() {
        return (
            <div>
                <span id="closeqa" ><Button onClick={this.handleToggle}>Close</Button></span>
                <div>
                   <b> {this.props.title}</b>
                </div>
                <div>
                <b>   {this.props.description}</b>
                </div>

                <h1> hai hellow question and answer </h1>
            </div>

        )
    }
}

export default QansA;