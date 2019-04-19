import React, { Component } from 'react';
import '../App.css';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import Snackbar from '@material-ui/core/Snackbar';
import { userRegister } from '../services/user.services';


/**
 * @description:This component is the child component of Register component this component is register ui component...
 */

class RegisterInput extends Component {
    state = {
        firstname: '',
        lastname: '',
        email: '',
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
 * @description:This method is used to handele a signin button 
 */
    handlesignin = event => {
        event.preventDefault();
        this.props.props.history.push("/login");
    }

/**
 * @description:This method is used to handle the enter event.. 
 */
    handleEnter = event => {

        if (event.key === 'Enter') {
            event.preventDefault();
            this.handleRegister(event);

        }
    }
/**
 * @description:This method is used to handle the Register button event.. 
 */

    handleRegister = event => {
        event.preventDefault();
        var Emailverfy = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(this.state.email);
        console.log(this.state.email === '')
        if (this.state.firstname === '') {
            this.setState({ open: true, errormsg: "Please Enter valid Firstname" });
        }
        else if (this.state.lastname === '') {

            this.setState({ open: true, errormsg: "Please Enter valid Lirstname" });
        }
        else if (this.state.email === '' || !Emailverfy) {
            this.setState({ open: true, errormsg: "Please Enter valid Email" });
        }
        else if (this.state.password === '' || this.state.password.length < 6 || this.state.password !== this.state.password1) {
            this.setState({ open: true, errormsg: "Please Enter valid Password" });
        }
        else {
            var data = {
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                email: this.state.email,
                password: this.state.password,

            }
            userRegister(data).then((res) => {

                this.setState({ open: true, errormsg: "Register Sucessfull!!!" });
                this.props.props.history.push("/login");
            })
                .catch((err) => {
                    this.setState({ open: true, errormsg: "Register Unsucessfull!!!" });

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
                <div className="form-wrapper">
                    <p id="fundooname">
                        <b>
                            <span id="f"> F</span>
                            <span id="u">u</span>
                            <span id="n">n</span>
                            <span id="d">d</span>
                            <span id="o">o</span>
                            <span id="o1">o</span>
                        </b>
                    </p>
                    <div>
                        <h1 id="h1" > Create your Fundoo Account   </h1>
                    </div>
                    <div>
                        <span id="firstnametext">
                            <TextField
                                id="outlined-dense"
                                label="First name"
                                margin="dense"
                               variant="outlined"
                                onChange={this.handleChange('firstname')}
                                onKeyPress={this.handleEnter}
                            />

                            <TextField
                                id="outlined-dense1"
                                label="Last name"
                                margin="dense"
                                variant="outlined"
                                onChange={this.handleChange('lastname')}
                                onKeyPress={this.handleEnter}
                            />
                        </span>
                    </div>
                    <div >
                        <TextField
                            type="email"
                            id="outlined-dense2"
                            label="Your email address"
                            margin="dense"
                            variant="outlined"
                            onChange={this.handleChange('email')}
                            onKeyPress={this.handleEnter}
                        />
                    </div>
                    <div id="password-div">
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
                    <div id="alert">
                        your password must be 8 characters.
                   </div>
                    <div id="reg-div">
                        <Button id="signinbutton" onClick={this.handlesignin}  >
                            Sign in instead
                            </Button>
                        <span id="reg-div1" >
                            <Button variant="contained" color="primary" id="registerbutton" onClick={this.handleRegister}>
                                Register
                               </Button>
                        </span>
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
export default RegisterInput;