import "../../css/menu.less";
import * as React from "react";
import MenuInterface from "../interfaces/MenuInterface";
import LevelDifficulty from "./LevelDifficulty";
import MenuState from "../states/MenuState";
import { Difficulty } from "../enums/difficulty";

export default class Menu extends React.Component<MenuInterface, MenuState> {

    private menuRef: any;
    private fontRatio: number = 0.025;

    constructor(props) {
        super(props)
        this.state = new MenuState();
        this.menuRef = React.createRef();

        this.updateDimensions = this.updateDimensions.bind(this);
    }
    render() {

        let menuStyle = {
            width: this.state.menuWidth
        };

        let itemsContainerStyle={
            fontSize:this.state.fontSize
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
            let menuWidth = this.menuRef.current.offsetHeight * 16 / 9;
            let fontSize = menuWidth * this.fontRatio;
            let newState = Object.assign(this.state, { menuWidth: menuWidth ,fontSize:fontSize});
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