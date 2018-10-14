import "../../css/menu.less";
import * as React from "react";
import MenuInterface from "../interfaces/MenuInterface";
import LevelDifficulty from "./LevelDifficulty";
import MenuState from "../states/MenuState";
import { Difficulty } from "../enums/difficulty";

export default class Menu extends React.Component<MenuInterface, MenuState> {

    constructor(props) {
        super(props)
        this.state = new MenuState();
    }
    render() {
        return <div className="menu">
        <div className="itemsContainer">
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

    OnNewClick() {
        this.setState({ showNewLevelPopup: true });
    }

    OnLevelDifficultyCloseClick() {
        this.setState({ showNewLevelPopup: false });
    }
}