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
import { userLogin } from '../services/user.services'
import MailIcon from '@material-ui/icons/Mail';
var jwt = require('jsonwebtoken');
/**
 * @description:This Component is used to Login page ui.. 
 */
class LoginInput extends Component {
    state = {
        email: '',
        password: '',
        showPassword: false,
        open: false,
        errormsg: '',

    };
    /**
  * @description:handleChange is used to set the value to the state    
  */
    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };
    /**
         * @description:This method is used to pasword visbility and hide perpose 
         */
    handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
    };
    /**
     * @description:This method is used to handele a register button 
     */
    handleregister = event => {
        event.preventDefault();
        this.props.props.history.push("/register");

    }
    /**
     * @description:This method is used to handele a forgetPassword button 
     */

    handleforgetpasssword = event => {
        event.preventDefault();

        this.props.props.history.push("/forgetpassword");

    }
    /**
 * @description:This method is used to handle the enter event.. 
 */
    handleEnter = event => {

        if (event.key === 'Enter') {
            event.preventDefault();
            this.handlelogin(event);

        }
    }
    /**
 * @description:This method is used to handele a Login button 
 */
    handlelogin = event => {
        event.preventDefault();
        var Emailverfy = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(this.state.email);
        if (this.state.email === '' || !Emailverfy) {

            this.setState({ open: true, errormsg: "Please Enter valid Email" });
        }
        else if (this.state.password === '' || this.state.password.length < 6) {
            this.setState({ open: true, errormsg: "Please Enter valid Password" });
        }
        else {
            var data = {
                email: this.state.email,
                password: this.state.password,
                userId: localStorage.getItem("userId"),
                tokenpassword: localStorage.getItem("password"),
            }
            //  console.log("data in login page==>", data);
            userLogin(data)
                .then((res) => {
                    console.log(this.state.email);
                    console.log("responce from backend", res.data);
                    jwt.verify(res.data, 'secretkey-Authentication', (err, decoded) => {
                        if (err) {
                            console.log("token invalid--->");

                        } else {
                            console.log("decoded data==>", decoded.payload);
                            localStorage.setItem('username', decoded.payload.username);
                            localStorage.setItem('email', decoded.payload.email);
                            localStorage.setItem('userId', decoded.payload.user_id);
                            localStorage.setItem('token', res.data);
                            localStorage.setItem('profilepic', decoded.payload.profilepic);
                            localStorage.setItem('password', decoded.payload.password);
                            this.setState({ open: true, errormsg: "Login sucessfull!!!!" });
                            
                            this.props.props.history.push("/dashBoard")

                        }

                    })


                }).catch((err) => {
                    console.log("err", err);
                    this.setState({ open: true, errormsg: "Login Unsucessfull" });
                })
        }
    }
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
                        <h1 ><b>Sign in</b></h1>
                        <p> with your Fundoo Account</p>
                    </div>
                    <div id="emaillogin">
                        <TextField
                            className="emailtextalign"
                            id="Email"
                            label="Email"
                            margin="dense"
                            variant="outlined"
                            onChange={this.handleChange('email')}
                            onKeyPress={this.handleEnter}
                            InputProps={{
                                endAdornment: (
                                    <IconButton color="inherit">
                                        <MailIcon />
                                    </IconButton>
                                ),
                            }}
                        />
                    </div>

                    <div id="password-div1">
                        <TextField
                            className="password"
                            id="password"
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
                    <div>
                        <Button id="forgotpassword" onClick={this.handleforgetpasssword}  >
                            <b>Forgotpassword?</b>
                        </Button>
                    </div>
                    <div id="login-div">
                        <Button id="signinbutton1" onClick={this.handleregister}  >
                            <b>Create account</b>
                        </Button>
                        <span id="login-div1" >
                            <Button variant="contained" color="primary" id="registerbutton"
                                onClick={this.handlelogin} >
                                Signin
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
export default LoginInput;