
import React, { Component } from 'react';
import { IconButton, Tooltip, Card } from '@material-ui/core';
//import ClickAwayListener from '@material-ui/core/ClickAwayListener';

const colorCodesAndNames = [{ name: "white", colorCode: "rgb(255, 255, 255)" },
{ name: "lightGreen", colorCode: "rgb(204, 255, 144)" },
{ name: "purple", colorCode: "rgb(215, 174, 251)" },
{ name: "red", colorCode: "rgb(242, 139, 130)" },
{ name: "Teal", colorCode: "rgb(167, 255, 235)" },
{ name: "pink", colorCode: "rgb(253, 207, 232)" },
{ name: "orange", colorCode: "rgb(251, 188, 4)" },
{ name: "blue", colorCode: "rgb(203, 240, 248)" },
{ name: "brown", colorCode: "rgb(230, 201, 168)" },
{ name: "yellow", colorCode: "rgb(255, 244, 117)" },
{ name: "darkBlue", colorCode: "rgb(174, 203, 250)" },
{ name: "gray", colorCode: "rgb(232, 234, 237)" }
]
class Color extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }
    closePopper() {
        this.setState({
            open: false
        })
    }
    handleColor = (evt) => {
        this.setState({ open: !this.state.open });
        console.log("fghty", this.props.noteID)
        this.props.toolsPropsToColorpallete(evt.target.value, this.props.noteID);
    }
    handleToggle = () => {
        this.setState({ open: !this.state.open });
        // this.props.handleToggle(!this.state.open1)
    }
    render() {

        const changeCardColor = colorCodesAndNames.map((colorKey) =>
            <div key={colorKey.name}>
                {/* <ClickAwayListener onClick={() => this.closePopper()}> */}
                    <Tooltip title={colorKey.name}>
                        <IconButton style={{ backgroundColor: colorKey.colorCode, "margin": "2px", }}
                            value={colorKey.colorCode}
                            onClick={this.handleColor}>
                        </IconButton>
                    </Tooltip>
                {/* </ClickAwayListener> */}
            </div>
        );
        return (
            <div>

                <Tooltip title="Change Color">
                    <img src={require('../assets/Coloricon.svg')}
                        className="colorPalleteIcon"
                        alt="change color"
                        onClick={this.handleToggle}
                    />
                </Tooltip>

                <div>
                    {this.state.open ?

                        <Card className="colorPalleteCard">
                            {changeCardColor}
                        </Card>
                      
                    : null}
                </div>
            </div>

        )
    }
}
export default Color;





