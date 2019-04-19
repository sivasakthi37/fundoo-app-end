import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import logo from '../assets/keepIcon.svg';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Logout from '../components/Logout';
import Tooltip from '@material-ui/core/Tooltip';
import Views from '../components/views';
import Drawercomponent from '../components/Drawermenu';
import Notecreate from '../components/noteCreate';
//const drawerWidth = 10;
//

import Cards from '../components/notedisplay';

const styles = theme => ({
    root: {
        display: 'flex',

        // borderBottom: '1px solid',
        // borderBottomColor: '#d0cece'

    },

    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: 0,

    },
    contentShift: {
        flexwrap: 'wrap',
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),

        marginLeft: '10%',
    },

});
const theme1 = createMuiTheme({
    typography: {
        useNextVariants: true,

    },
});
/**
 * @description:This Compoenent  is main dashboard page ui....
 */
class Dashboardinput extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: true,
            search: "",
            reminder: false,
            archive: false,
            trash: false,
            note: [],
            cardStyles: false,
        };

        this.noteToCards = React.createRef();
    }
    /**
 * @description:This method is used to handle the Toggele event.. 
 */
    handleToggle = () => {
        try {
            this.setState(state => ({ open: !state.open }))
        } catch (err) {
            console.log(" handelToggle error in  dashboard");
        }
    }
    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    currentnote = (newCard) => {
        //  console.log("hai new card", newCard);
        // this.setState({ note: newCard })
        this.noteToCards.current.displayNewCard(newCard);
    }
    handleCardStyle = () => {
        this.setState({ cardStyles: !this.state.cardStyles });
        //   console.log("dfgbhnjmkedrtghjk");

    }
    handleNavigation = (reminder, archive, trash) => {
        console.log("handleNAvigation", reminder, archive, trash);

        if (reminder === true || archive === true || trash === true) {

            this.setState({
                reminder: reminder,
                archive: archive,
                trash: trash
            })
        } else {
            this.setState({
                reminder: false,
                archive: false,
                trash: false
            })
        }
    }
    searchLabels = (value) => {
        this.setState({ label: value });
        console.log("search labels", value);
        this.noteToCards.current.displayLabelledCards();
    }
    makeLabelFalse=()=> {
        this.noteToCards.current.makeLabelFalse();
    }
    render() {
        const { classes } = this.props;
        const { open } = this.state;
        //  console.log("new note data=>", this.state.note);


        return (
            <MuiThemeProvider theme={theme1}>
                <div className={classes.root} >
                    <CssBaseline />
                    <AppBar id="appbarroot"
                        position="fixed"
                        color="inherit"
                    >
                        <Toolbar >
                            <IconButton
                                color="inherit"
                                aria-label="Open drawer"
                                onClick={this.handleToggle}
                            >
                                <Tooltip title="Main menu">

                                    <MenuIcon />
                                </Tooltip>
                            </IconButton>
                            <span>
                                <img src={logo} alt="logo" />
                            </span>
                            <Typography id="fundoodash" variant="h6" color="inherit" >
                                Fundoo
            </Typography>
                            <div id="search">
                                <div id="searchIcon">
                                    <IconButton>
                                        <Tooltip title="Search">
                                            <SearchIcon />
                                        </Tooltip>
                                    </IconButton>

                                </div>
                                <div id="searchField">
                                    <InputBase
                                        id="searchFields"
                                        placeholder="Search"
                                        className="inputRoot"
                                        onChange={this.handleChange('search')}
                                    />
                                </div>
                            </div>
                            <div id="views">
                                <Views
                                    notePropsToApp={this.handleCardStyle}
                                />
                            </div>
                            <div id="logout">
                                <Logout props={this.props} />
                            </div>
                        </Toolbar>
                    </AppBar>
                    <div >
                        <Drawercomponent
                            makeLabelFalse={this.makeLabelFalse}
                            handleNavigation={this.handleNavigation}
                            menustatus={this.state.open}
                            searchLabels={this.searchLabels}
                        />
                    </div>
                    <main
                        className={classNames(classes.content, {
                            [classes.contentShift]: open,
                        })}
                    >
                        <div className={classes.drawerHeader} />
                        {this.state.archive || this.state.trash || this.state.search ?
                            <Cards
                                searchNote={this.state.search}
                                noteProps={this.state.cardStyles}
                                navigaterTrash={this.state.trash}
                                navigateArchived={this.state.archive}
                                ref={this.noteToCards}
                            />
                            :
                            <div>
                                <Notecreate currentnote={this.currentnote} />
                                <Cards
                                    labelValue={this.state.label}
                                    searchNote={this.state.search}
                                    navigaterReminder={this.state.reminder}
                                    noteProps={this.state.cardStyles}
                                    navigaterTrash={this.state.trash}
                                    navigateArchived={this.state.archive}
                                    ref={this.noteToCards}
                                />
                            </div>
                        }
                    </main>
                </div>
            </MuiThemeProvider>
        );
    }
}

Dashboardinput.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Dashboardinput);
