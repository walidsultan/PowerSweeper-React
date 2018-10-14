import "../../css/levelDifficulty.less";
import * as React from "react";
import LevelDifficultyInterface from "../interfaces/LevelDiffiCultyInterface";
import { CSSProperties } from "react";

export default class LevelDifficulty extends React.Component<LevelDifficultyInterface, {}> {

    constructor(props) {
        super(props)

    }
    render() {
        let styles: CSSProperties = {
            display: this.props.showPopup ? 'block' : 'none'
        };
        return (
            <div className="levelDifficulty" style={styles}>
                <div className="content">
                    <div className="title"> 
                        <span>Choose Level Difficulty</span>
                        <span className="close" onClick={()=>this.props.onCloseClick()}>&times;</span>
                    </div>

                    <div className="buttons">
                        <button onClick={()=>this.props.onEasyLevelClick()}>Easy</button>
                        <button onClick={()=>this.props.onMediumLevelClick()}>Meduim</button>
                        <button onClick={()=>this.props.onHardLevelClick()}>Hard</button>
                    </div>
                </div>
            </div>
        );
    }

}