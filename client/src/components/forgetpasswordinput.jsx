import React, { Component } from 'react';
import '../App.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import { verfyemail } from '../services/user.services';
class ForgetpasswordInput extends Component {

    state = {
        email: '',
        errormsg: '',

    };
/**
 * @description:handleChange is used to set the value to the state    
 */
    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    /**
 * @description:This method is used to handle the enter event.. 
 */
    handleEnter=event=>{

        if(event.key === 'Enter'){
            event.preventDefault();
            this.handlesubmit(event); 
         }
    }

/**
 * @description:This method is used to handle the submit button Event.. 
 */
    handlesubmit = event => {

        var Emailverfy = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(this.state.email);

        if (this.state.email === '' || !Emailverfy) {

            this.setState({ open: true, errormsg: "Please Enter valid Email" });
        }
        else {
            var data = {
                email: this.state.email,
            }
            verfyemail(data).then((res) => {

                this.setState({ open: true, errormsg: "Please Check your  Email" });

            }).catch((err)=>{

                this.setState({ open: true, errormsg: "user not found" });
            })
        }
    }
    /**
 * @description:This method is used to handle the Close event.. 
 */
    handleClose = () => {

        this.setState({ open: false });
    };

    render() {
        return (
            <div>
                <div className="form-wrapper1">
                    <p id="fundooname">
                        <b> <span id="f">F</span>
                            <span id="u">u</span>
                            <span id="n">n</span>
                            <span id="d">d</span>
                            <span id="o">o</span>
                            <span id="o1">o</span>
                        </b>
                    </p>
                    <div id="signintext">
                        <h1 ><b>Find your email</b></h1>
                    </div>
                    <div id="emaillogin">
                        <TextField
                            id="emailtextalign1"
                            label="Email"
                            margin="dense"
                            variant="outlined"
                            onChange={this.handleChange('email')}
                            onKeyPress={this.handleEnter}
                        />
                    </div>
                    <div id="nextbutton" >
                        <Button variant="contained" color="primary" id="registerbutton" onClick={this.handlesubmit}>
                            Next
                               </Button>
                    </div>
                </div>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    open={this.state.open}
                    onClose={this.handleClose}
                    autoHideDuration={6000}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">
                        {this.state.errormsg}</span>}
                    action={[
                        <Button key="undo" color="secondary" size="small" onClick={this.handleClose}>
                            UNDO
                              </Button>,
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            //  className={classes.close}
                            onClick={this.handleClose}
                        >
                            <CloseIcon />
                        </IconButton>,
                    ]}
                />
            </div>
        )
    }
}
export default ForgetpasswordInput;