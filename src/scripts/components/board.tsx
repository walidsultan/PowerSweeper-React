import * as React from "react";
import Block from './block';
import BoardInterface from '../interfaces/BoardInterface';
import BoardSettings from '../states/BoardState';
import { MineType } from "../enums/mineType";
import BoardState from "../states/BoardState";

export default class Board extends React.Component<BoardInterface, BoardState > {
        private mines: number[][];

        constructor(props) {
                super(props)
                this.initializeMines();
                this.initializeValues();

                  //Mark mines
                  this.AddMines(this.props.smallMinesCount, MineType.Small);
                  this.AddMines(this.props.mediumMinesCount, MineType.Medium);
                  this.AddMines(this.props.bigMinesCount, MineType.Large);
                  console.log(this.mines);
        }

        initializeValues(){
                let values = this.getDoubleArray(this.props.levelWidth,this.props.levelHeight);
                this.state={Values:values};
        }

        initializeMines() {
                this.mines = this.getDoubleArray(this.props.levelWidth,this.props.levelHeight);
              
        }

        getDoubleArray(width:number,height:number){
                let newArray= Array.apply(null, Array(width)).map(Number.prototype.valueOf, 0);
                for (let i in newArray) {
                        newArray[i] = Array.apply(null, Array(height)).map(Number.prototype.valueOf, 0);
                }
                return newArray;
        }

        handleBlockClick(left, top) {
              let value = this.mines[left-1][top]+this.mines[left+1][top] + this.mines[left][top-1]+this.mines[left][top+1] +
                                this.mines[left-1][top-1]+this.mines[left+1][top+1] + this.mines[left-1][top+1]+this.mines[left+1][top-1]      ;
              let values =this.state.Values;
              values[left][top]=value;
              this.setState({Values:values});
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

                //Add blocks
                for (let i = 0; i < levelWidth; i++) {
                        for (let j = 0; j < levelHeight; j++) {
                                puzzle.push(<Block 
                                        Left={i}
                                        Top={j}
                                        BlockSize={80}
                                        onClick={() => this.handleBlockClick(i, j)}
                                        onContextMenu={() => this.handleRightClick(i, j)}
                                        Value={this.state.Values[i][j]}
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