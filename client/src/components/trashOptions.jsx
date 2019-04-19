import React, { Component } from 'react';
import { MenuItem, Popper, Fade, Paper, Tooltip, ClickAwayListener } from "@material-ui/core";
import moreoptions from '../assets/moreoptions.svg';
class TrashOptions extends Component {
    constructor() {
        super();
        this.state = {
            anchorEl: null,
            open: false,
            placement: null,
        }
        this.clickMoreOptions = this.clickMoreOptions.bind(this);
    }

    clickMoreOptions = (event) => {
        const { currentTarget } = event;
        this.setState(state => ({
            anchorEl: currentTarget,
            open: !state.open,

        }));
    }
    handlerestore = () => {
        this.closeLabelPopper();
        this.props.restore(this.props.noteID);
    }
    handledelete = () => {
        this.closeLabelPopper();
        this.props.deleteNote(this.props.noteID)
    }


    closeLabelPopper = () => {
        this.setState({
            open: false
        })
    }
    render() {
        const { anchorEl, open } = this.state;
        return (
            <div>
                <Tooltip title="More">
                    <img src={moreoptions}
                        onClick={this.clickMoreOptions}
                        className="moreOptionsIcon"
                        alt="more options icon" />
                </Tooltip>

                <Popper open={open} anchorEl={anchorEl} placement={'bottom-start'} transition>
                    {({ TransitionProps }) => (
                        <Fade {...TransitionProps} timeout={0}>
                            <Paper className="moreOptionsPopper">
                                <div id="selectMoreOptions">
                                    <ClickAwayListener onClickAway={() => this.closeLabelPopper()}>
                                        <MenuItem id="moreOptionsMenu" onClick={this.handlerestore}>Restore Note</MenuItem>
                                        <MenuItem id="moreOptionsMenu" onClick={this.handledelete}>Delete Forever</MenuItem>
                                    </ClickAwayListener>
                                </div>
                            </Paper>
                        </Fade>
                    )}
                </Popper>

            </div>
        )
    }
}
export default TrashOptions;