import "../../css/levelDifficulty.less";
import * as React from "react";
import LevelDifficultyInterface from "../interfaces/LevelDiffiCultyInterface";
import { CSSProperties } from "react";
import Popup from "./popup";

export default class LevelDifficulty extends React.Component<LevelDifficultyInterface, {}> {

    constructor(props) {
        super(props)

    }
    render() {
        return (
            <Popup showPopup={this.props.showPopup}
                popupWidth={this.props.popupWidth}
                title={this.props.title}
                onCloseClick={() => this.props.onCloseClick()}
            >
                <div className="levelDifficulty">
                    <div className="buttons">
                        <button onClick={() => this.props.onEasyLevelClick()}>Easy</button>
                        <button onClick={() => this.props.onMediumLevelClick()}>Meduim</button>
                        <button onClick={() => this.props.onHardLevelClick()}>Hard</button>
                    </div>
                </div>
            </Popup>
        );
    }

}