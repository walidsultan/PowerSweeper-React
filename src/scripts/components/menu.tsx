import "../../css/menu.less";
import * as React from "react";
import MenuInterface from "../interfaces/MenuInterface";
import { CSSProperties } from "react";

export default class Menu extends React.Component<MenuInterface, {}> {

    constructor(props) {
        super(props)

    }
    render() {

        return (
            <div className="menu">
                <div className="itemsContainer">
                    <div className="item">New Game</div>
                    <div className="item">High Scores</div>
                    <div className="item">Instructions</div>
                    <div className="item">Credits</div>
                </div>
            </div>
        );
    }

}