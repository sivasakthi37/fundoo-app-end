import React, { Component } from 'react';
import '../App.css';
import pinnote from '../assets/pinnote.svg'
import unpin from '../assets/unpinned.svg'
import Tooltip from '@material-ui/core/Tooltip';


import IconButton from '@material-ui/core/IconButton';
class Pinned extends Component {
    state = {
        isPinned: false,
    };

    // componentWillMount() {
    //     console.log("willmount in the pin component");

    //     this.setState({
    //         isPinned: this.props.initialpinstatus,
    //     })
    // }

    async handleClick() {
        console.log("this.props.initialpinstatus",this.props.initialpinstatus);
        
        await this.setState({
            isPinned: this.props.initialpinstatus,
        })
       await this.setState({ isPinned: !this.state.isPinned });
        console.log("change pinned==>", this.state.isPinned);
        console.log("id log==>", this.props.noteID);

        this.props.pinstatus(this.state.isPinned, this.props.noteID)
        // if (this.props.initialpinstatus === false) {
        //      this.state.isPinned= true;
        //    // this.setState({ isPinned: true });


        //     this.props.pinstatus(this.state.isPinned, this.props.noteID);
        // }
        // else {
        //    // this.setState({ isPinned: false });
        //      this.state.isArchived= false;

        //     this.props.pinstatus(this.state.isPinned, this.props.noteID);
        // }


        // this.setState({isPinned: !this.state.isPinned});



        // this.props.pinstatus(this.state.isPinned,this.props.noteID);
    }
    render() {
        //  console.log("initial log==>", this.props.initialpinstatus);

       // const { isPinned } = this.state;
        return (
            <span >
                {this.props.initialpinstatus ?
                    <IconButton onClick={() => this.handleClick()} >
                        <Tooltip title="un-pin">
                            <img src={unpin} alt="logo" />
                        </Tooltip>
                    </IconButton>
                    :
                    <IconButton onClick={() => this.handleClick()}>
                        <Tooltip title=" pin-note ">
                            <img src={pinnote} alt="logo" />
                        </Tooltip>
                    </IconButton>
                }
            </span>

        )
    }
}

export default Pinned;