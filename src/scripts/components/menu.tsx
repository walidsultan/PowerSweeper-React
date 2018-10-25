import "../../css/menu.less";
import * as React from "react";
import MenuInterface from "../interfaces/MenuInterface";
import LevelDifficulty from "./LevelDifficulty";
import MenuState from "../states/MenuState";
import { Difficulty } from "../enums/difficulty";

export default class Menu extends React.Component<MenuInterface, MenuState> {

    private menuRef: any;
    private fontRatio: number = 0.025;
    private popupWidthRatio: number = 0.6;

    constructor(props) {
        super(props)
        this.state = new MenuState();
        this.menuRef = React.createRef();

        this.updateDimensions = this.updateDimensions.bind(this);

    }
    render() {

        let menuStyle = {
            width: this.state.menuWidth,
            height:this.state.menuHeight
        };

        let itemsContainerStyle = {
            fontSize: this.state.fontSize
        };

        return <div className="menu" ref={this.menuRef} style={menuStyle}>
            <div className="itemsContainer" style={itemsContainerStyle}>
                <div className="item" onClick={() => this.OnNewClick()}>New Game</div>
                <div className="item">High Scores</div>
                <div className="item">Instructions</div>
                <div className="item">Credits</div>
            </div>
            <LevelDifficulty showPopup={this.state.showNewLevelPopup}
                onCloseClick={() => this.OnLevelDifficultyCloseClick()}
                onEasyLevelClick={() => this.props.onNewLevel(Difficulty.Easy)}
                onMediumLevelClick={() => this.props.onNewLevel(Difficulty.Medium)}
                onHardLevelClick={() => this.props.onNewLevel(Difficulty.Hard)}
                popupWidth={this.state.popupWidth}
                title="Choose Level Difficulty"
            ></LevelDifficulty>
        </div>;
    }

    componentDidUpdate() {
        //this.updateDimensions();
    }
    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions);
        this.updateDimensions();
    }

    updateDimensions() {
        if (this.menuRef != null && this.menuRef.current != null) {
            let menuHeight= window.innerHeight ;
            let menuWidth = menuHeight * 16 / 9;

            if(menuWidth>window.innerWidth){
                menuWidth= window.innerWidth;
                menuHeight= menuWidth * 9/16;
            }

            let fontSize = menuWidth * this.fontRatio;
            let popupWidth = menuWidth * this.popupWidthRatio;

            let newState = Object.assign(this.state, { menuWidth: menuWidth, fontSize: fontSize, popupWidth: popupWidth,menuHeight:menuHeight });
            this.setState(newState);
        }
    }

    OnNewClick() {
        this.setState({ showNewLevelPopup: true });
    }

    OnLevelDifficultyCloseClick() {
        this.setState({ showNewLevelPopup: false });
    }
}