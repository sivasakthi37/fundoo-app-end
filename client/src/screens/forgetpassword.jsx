import React, { Component } from 'react';
import '../App.css'
import ForgetpasswordInput from '../components/forgetpasswordinput';
class ForgetPassword extends Component {

    render() {
        return (
            <div>
                <ForgetpasswordInput props={this.props}/>
            </div>

        )

    }
}

export default ForgetPassword;