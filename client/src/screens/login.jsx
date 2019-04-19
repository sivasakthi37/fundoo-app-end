import React, { Component } from 'react';
import '../App.css';

import LoginInput from '../components/logininput'
/**
 * @description:This Component is for Login UI.. 
 */
class Login extends Component {
    render() {
        return (
            <div>
                <LoginInput props={this.props} />
            </div>

        )
    }
}

export default Login;