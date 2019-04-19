import React, { Component } from 'react';
import { Card } from '@material-ui/core';
import TrashOptions from './trashOptions';


class TrashNavigator extends Component {
    render() {
        let cardsView = this.props.noteProps ? "cards" : "CreateNote2";
        return (
            <div>
                {(this.props.trashArray).length === 0 ?
                    <h1 style={{ fontFamily: "georgia", color: "grey" }}>No notes in Trash
                    </h1>
                    :
                    <label style={{ fontFamily: "georgia", fontSize: "15px", color: "grey", marginRight: "760px" }}>TRASHED</label>
                }
                <div className="CardsView" >
                    {this.props.trashArray.map((key) => {
                        return (
                            <Card key={key._id} id={cardsView} style={{ backgroundColor: key.color, borderRadius: "10px", border: "1px solid #dadce0" }} >
                                <div id="displaycontentdiv1" >
                                    <div>
                                        <b> {key.title}</b>
                                    </div>
                                    <div>
                                        {key.description}
                                    </div>
                                    <div id="displaycontentdiv">
                                        <TrashOptions
                                            note={key}
                                            restore={this.props.trashNote}
                                            noteID={key._id}
                                            deleteNote={this.props.deleteNote}
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
export default TrashNavigator;