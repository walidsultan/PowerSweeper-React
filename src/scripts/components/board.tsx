import * as React from "react";
import Block from './block';
import BoardInterface from '../interfaces/BoardInterface';
import BoardSettings from '../states/BoardState';
import { MineType } from "../enums/mineType";
import BoardState from "../states/BoardState";
import BlockPointer from "../types/blockPointer";
import BlockInterface from "../interfaces/BlockInterface";
import BlockType from "../types/BlockType";

export default class Board extends React.Component<BoardInterface, BoardState> {
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

        initializeValues() {
                let blockStates:BlockType[][] = [];

                for(let i=0;i<this.props.levelWidth;i++){
                        blockStates[i]=[];
                        for(let j=0;j<this.props.levelHeight;j++){
                            blockStates[i][j]=new BlockType();
                        }
                }
                this.state = { blocks: blockStates };
        }

        initializeMines() {
                this.mines = this.getDoubleNumberArray(this.props.levelWidth, this.props.levelHeight);

        }

        getDoubleNumberArray(width: number, height: number) {
                let newArray = Array.apply(null, Array(width)).map(Number.prototype.valueOf, 0);
                for (let i in newArray) {
                        newArray[i] = Array.apply(null, Array(height)).map(Number.prototype.valueOf, 0);
                }
                return newArray;
        }

        handleBlockClick(left: number, top: number) {
                let blocksStates = this.state.blocks.slice();
                // blocksStates[0][0].Value=67;
                // blocksStates[0][0].IsClicked=true;
               this.setBlockValues(left, top, blocksStates);

                this.setState({ blocks: blocksStates });
        }

        setBlockValues(left: number, top: number, blocksStates: BlockType[][]) {
                let surroundingBlocks: BlockPointer[] = new Array();
                if (left > 0) {
                        surroundingBlocks.push({ Position: { X: left, Y: top }, Value: this.mines[left - 1][top] });
                        if (top > 0) {
                                surroundingBlocks.push({ Position: { X: left - 1, Y: top - 1 }, Value: this.mines[left - 1][top - 1] });
                        }
                        if (top < this.props.levelHeight - 1) {
                                surroundingBlocks.push({ Position: { X: left - 1, Y: top + 1 }, Value: this.mines[left - 1][top + 1] });
                        }
                }

                if (left < this.props.levelWidth - 1) {
                        surroundingBlocks.push({ Position: { X: left + 1, Y: top }, Value: this.mines[left + 1][top] });
                        if (top > 0) {
                                surroundingBlocks.push({ Position: { X: left + 1, Y: top - 1 }, Value: this.mines[left + 1][top - 1] });
                        }
                        if (top < this.props.levelHeight - 1) {
                                surroundingBlocks.push({ Position: { X: left + 1, Y: top + 1 }, Value: this.mines[left + 1][top + 1] });
                        }
                }

                if (top > 0) {
                        surroundingBlocks.push({ Position: { X: left, Y: top - 1 }, Value: this.mines[left][top - 1] });
                }

                if (top < this.props.levelHeight - 1) {
                        surroundingBlocks.push({ Position: { X: left, Y: top + 1 }, Value: this.mines[left][top + 1] });
                }

                let value: number = 0;
                for (let block of surroundingBlocks) {
                        value += block.Value;
                }
                if(value==0){
                        for(let block of surroundingBlocks ){
                                this.setBlockValues(block.Position.X, block.Position.Y,blocksStates);
                        }
                }

                blocksStates[left][top].Value = value;
                blocksStates[left][top].IsClicked=true;
        }

        handleRightClick(left, top) {
                // alert(left + " : " + top);
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
                                        Value={this.state.blocks[i][j].Value}
                                        HasMine={this.mines[i][j] > 0 ? true : false}
                                        Mine={this.mines[i][j] > 0 ? this.mines[i][j] : null} 
                                        IsClicked={false}/>);
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