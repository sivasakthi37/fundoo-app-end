import React, { Component } from 'react';
import '../App.css';
import PropTypes from 'prop-types';

import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';

import { withStyles } from '@material-ui/core/styles';

import { MuiThemeProvider, createMuiTheme, MenuItem } from '@material-ui/core'

import bulb from '../assets/bulbicon.svg';

import pencil from '../assets/pencil.svg';

import Archive from '../assets/archive.svg';

import Delete from '../assets/delete.svg'

import bellicon from '../assets/bellicon.svg';

import  {getLabels} from '../services/note.services';

import EditLabel from './editLabel';

const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',
    },

    menuButton: {
        marginLeft: 12,
        marginRight: 20,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    menuItem: {
        borderRadius: "0 25px 25px 0",
        '&:focus': {
            backgroundColor: "#fff9c4",
            borderRadius: "0 25px 25px 0",

        },
    },
    primary: {},
    icon: {},
});
const theme1 = createMuiTheme({
    overrides: {
        MuiDrawer:
        {
            paper: {
                top: 65,
                width: 275,
                borderColor: 'white',
            },
            paperAnchorDockedLeft: {
                borderRight: 'white',
            }
        }

    }
})
/**
 * @description:This component is used to drawer ui ....
 */
class Drawercomponent extends Component {

    constructor() {
        super();
        this.state = {
            open: false,
            navigateReminder: false,
            navigateArchived: false,
            navigateTrashed: false,
            label: [],
            notesnavigater:false,

        }
    }
    handleEditLabel=()=> {
        this.setState({ open: !this.state.open })
    }
    componentDidMount() {
        getLabels()
            .then((result) => {
                this.setState({
                    label: result
                })
            })
            .catch((error) => {
                console.log(error)
            });
    }
    displaySearchLabels=(value)=> {
        this.props.searchLabels(value)
    }
    showLabels=(value)=> {
        // let labelArr=this.state.label;
        // if(value!==undefined){
        //     labelArr.push(value);
        //     this.setState({label:labelArr});
        // }
        console.log("show methjod in drower",value);
     
      
        this.setState({
            label: [...this.state.label, value]
        })
        console.log("all label in drawer ",this.state.label);
    }

    newLabels=(value)=> {
        this.setState({ label: value })
    }
    async handleNotes() {
        await this.setState({
            navigateReminder: false,
            navigateArchived: false,
            navigateTrashed: false,
            notesnavigater:true,

        })
        if(this.props.qanda===false){
            this.props.makeLabelFalse();
            }
        this.props.handleNavigation(this.state.navigateReminder, this.state.navigateArchived, this.state.navigateTrashed,this.state.notesnavigater,false);
    }
    async handleArchived() {
        await this.setState({
            navigateReminder: false,
            navigateArchived: true,
            navigateTrashed: false,
            notesnavigater:false,
        })
        if(this.props.qanda===false){
            this.props.makeLabelFalse();
            }
        this.props.handleNavigation(this.state.navigateReminder, this.state.navigateArchived, this.state.navigateTrashed,this.state.notesnavigater,false);
    }
    async handleTrashed() {
        console.log("ashdbhasbdbasdbasdasd");

        await this.setState({
            navigateReminder: false,
            navigateArchived: false,
            navigateTrashed: true,
            notesnavigater:false,
        })
        if(this.props.qanda===false){
            this.props.makeLabelFalse();
            }
        this.props.handleNavigation(this.state.navigateReminder, this.state.navigateArchived, this.state.navigateTrashed,this.state.notesnavigater,false);
    }
    async handlerReminder() {

        await this.setState({
            navigateReminder: true,
            navigateArchived: false,
            navigateTrashed: false,
            notesnavigater:false,

        })
        if(this.props.qanda===false){
        this.props.makeLabelFalse();
        }
        this.props.handleNavigation(this.state.navigateReminder, this.state.navigateArchived, this.state.navigateTrashed,this.state.notesnavigater,false);
    }
    render() {
        const { classes } = this.props;
        let displayLabels = this.state.label;
        if (this.state.label !== "") {
            displayLabels = this.state.label.map((key) =>
                <MenuItem className={classes.menuItem} style={{ display: "flex", flexDirection: "row", color: "#202124", fontFamily: "Google Sans, Roboto, Arial, sans-serif", fontSize: ".875rem" }} onClick={() => this.displaySearchLabels(key.label)} key={key.label}>

                    <img src={pencil} alt="label icon" style={{ marginRight: "50px" }} />

                    <div style={{ marginRight: "50px", marginBottom: "10px", marginTop: "10px", fontWeight: "550" }}>
                        {key.label}
                    </div>
                </MenuItem>
            )
        }
        return (
            <div  >
                <MuiThemeProvider theme={theme1}  >

                    <Drawer
                        id="drawer"
                        variant="persistent"
                        anchor="left"
                        open={this.props.menustatus}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                    >
                        <MenuItem className={classes.menuItem} onClick={() => this.handleNotes()}>
                            <img src={bulb} alt="logo" style={{ marginRight: "31px" }} />
                            Notes
                         </MenuItem>

                        <MenuItem className={classes.menuItem} onClick={() => this.handlerReminder()}     >
                            <img src={bellicon} alt="logo" style={{ marginRight: "31px" }} />
                            Reminders
                         </MenuItem>
                        <Divider />
                        <div style={{ borderBottom: "1px solid lightgrey", borderTop: "1px solid lightgrey" }}>
                            <div style={{ marginRight: "218px", fontSize: "13px", marginBottom: "10px", marginTop: "10px", fontFamily: "arial" }}>
                                LABELS
                         </div>
                            <div>
                                <div>
                                    {displayLabels}
                                </div>
                                <MenuItem className={classes.menuItem} id="labelMenu" onClick={this.handleEditLabel}>

                                    <img src={pencil} alt="edit icon"
                                        style={{ marginRight: "50px" }} />
                                    Edit Labels
                            </MenuItem>
                            </div>

                        </div>

                        {/* <p id="lable" >LABLES</p>
                        
                        <MenuItem className={classes.menuItem}>
                            <img src={pencil} alt="logo" style={{ marginRight: "31px" }} />
                            Edit labels
                         </MenuItem> */}

                        <Divider />
                        <MenuItem className={classes.menuItem} onClick={() => this.handleArchived()}>
                            <img src={Archive} alt="logo" style={{ marginRight: "31px" }} />
                            Archive
                         </MenuItem>

                        <MenuItem className={classes.menuItem} onClick={() => this.handleTrashed()}      >
                            <img src={Delete} alt="logo" style={{ marginRight: "31px" }} />
                            Trash
                         </MenuItem>
                    </Drawer>
                    <Divider />
                    <EditLabel
                    newLabels={this.newLabels}
                    label={this.state.label}
                    showLabels={this.showLabels}
                    drawerPropstoEditLabels={this.state.open}
                    labelToggle={this.handleEditLabel} />
                </MuiThemeProvider>
            </div>
        )
    }
}

Drawercomponent.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Drawercomponent);