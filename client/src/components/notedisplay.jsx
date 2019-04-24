
import React, { Component } from 'react';
import { Card } from '@material-ui/core';
import Tools from './Tools';
import { getNotes } from '../services/note.services';
import ArchivedNavigator from './ArchivedNavigator';
import SearchedNotes from './SearchedNotes';
import Chip from '@material-ui/core/Chip';
import DialogBox from './Dialog';
import '../App.css';
import Pinned from './Pinned';
import TrashNavigator from './TrashNavigator';
import ReminderNavigater from './reminderNavigater';
import Draggable from 'react-draggable';
import { updateColor, updateArchiveStatus, otherArray, archiveArray, setReminder, isTrashed, trashArray, deleteNote, remiderArray, updateTitle, updateDescription, updatePin, pinArray, imageupdate, saveLabel } from '../services/note.services';
 


class Cards extends Component {
    constructor() {
        super();
        this.state = {
            open: false,
            open1: false,
            notes: [],
            label: false,
        }
        this.cardsToDialogBox = React.createRef();
    }
    makeLabelFalse = () => {
        this.setState({ label: false })
    }


    displayLabelledCards = () => {
        this.setState({ label: true })
    }
    async handleClick1(note) {
        await this.setState({ open1: true })
        console.log("dilog note in notedisplay==>", note);

        this.cardsToDialogBox.current.getData(note);
    }

    closeEditBox = () => {
        this.setState({ open1: false })
    }
    componentDidMount() {
        getNotes()
            .then((result) => {
                this.setState({
                    notes: result.data.result
                })
                // console.log("get notes", result.data.result[0].title);
                // console.log("this.state .notes", this.state.notes[0].title);

            })
            .catch((error) => {
                console.log(error);
            });
    }

