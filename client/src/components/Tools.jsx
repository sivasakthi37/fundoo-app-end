import React, { Component } from 'react';
import Reminder from './Reminder'
import ColorPallete from './Color';
import UploadImage from '../components/image'
import Archive from './archive';
import MoreOptions from './Moreoptions';
// import Collaborator from '../components/collaborator'
class Tools extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
        this.handleToggle = this.handleToggle.bind(this);
    }
    handleToggle() {
        this.setState({ open: !this.state.open });
    }
    render() {

        return (
            <div>
                <div className="cardTools">
                    <Reminder
                        date={this.props.date}
                        notetitle={this.props.notetitle}
                        notedescription={this.props.notedescription}
                        //  note={this.props.note}
                        reminder={this.props.reminder}
                        noteID={this.props.noteID}
                    />
                    <ColorPallete
                        handleToggle={this.handleToggle}
                        toolsPropsToColorpallete={this.props.createNotePropsToTools}

                        noteID={this.props.noteID}
                    />
                    <UploadImage

                        noteID={this.props.noteID}
                        uploadImage={this.props.uploadImage}
                    />
                    <Archive
                        archiveNote={this.props.archiveNote}
                        archiveStatus={this.props.archiveStatus}
                        noteID={this.props.noteID}
                    />
                    <MoreOptions
                     
                        addLabelToNote={this.props.addLabelToNote}
                        trashNote={this.props.trashNote}
                        noteID={this.props.noteID}

                    />
                    {/* <Collaborator/> */}
                </div>
            </div>
        )
    }
}
export default Tools;