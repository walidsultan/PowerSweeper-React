import "../../css/menu.less";
import * as React from "react";
import MenuInterface from "../interfaces/MenuInterface";
import { CSSProperties } from "react";
import LevelDifficulty from "./LevelDifficulty";
import MenuState from "../states/MenuState";

export default class Menu extends React.Component<MenuInterface, MenuState> {

    constructor(props) {
        super(props)
        this.state = new MenuState();
    }
    render() {

        return (
            <div className="menu">
                <div className="itemsContainer">
                    <div className="item" onClick={()=>this.OnNewClick()}>New Game</div>
                    <div className="item">High Scores</div>
                    <div className="item">Instructions</div>
                    <div className="item">Credits</div>
                </div>
                <LevelDifficulty showPopup={this.state.showNewLevelPopup} onCloseClick={()=>this.OnLevelDifficultyCloseClick()}></LevelDifficulty>
            </div>
        );
    }

    OnNewClick(){
        this.setState({showNewLevelPopup:true});
    }

    OnLevelDifficultyCloseClick(){
        this.setState({showNewLevelPopup:false});
    }

}