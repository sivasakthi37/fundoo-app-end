import React, { Component } from 'react';
import '../App.css';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import { resetpassword } from '../services/user.services';
class ResetpasswordInput extends Component {
    state = {
        password: '',
        password1: '',
        showPassword: false,
        showPassword1: false,
        errormsg: '',


    };
    /**
    * @description:This method is used to pasword visbility and hide perpose 
    */
    handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
    };
    /**
    * @description:This method is used to pasword visbility and hide perpose 
    */
    handleClickShowPassword1 = () => {
        this.setState(state => ({ showPassword1: !state.showPassword1 }));
    };
    /**
 * @description:handleChange is used to set the value to the state    
 */
    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    /**
     * @description:This method is used to handle the enter event. 
     */
    handleEnter = event => {

        if (event.key === 'Enter') {
            event.preventDefault();
            this.handlesubmit(event);
        }
    }

    /**
     * @description:This method is used to handle the submit event.. 
     */
    handlesubmit = event => {
        if (this.state.password === '' || this.state.password.length < 6 || this.state.password !== this.state.password1) {
            this.setState({ open: true, errormsg: "Please Enter valid Password" });
        }
        else {
            var data = {
                password: this.state.password,
            }
            let currenturl = window.location.pathname;
            let token = currenturl.substring(15);
            console.log("token =>0", token);
            resetpassword(data, token)
                .then((res) => {
                    this.setState({ open: true, errormsg: "password updated" });
                    this.props.props.history.push("/login")
                }).catch((err) => {

                    this.setState({ open: true, errormsg: "password not updated" })
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
                        <h1><b>Reset your password</b></h1>
                    </div>
                    <div id="password-div1">
                        <TextField
                            id="outlined-dense3"
                            // className={classNames(classes.margin, classes.textField)}
                            variant="outlined"
                            type={this.state.showPassword ? 'text' : 'password'}
                            label="Password"
                            value={this.state.password}
                            onChange={this.handleChange('password')}
                            onKeyPress={this.handleEnter}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="Toggle password visibility"
                                            onClick={this.handleClickShowPassword}
                                        >
                                            {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>
                    <div id="conformpassword-div">
                        <TextField
                            id="outlined-dense4"
                            // className={classNames(classes.margin, classes.textField)}
                            variant="outlined"
                            type={this.state.showPassword1 ? 'text' : 'password'}
                            label="Confirm Password"
                            value={this.state.password1}
                            onChange={this.handleChange('password1')}
                            onKeyPress={this.handleEnter}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="Toggle password visibility"
                                            onClick={this.handleClickShowPassword1}
                                        >
                                            {this.state.showPassword1 ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>
                    <div id="submitpassword" >
                        <Button variant="contained" color="primary" id="registerbutton" onClick={this.handlesubmit}>
                            submit
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
export default ResetpasswordInput;