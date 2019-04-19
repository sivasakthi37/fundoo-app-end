import React, { Component } from 'react';
import { Card } from '@material-ui/core';
import Tools from './Tools';
import Chip from '@material-ui/core/Chip';
import Pinned from './Pinned';
import DialogBox from './Dialog';

class ReminderNavigater extends Component {

    constructor() {
        super();
        this.state = {
            // open: false,
            open1: false,
        }
        this.cardsToDialogBox = React.createRef();
    }
    async handleClick1(note) {
        await this.setState({ open1: true })
        console.log("dilog note in notedisplay==>", note);

        this.cardsToDialogBox.current.getData(note);
    }

    closeEditBox = () => {
        this.setState({ open1: false })
    }

    render() {
        let cardsView = this.props.noteProps ? "cards" : "CreateNote2";
        return (
            <div>
                {(this.props.remiderArray).length === 0 ?
                    <h1 style={{ fontFamily: "georgia", color: "grey" }}>Notes with upcoming reminders appear here</h1>
                    :
                    <label style={{ fontFamily: "georgia", fontSize: "15px", color: "grey", marginRight: "760px" }}>REMINDER</label>
                }
                <div className="CardsView">
                    {this.props.remiderArray.map((key) => {
                        return (
                            <Card key={key._id}  id={cardsView} style={{ backgroundColor: key.color }} >
                                <div id="displaycontentdiv1" >
                                    <div id="pindiv">
                                        <b onClick={() => this.handleClick1(key)}> {key.title}</b>
                                        < Pinned
                                            initialpinstatus={key.pinned}
                                            pinstatus={this.props.ispinned}
                                            noteID={key._id}
                                        />
                                    </div>
                                    <div>
                                        {key.description}
                                    </div>

                                    <Chip id="chipcss"
                                        label={key.reminder}
                                        onDelete={() => this.props.reminderNote('', key._id)}
                                    />
                                    <div id="displaycontentdiv">
                                        <Tools
                                            note={key}
                                            createNotePropsToTools={this.props.getColor}
                                            noteID={key._id}
                                            archiveStatus={key.archive}
                                            archiveNote={this.props.archiveNote}
                                            reminder={this.props.reminderNote}
                                            trashNote={this.props.trashNote}
                                        />
                                    </div>
                                </div >
                            </Card>
                        )
                    })
                    }
                </div>
                <DialogBox
                    reminder={this.reminderNote}
                    ref={this.cardsToDialogBox}
                    //    archiveStatus={pin[key].archive}
                    parentProps={this.state.open1}
                    closeEditBox={this.closeEditBox}
                    archiveNote={this.archiveNote}
                    editTitle={this.editTitle}
                    editDescription={this.editDescription}
                    createNotePropsToTools={this.props.getColor}
                    trashNote={this.trashNote}
                    ispinned={this.ispinned}
                />
            </div>
        )
    }
}
export default ReminderNavigater;