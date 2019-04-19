import React, { Component } from 'react';
import { Dialog, Input, Button, MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import Tools from './Tools';
import Pinned from './Pinned';
import Chip from '@material-ui/core/Chip';
const theme = createMuiTheme({
    overrides: {
        MuiBackdrop:
        {
            root: {
                backgroundColor: "rgba(11, 11, 11, 0.18)"
            }
        },
        MuiDialog: {
            paper: {
                // padding: "11px",
                border: "1px solid #dadce0",
                borderRadius: "10px",
                boxShadow: "0 3px 5px rgba(0, 0, 0, 0.20)",
                overflowY: "inherit",

            }
        }
    }
})
class DialogBox extends Component {

    constructor(props) {
        super(props);

        this.state = {
            note: "",
            title: "",
            description: "",
            color: "",
            _id: "",
            reminder: "",
            archive: false
        }
        this.handleTitleClick = this.handleTitleClick.bind(this);
        this.handleDescClick = this.handleDescClick.bind(this);
        this.getData = this.getData.bind(this);


    }
    async handleTitleClick(evt) {
        await this.setState({ title: evt.target.value })
    }

    async handleDescClick(evt) {
        await this.setState({ description: evt.target.value })
    }

    async handleToggle(e) {
        console.log("this.state.title==>", this.state.title);
        console.log("this.state.description==>", this.state.description);
        await this.props.editTitle(this.state.title, this.state._id)
        await this.props.editDescription(this.state.description, this.state._id)
        this.props.closeEditBox(e);
    }
    getData(note) {
        console.log("note in dialog==>", note.title);
        if (note.title !== undefined || note.description !== undefined) {
            this.setState({
                note: note,
                title: note.title,
                color: note.color,
                description: note.description,
                _id: note._id,
                reminder: note.reminder,
                archive: note.archive,
                pinned: note.pinned
            })
        }
    }
    closeDialogPopper = (e) => {
        this.props.closeEditBox(e);
    }
    reminder1 = () => {
        this.setState({ reminder: "" })
        this.props.reminder('', this.state._id)
    }

    createNotePropsToTools = (value, noteId) => {
        this.setState({ color: value })
        this.props.createNotePropsToTools(value, noteId)

    }
    archiveNote = (value, noteId) => {

        this.setState({ archive: value })
        this.props.archiveNote(value, noteId)
        this.props.closeEditBox();
    }
    reminder = (value, noteId) => {
        this.setState({ reminder: value })
        this.props.reminder(value, noteId);
        ;

    }
    trashNote = (noteId) => {
        this.props.trashNote(noteId);
        this.props.closeEditBox();
    }
    ispinned = (value, noteId) => {
        this.setState({ pinned: value })
        this.props.ispinned(value, noteId);
    }

    render() {

        return (
            <MuiThemeProvider theme={theme} >

                <Dialog
                    id="dailogmain"
                    aria-labelledby="responsive-dialog-title"
                    open={this.props.parentProps}
                    noteID={this.props.noteID}
                >
                    <div id="dialogbox" style={{ backgroundColor: this.state.color }} >
                        <div>
                            <Input
                                id="noteInputBase"
                                placeholder="Title"
                                value={this.state.title}
                                onChange={this.handleTitleClick}
                                multiline
                                disableUnderline={true}
                            >
                            </Input>

                            <Pinned
                                initialpinstatus={this.state.pinned}
                                noteID={this.state._id}
                                pinstatus={this.ispinned}
                            />
                        </div>
                        <div id="TakeNotealign" >
                            <Input
                                id="noteInputBase1"
                                disableUnderline={true}
                                value={this.state.description}
                                onChange={this.handleDescClick}
                                multiline
                                placeholder="Take a Note...."
                            >
                            </Input>
                        </div>
                        {this.state.reminder ?
                            <Chip id="chipcss"
                                label={this.state.reminder}
                                onDelete={() => this.reminder1()}
                            />
                            :
                            null}
                        <div className="cardToolsClose" >

                            <Tools
                                note={this.state.note}
                                archiveStatus={this.state.archive}
                                archiveNote={this.archiveNote}
                                noteID={this.state._id}
                                reminder={this.reminder}
                                createNotePropsToTools={this.createNotePropsToTools}
                                trashNote={this.trashNote}
                            />
                            <span><Button onClick={this.handleToggle.bind(this)}>Close</Button></span>

                        </div>

                    </div>


                </Dialog>

            </MuiThemeProvider >

        )
    }
}
export default DialogBox;