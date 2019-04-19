import React, { Component } from 'react';
import { Tooltip } from '@material-ui/core';
import   {uploadimage} from '../services/note.services'

class UploadImage extends Component {
    triggerInputFile=()=> {
        this.fileInput.click();
    }
    uploadImage=(e)=> {
        console.log("upload image",e.target.files[0]);
        
       let data = new FormData();
       console.log("image:------------", e.target.files[0]);
       data.append('image', e.target.files[0]);
       uploadimage(data)
           .then((result) => {
               console.log("profile responce in backend--------->", result.data.data);
               this.props.uploadImage(result.data.data,this.props.noteID)
           }).catch((err) => {
               console.log(err);
           })
    }
    render() {
        return (
            <span>
            <Tooltip title="Upload Image"> 
                <img src={require('../assets/galaryicon.svg')}
                    className="uploadImage"
                    alt="upload pic icon"
                    onClick={() => { this.triggerInputFile() }} />
            </Tooltip>
                <input ref={fileInput => this.fileInput = fileInput}
                    type="file" style={{ 'display': 'none' }}
                    className="uploadImage"
                    onChange={(e)=>this.uploadImage(e)}
                />
               
            </span>
        )
    }
}
export default UploadImage;