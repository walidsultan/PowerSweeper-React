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
                    <span className="close" onClick={()=>this.props.onCloseClick()}>&times;</span>
                    <button>Easy</button>
                    <button>Meduim</button>
                    <button>Hard</button>
                </div>
            </div>
        );
    }

}