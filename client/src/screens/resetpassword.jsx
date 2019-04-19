import React, { Component } from 'react';
import ResetpasswordInput from '../components/resetpasswordinput'
import '../App.css'
class Resetpassword extends Component {
    render() {
        return (

            <div>
                <ResetpasswordInput props={this.props} />
            </div>

        )

    }

}

export default Resetpassword;