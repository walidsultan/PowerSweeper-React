import * as React from "react";
import Block from './block';
import BoardInterface from '../interfaces/BoardInterface';
import BoardSettings from '../dto/boardSettings';
import { MineType } from "../enums/mineType";

export default class Board extends React.Component<BoardInterface, {}> {
        private mines: number[][];

        constructor(props) {
                super(props)
                this.initializeMines();
                // this.state = new BoardSettings();
        }

        initializeMines() {
                this.mines = Array.apply(null, Array(this.props.levelWidth)).map(Number.prototype.valueOf, 0);
                for (let i in this.mines) {
                        this.mines[i] = Array.apply(null, Array(this.props.levelHeight)).map(Number.prototype.valueOf, 0);
                }
                console.log(this.mines);
        }

        handleClick(left, top, value) {
                alert(left + " : " + top + " : " + value);
        }

        handleRightClick(left, top) {
                alert(left + " : " + top);
        }

        AddMines(minesCount: number, mineType: MineType): void {
                let remainingMines: number = minesCount;
                do {
                        let leftIndex = Math.floor(Math.random() * this.props.levelWidth);
                        let topIndex = Math.floor(Math.random() * this.props.levelHeight);

                        if (this.mines[leftIndex][topIndex] == 0) {
                                this.mines[leftIndex][topIndex] = mineType;
                                remainingMines--;
                        }
                } while (remainingMines > 0);
        }

        generatePuzzle(levelWidth: number, levelHeight: number): any[] {
                let puzzle = [];

                //Mark mines
                this.AddMines(this.props.smallMinesCount, MineType.Small);
                this.AddMines(this.props.mediumMinesCount, MineType.Medium);
                this.AddMines(this.props.bigMinesCount, MineType.Large);

                //Add blocks
                for (let i = 0; i < levelWidth; i++) {
                        for (let j = 0; j < levelHeight; j++) {
                                let value: number = Math.floor(Math.random() * 3);
                                puzzle.push(<Block
                                        Left={i}
                                        Top={j}
                                        Value={value}
                                        BlockSize={80}
                                        onClick={() => this.handleClick(i, j, value)}
                                        onContextMenu={() => this.handleRightClick(i, j)}
                                        HasMine={this.mines[i][j] > 0 ? true : false}
                                        Mine={this.mines[i][j] > 0 ? this.mines[i][j] : null} />);
                        }
                }
                return puzzle;
        }

        render() {
                let puzzle = this.generatePuzzle(this.props.levelWidth, this.props.levelHeight);

                return (
                        <div className="board">
                                <div className="frame">
                                        <div className="puzzle">
                                                {puzzle}
                                        </div>
                                </div>
                        </div>
                );
        }


}