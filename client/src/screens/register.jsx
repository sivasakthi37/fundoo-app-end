import React, { Component } from 'react';
import RegisterInput from '../components/registerinput'
import '../App.css'
/**
 * @description:This register Component is used to Register ui component  
 */
class Register extends Component {
    render() {
        return (

            <div>
                <RegisterInput props={this.props} />
            </div>

        )

    }

}

export default Register;