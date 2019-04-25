import React, { Component } from 'react';
import '../App.css';
import { Button } from '@material-ui/core';

import Divider from '@material-ui/core/Divider';

import TextField from '@material-ui/core/TextField';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import reply from '../assets/reply.svg';
import like from '../assets/like.svg';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Avatar from '@material-ui/core/Avatar'
import { qandA, getqandadata } from '../services/note.services';

const theme1 = createMuiTheme({

    overrides: {

        MuiPrivateNotchedOutline:
        {
            root: {

                width: '200%',
                height: '200%',
                borderRadius: 9,
            }
        }
    }
});


class QansA extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: "",
            userID: "",
            question: "",
            qnaddata: [],
            qnaddata1: [],
            question1: "",
            reply: false,
            replayanswer:""
        }
    }
    componentWillMount() {

        var data = {
            data: this.props.noteId,
        }
        getqandadata(data)
            .then(async (result) => {
                console.log("get all q and data --->", result.data.data);
                console.log("qnaddata1--->", result.data.data.QandA);
                await this.setState({
                    qnaddata: result.data.data,
                    qnaddata1: result.data.data.QandA
                })
      for (let i = 1; i < this.state.qnaddata1.length; i++) {

        
    
         }


                console.log("qnaddata in state-->", this.state.qnaddata);
                console.log(" qnaddata1 in state-->", this.state.qnaddata1);
            })
            .catch((error) => {
                console.log(error)
            });
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
    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    replay = () => {
        this.setState({ reply:  !this.state.reply });


    }
   
    handleask = () => {
        console.log("this.props.noteid in qnd a-->", this.props.noteId);

        var data = {
            question: this.state.question,
            noteId: this.props.noteId,
        }
        qandA(data)
            .then((res) => {
                console.log("result for q and A==>", res.data.data[0]);
                this.setState({
                    qnaddata1: res.data.data
                })
            })
            .catch((err) => {

                console.log("error in q nd a promisses");

            })
    }
    render() {
        
        const userDetails = localStorage.getItem('username');
        const initial = userDetails.substring(0, 1);
        return (

            <div>

                <span id="closeqa" ><Button onClick={this.handleToggle}>Close</Button></span>
                <div id="qandatitle">
                    <p> {this.props.title}</p>
                </div>
                <div >
                    <p id="qandadescription">   {this.props.description}</p>
                </div>
                <div>
                    <Divider />
                </div>

                {this.state.qnaddata1.length > 0
                    ? <div>
                        <h3> Question Asked ? </h3>

                        <p>{this.state.qnaddata1[0]} </p>
                        <div id="replaydiv" >
                            <Avatar style={{ width: "40px", height: "40px", backgroundColor: "purple", marginTop: "-1px" }}
                            >
                                {localStorage.getItem('profilepic') !== "" ?
                                    <img style={{
                                        width: "40px", height: "40px"
                                    }} src={localStorage.getItem('profilepic')} alt="change Profile pic"></img>
                                    :
                                    <b style={{ fontSize: "16px" }}>{initial}</b>
                                }
                            </Avatar>
                            <h1 id="h1qanda">{this.state.qnaddata1[0]}</h1>
                            <IconButton onClick={() => this.replay()}>
                                <Tooltip title="Replay">
                                    <img src={reply} alt="logo" />
                                </Tooltip>
                            </IconButton>
                            <IconButton onClick={() => this.like()}>
                                <Tooltip title="Like">
                                    <img src={like} alt="logo" />
                                </Tooltip>
                            </IconButton>
                        </div>
                        <div>
                            {this.state.reply ?
                                <div>
                                    <div>
                                        <TextField
                                            id="textareaqanda1"
                                            label="replay"
                                            multiline
                                            rows="4"
                                            margin="normal"
                                            variant="outlined"
                                         onChange={this.handleChange('question')}
                                        />
                                    
                                        <Button id="replaybutton1" variant="contained" color="primary" 
                                         onClick={this.handleask} 
                                        >
                                            replay
                                       </Button>
                                    </div>
                                </div>
                                :
                               null
                            }
                             "React Component is an independent, reusable code and it contains HTML + Javascript. Components data will be stored in component's State. This state can be modified based on user action or other action. when a component state is changed React will re-render the component to the browser."
                        </div>
                    </div> :
                    <div>
                        <MuiThemeProvider theme={theme1}>
                            <div>
                                <h3>  Ask a Question ? </h3>
                            </div>
                            <div>
                                <TextField
                                    id="textareaqanda"
                                    label="ask a question"
                                    multiline
                                    rows="4"

                                    margin="normal"
                                    variant="outlined"
                                    onChange={this.handleChange('question')}
                                />
                            </div>
                            <div>
                                <Button variant="contained" color="primary" id="askbutton"
                                    onClick={this.handleask} >
                                    Ask
                                   </Button>
                            </div>
                        </MuiThemeProvider>
                    </div>
                }





            </div >
        )
    }
}

export default QansA;