    displayNewCard(newCard) {
        // console.log("new Card==>", newCard);

        this.setState({
            notes: [...this.state.notes, newCard]
        })

    }
    getColor = (value, noteId) => {
        const color = {
            noteID: noteId,
            color: value
        }
        //   console.log("color data==>",color);

        updateColor(color)
            .then((result) => {
                // console.log("data result in update",result);
                //  console.log("this.state.notes",this.state.notes);
                let newArray = this.state.notes;

                for (let i = 0; i < newArray.length; i++) {
                    if (newArray[i]._id === noteId) {
                        newArray[i].color = result.data.result;
                        this.setState({
                            notes: newArray
                        })
                    }
                }
            })
            .catch((error) => {
                console.log("error===>", error);
            });
    }
    archiveNote = (value, noteId) => {
        const isArchived = {
            noteID: noteId,
            archive: value
        }
        //  console.log("value in archive==>",isArchived);
        updateArchiveStatus(isArchived)
            .then((result) => {
                //   console.log("result in archive==>", result);
                let newArray = this.state.notes
                for (let i = 0; i < newArray.length; i++) {
                    if (newArray[i]._id === noteId) {
                        newArray[i].archive = result.data.result;
                        newArray[i].pinned = false;
                        newArray[i].trash = false;
                        this.setState({
                            notes: newArray
                        })
                    }
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
    uploadImage = (value, noteId) => {
        const imagedata = {
            noteID: noteId,
            image: value
        }
        imageupdate(imagedata)
            .then((result) => {
                let newArray = this.state.notes
                console.log("result in the image===>", result);
                for (let i = 0; i < newArray.length; i++) {
                    if (newArray[i]._id === noteId) {
                        newArray[i].image = result.data.result;
                        this.setState({
                            notes: newArray
                        })
                    }
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    reminderNote = (value, noteId) => {
        const remindMe = {
            noteID: noteId,
            reminder: value
        }
        //   console.log("reminder-->value", remindMe);

        setReminder(remindMe)
            .then((result) => {
                let newArray = this.state.notes
                //   console.log("result in the reminder===>", result);
                for (let i = 0; i < newArray.length; i++) {
                    if (newArray[i]._id === noteId) {
                        newArray[i].reminder = result.data.result;
                        this.setState({
                            notes: newArray
                        })
                    }
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
    trashNote = (noteId) => {
        const trash = {
            noteID: noteId
        }
        isTrashed(trash)
            .then((result) => {
                let newArray = this.state.notes
                //  console.log("hai hellow how are u==>", result);

                for (let i = 0; i < newArray.length; i++) {
                    if (newArray[i]._id === noteId) {
                        newArray[i].trash = result.data.result;
                        newArray[i].pinned = false;
                        newArray[i].archive = false
                        this.setState({
                            notes: newArray,

                        })
                    }

                }

            })
            .catch((error) => {
                console.log(error);

            });
    }
    deleteNote1 = (noteId) => {
        const deletedata = {
            noteID: noteId
        }
        deleteNote(deletedata)
            .then((result) => {
                //  console.log("delete note result==>", result);
                let newArray = this.state.notes
                for (let i = 0; i < newArray.length; i++) {
                    if (newArray[i]._id === noteId) {
                        newArray.splice(i, 1);
                        this.setState({
                            notes: newArray
                        })
                    }
                }
            })
            .catch((err) => {
                console.log("delete from the backend=> error");
            })
    }
    editTitle = (value, noteId) => {
        const Title = {
            noteID: noteId,
            Title: value
        }
        // console.log("title note result==>",Title);
        updateTitle(Title)
            .then((result) => {
                //console.log("title note result==>", result.data.result);
                let newArray = this.state.notes
                for (let i = 0; i < newArray.length; i++) {
                    if (newArray[i]._id === noteId) {
                        newArray[i].title = result.data.result;
                        this.setState({
                            notes: newArray
                        })
                    }
                }
            })
    }
    editDescription = (value, noteId) => {
        const description = {
            noteID: noteId,
            Description: value
        }
        // console.log("discription note result==>",description);
        updateDescription(description)
            .then((result) => {
                //  console.log("discription note result==>", result.data.result);
                let newArray = this.state.notes
                for (let i = 0; i < newArray.length; i++) {
                    if (newArray[i]._id === noteId) {
                        newArray[i].description = result.data.result;
                        this.setState({
                            notes: newArray
                        })

                    }
                }
            })
    }
    ispinned = (value, noteId) => {
        const isPinned = {
            noteID: noteId,
            pinned: value
        }
        updatePin(isPinned)
            .then((result) => {
                console.log("discription note result==>", result);
                let newArray = this.state.notes
                for (let i = 0; i < newArray.length; i++) {
                    if (newArray[i]._id === noteId) {
                        newArray[i].archive = false;
                        newArray[i].trash = false;
                        newArray[i].pinned = result.data.result;
                        this.setState({
                            notes: newArray
                        })
                    }
                }

            })
            .catch((error) => {
                console.log(error);
            });
    }
    addLabelToNote = (noteId, value) => {
        const addLabel = {
            noteID: noteId,
            label: value
        }
        console.log("addlabel with note-->", addLabel);

        saveLabel('/saveLabelToNote', addLabel)
            .then((result) => {
                console.log("responce from backend for label-->", result);
                let newArray = this.state.notes
                for (let i = 0; i < newArray.length; i++) {
                    if (newArray[i]._id === noteId) {
                        newArray[i].label = result.data.data;
                        this.setState({
                            notes: newArray
                        })
                    }
                }
            })
            .catch((error) => {
                console.log(error)
            });
    }
    deleteLabelFromNote = (value, noteId) => {
        const deleteLabel = {
            pull: true,
            value: value,
            noteID: noteId
        }
        saveLabel('/saveLabelToNote', deleteLabel)
            .then((result) => {
                let newArray = this.state.notes
                for (let i = 0; i < newArray.length; i++) {
                    if (newArray[i]._id === noteId) {
                        newArray[i].label = result.data.data;
                        this.setState({
                            notes: newArray
                        })
                    }
                }
            })
    }








    render() {
        let cardsView = this.props.noteProps ? "cards" : "CreateNote2";

        let noteArray = otherArray(this.state.notes);
        let pin = pinArray(this.state.notes)
        console.log("noteArray==>", noteArray);

        //  console.log("noteArray==============================>", noteArray[0].label);

        // let noteArray = this.state.notes;
        if (this.props.navigateArchived) {

            return (
                <ArchivedNavigator
                    noteProps={this.props.noteProps}
                    // addLabelToNote={this.addLabelToNote}
                    archiveArray={archiveArray(this.state.notes)}
                    // othersArray={otherArray}
                    ispinned={this.ispinned}
                    getColor={this.getColor}
                    reminderNote={this.reminderNote}
                    trashNote={this.trashNote}
                    archiveNote={this.archiveNote}
                />
            )
        }
        else if ((this.props.searchNote !== "" || this.state.label) && (!this.props.navigateArchived
            && !this.props.navigateReminder && !this.props.navigateTrash)) {
            let searchNote;
            if (this.props.searchNote !== "") {
                searchNote = this.state.notes.filter(
                    obj => obj.title.includes(this.props.searchNote) ||
                        obj.description.includes(this.props.searchNote)
                )
            }
            else {
                searchNote = this.state.notes.filter(
                    obj => obj.label.length > 0 && obj.label.find((item) => item === this.props.labelValue))
            }
            return (
                <SearchedNotes
                    addLabelToNote={this.addLabelToNote}

                    deleteLabelFromNote={this.deleteLabelFromNote}
                    searchNote={searchNote}

                    getColor={this.getColor}
                    noteProps={this.props.noteProps}
                    reminder={this.reminderNote}
                    trashNote={this.trashNote}
                    archiveNote={this.archiveNote}
                // uploadImage={this.uploadImage}
                />
            )
        }

        else if (this.props.navigaterReminder) {

            return (
                <ReminderNavigater
                    ispinned={this.ispinned}
                    noteProps={this.props.noteProps}
                    remiderArray={remiderArray(this.state.notes)}
                    getColor={this.getColor}
                    trashNote={this.trashNote}
                    archiveNote={this.archiveNote}
                    reminderNote={this.reminderNote}
                />
            )
        }
        else if (this.props.navigaterTrash) {

            return (
                <TrashNavigator
                    trashArray={trashArray(this.state.notes)}
                    // pinNote={this.pinNote}
                    deleteLabelFromNote={this.deleteLabelFromNote}
                    // othersArray={otherArray(this.state.notes)}
                    noteProps={this.props.noteProps}
                    trashNote={this.trashNote}
                    deleteNote={this.deleteNote1}
                />
            )
        }
        else if (this.props.notenav) {
            return (
                <div>
                    <div>
                        {pinArray(this.state.notes).length !== 0 ?

                            <label style={{ fontFamily: "georgia", fontSize: "15px", color: "grey", marginRight: "760px" }}>PINNED</label> : null
                        }
                        <div className="CardsView">
                            {Object.keys(pin).slice(0).reverse().map((key) => {
                                return (
                                    <div key={key._id} >
                                        <Draggable>
                                            <Card key={key._id} id={cardsView} style={{ backgroundColor: pin[key].color }}>
                                                <div>
                                                    {pin[key].image !== "" ?
                                                        <img style={{
                                                            maxWidth: "100%",
                                                            height: "auto"
                                                        }} src={pin[key].image} alt="cardImage"></img>
                                                        : null}
                                                </div>
                                                <div id="displaycontentdiv1" >
                                                    <div id="pindiv" style={{ wordBreak: "break-word" }}  >
                                                        <b onClick={() => this.handleClick1(pin[key])}  > {pin[key].title}</b>
                                                        < Pinned
                                                            initialpinstatus={pin[key].pinned}
                                                            pinstatus={this.ispinned}
                                                            noteID={pin[key]._id}
                                                        />
                                                    </div>
                                                    <div onClick={() => this.handleClick1(pin[key])} style={{ wordBreak: "break-word" }}  >
                                                        {pin[key].description}
                                                    </div>
                                                    {pin[key].reminder ?
                                                        <Chip id="chipcss"
                                                            label={pin[key].reminder}
                                                            onDelete={() => this.reminderNote('', pin[key]._id)}
                                                        />
                                                        :
                                                        null}
                                                    <div id="displaycontentdiv">
                                                        <Tools
                                                            lablevalue={this.props.lablevalue}
                                                            uploadImage={this.uploadImage}
                                                            notetitle={pin[key].title}
                                                            notedescription={pin[key].description}
                                                            reminder={this.reminderNote}
                                                            createNotePropsToTools={this.getColor}
                                                            noteID={pin[key]._id}
                                                            archiveNote={this.archiveNote}
                                                            archiveStatus={pin[key].archive}
                                                            trashNote={this.trashNote}
                                                        />
                                                    </div>
                                                </div >
                                            </Card>
                                        </Draggable>
                                    </div>
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
                            createNotePropsToTools={this.getColor}
                            trashNote={this.trashNote}
                            ispinned={this.ispinned}
                        />

                    </div>
                    <div>
                        {pinArray(this.state.notes).length === 0 && otherArray(this.state.notes).length === 0 ?
                            <h1 style={{ fontFamily: "georgia", color: "grey" }}>Notes you add appear here</h1> : null
                        }
                    </div>

                    <div >
                        {pinArray(this.state.notes).length !== 0 && otherArray(this.state.notes).length !== 0 ?
                            <label style={{ fontFamily: "georgia", fontSize: "15px", color: "grey", marginRight: "760px" }}>OTHER</label> : null
                        }
                    </div>
                    <div className="CardsView">
                        {Object.keys(noteArray).slice(0).reverse().map((key) => {
                            console.log("noteArray==============================>", noteArray[0].label.length);
                            //console.log("key++++++++++++++++++++++++++++++++++++++++++++++++++", key)
                            return (
                                <div key={key}>
                                    {/* <Draggable> */}
                                    <Card id={cardsView} style={{ backgroundColor: noteArray[key].color }}>
                                        <div>
                                            {noteArray[key].image !== "" ?
                                                <img style={{
                                                    maxWidth: "100%",
                                                    height: "auto"
                                                }} src={noteArray[key].image} alt="cardImage"></img>
                                                : null}
                                        </div>
                                        <div id="displaycontentdiv1" >
                                            <div id="pindiv"  >
                                                <b onClick={() => this.handleClick1(noteArray[key])} style={{ wordBreak: "break-word" }} > {noteArray[key].title}</b>
                                                < Pinned
                                                    // noteArray={noteArray}
                                                    initialpinstatus={noteArray[key].pinned}
                                                    pinstatus={this.ispinned}
                                                    noteID={noteArray[key]._id}
                                                />
                                            </div>


                                            <div onClick={() => this.handleClick1(noteArray[key])} >
                                                {noteArray[key].description}
                                            </div>
                                            <span >
                                                {noteArray[key].reminder ?
                                                    <Chip id="chipcss"
                                                        label={noteArray[key].reminder}
                                                        onDelete={() => this.reminderNote('', noteArray[key]._id)}
                                                    />
                                                    :
                                                    null}

                                                {noteArray[key].label.length > 0 ?
                                                    noteArray[key].label.map((key1, index) =>
                                                        <div key={index} >
                                                            <Chip
                                                                label={key1}
                                                                onDelete={() => this.deleteLabelFromNote(key1, noteArray[key]._id)}
                                                            />
                                                        </div>
                                                    )
                                                    :
                                                    null}
                                            </span>
                                            <div id="displaycontentdiv">
                                                <Tools
                                                    addLabelToNote={this.addLabelToNote}
                                                    date={noteArray[key].reminder}
                                                    notetitle={noteArray[key].title}
                                                    notedescription={noteArray[key].description}
                                                    uploadImage={this.uploadImage}
                                                    //  note={noteArray[key]}
                                                    reminder={this.reminderNote}
                                                    createNotePropsToTools={this.getColor}
                                                    noteID={noteArray[key]._id}
                                                    archiveNote={this.archiveNote}
                                                    archiveStatus={noteArray[key].archive}
                                                    trashNote={this.trashNote}
                                                    questionstatus={this.props.questionstatus}
                                                    // qadetails={this.props.qadetails}
                                                />
                                            </div>
                                        </div >
                                    </Card>
                                    {/* </Draggable> */}
                                </div>
                            )
                        })
                        }
                    </div>

                </div>

            );
        }
        // else {

        //     return(

        //         <h1>hai Question and answer</h1>
        //     )


        // }
    }
}
export default Cards;