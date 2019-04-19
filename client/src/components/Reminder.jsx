import React, { Component } from 'react';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import { MenuItem, Paper, Tooltip, ListItem, ClickAwayListener, Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { askForPermissioToReceiveNotifications } from '../push-notification';
import { Snackbar, IconButton } from '@material-ui/core';
import closeIcon from '../assets/closeIcon.svg';
class Reminder extends Component {
    state = {
        anchorEl: null,
        open: false,
        placement: null,
        date: "",
        snak2open: false,
        title: "",
        description: ""
    };

    handleClick = placement => event => {
        const { currentTarget } = event;

        this.setState(state => ({
            anchorEl: currentTarget,
            open: state.placement !== placement || !state.open,
            placement,
        }));
    };
    handleClose = () => {
        this.setState(state => ({ open: !state.open }))
    }
    setTodayReminder = () => {
        this.handleClose();
        //     let ampm = parseInt(new Date().getHours()) >= 8 ? "PM" : "AM";
        //    // var date = new Date().toDateString();
        //     var date = new Date()
        //     var timestamp = date.getTime();
        //     console.log("time stamep ==>",timestamp);
        // var reminder1 = date + ", 8 " + ampm;
        // console.log(note.reminder);
        //  this.props.reminder(reminder1, this.props.noteID)

    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
        //console.log("datedatedatedate", this.state.date);
    };
    setTomorrowReminder = () => {
        this.handleClose();
        let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Mon"]

        var date = new Date().toDateString();
        date = date.replace(new Date().getDate().toString(), new Date().getDate() + 1);
        date = date.replace(days[new Date().getDay() - 1], days[new Date().getDay()]);
        var reminder1 = date + ", 8 AM";
        console.log("notereminder-->", reminder1);
        this.props.reminder(reminder1, this.props.noteID)
    }
    setWeeklyReminder = () => {
        this.handleClose();

    }
    handlesubmit = event => {
        event.preventDefault();
        this.handleClose();
        console.log("datedatedatedate", this.state.date);
        console.log("notess in reminder==>", this.props.note);
        this.props.reminder(this.state.date, this.props.noteID);

    }
    componentDidUpdate() {
        console.log("reminder date in componentwillmount-->",this.props.date);
        
        if (this.props.date !==undefined && this.props.date!=="") {
            askForPermissioToReceiveNotifications(this.props.date, this.props.notetitle, this.props.notedescription)
                .then((diff) => {
                    console.log("difff in reminder-------", diff);
                    setTimeout(() => {
                        this.setState({ snak2open: true });
                        console.log("start----------->");
                        this.props.reminder("", this.props.noteID);
                    }, diff);
                })
                .catch((err) => {
                    console.log("error in set timeout reminder", err);
                })
        } 
    }
    handleClose1 = () => {

        this.setState({ snak2open: false });
    };

    render() {
        console.log("this.props.date----->wwwwwwwwwwwwwwww", this.props.date);

        // const setAMPM = this.props.parentToolsProps;
        //  console.log("this.props.note", this.props.note);

        const { anchorEl, open, placement } = this.state;
        return (

            <div>
                <Tooltip title="Remind me">
                    <img src={require('../assets/Reminder.svg')}
                        className="reminderIcon"
                        onClick={this.handleClick('bottom-start')} alt="remider icon" />
                </Tooltip>

                <Popper open={open} anchorEl={anchorEl} placement={placement} transition style={{ zIndex: 9999 }}>
                    {({ TransitionProps }) => (
                        <Fade {...TransitionProps} timeout={350}>
                            <Paper id="reminderPopper">
                                <ClickAwayListener onClickAway={this.handleClose}>

                                    <div>

                                        <ListItem >Reminder:</ListItem>
                                        <MenuItem >
                                            <TextField
                                                id="datetime-local"
                                                //label="Next appointment"
                                                type="datetime-local"
                                                defaultValue="2019-04-05T11:28"
                                                // className={classes.textField}
                                                onChange={this.handleChange('date')}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        </MenuItem>
                                        {/* <MenuItem onClick={() => this.setTodayReminder()}>
                                            <div>Later today</div>
                                            <div>8:00 {setAMPM}</div>
                                        </MenuItem> */}

                                        <MenuItem onClick={() => this.setTomorrowReminder()}>
                                            <div>Tomorrow</div>
                                            <div>8:00 AM</div>
                                        </MenuItem>
                                        <div id="savereminder">
                                            <Button onClick={this.handlesubmit} >
                                                Save
                                            </Button>
                                        </div>
                                        {/* <MenuItem onClick={() => this.setWeeklyReminder()}>
                                            <div>Next Week</div>
                                            <div>Mon, 8:00 AM</div>
                                        </MenuItem> */}
                                    </div>
                                </ClickAwayListener>
                            </Paper>
                        </Fade>
                    )}
                </Popper>

                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.snak2open}
                    message={
                        <span>{this.props.notetitle}, {this.props.notedescription}</span>
                    }
                    action={[
                        <Button key="undo" style={{ color: "#F1C40F" }} size="small" >
                            UNDO
                        </Button>,
                        <IconButton
                            onClick={this.handleClose1}
                        >
                            <img src={closeIcon} alt="snackBar close" />
                        </IconButton>,
                    ]}
                />

            </div>
        )
    }
}
export default Reminder;
