import React, { Component } from 'react';
import { Card } from '@material-ui/core';
import Tools from './Tools';
import Chip from '@material-ui/core/Chip';
import Pinned from './Pinned';


class SearchedNotes extends Component {
    render() {
        let cardsView = this.props.noteProps ? "cards" : "CreateNote2";
        return (
            <div>

                {/* {(this.props.archiveArray).length === 0 ?
                    <h1  style={{ fontFamily: "georgia", color: "grey" }}>Your archived notes appear here</h1>

                    :
                    <label style={{ fontFamily: "georgia", fontSize: "15px", color: "grey", marginRight: "760px" }}>ARCHIVED</label>
                } */}
                <div className="CardsView">
                    {this.props.searchNote.map((key) => {
                        return (
                            <Card id={cardsView} style={{ backgroundColor: key.color }} >
                                <div id="displaycontentdiv1" >
                                    <div id="pindiv">
                                        <b  > {key.title}</b>
                                        < Pinned
                                            initialpinstatus={key.pinned}
                                            pinstatus={this.props.ispinned}
                                            noteID={key._id}
                                        />
                                    </div>
                                    <div>
                                        {key.description}
                                    </div>
                                    {key.reminder ?
                                        <Chip id="chipcss"
                                            label={key.reminder}
                                            onDelete={() => this.props.reminderNote('', key._id)}
                                        />
                                        :
                                        null}
                                    <span>
                                        {key.label.length > 0 ?
                                            key.label.map((key1) =>

                                                <Chip id="chipcss"
                                                    label={key1}
                                                    onDelete={() => this.props.deleteLabelFromNote(key1, key._id)}
                                                />

                                            )
                                            :
                                            null}
                                    </span>



                                    <div id="displaycontentdiv">
                                        <Tools
                                            note={key}
                                            createNotePropsToTools={this.props.getColor}
                                            reminder={this.props.reminder}
                                            noteID={key._id}
                                            archiveStatus={key.archive}
                                            archiveNote={this.props.archiveNote}
                                            trashNote={this.props.trashNote}
                                        />
                                    </div>
                                </div >
                            </Card>
                        )
                    })
                    }
                </div>

            </div>
        )
    }
}
export default SearchedNotes;