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
                //Mark mines
                this.AddMines(this.props.smallMinesCount, MineType.Small);
                this.AddMines(this.props.mediumMinesCount, MineType.Medium);
                this.AddMines(this.props.bigMinesCount, MineType.Large);

                console.log(this.mines);
                this.initializeValues();
        }

        initializeValues() {
                let blockStates: BlockType[][] = [];

                for (let i = 0; i < this.props.levelWidth; i++) {
                        blockStates[i] = [];
                        for (let j = 0; j < this.props.levelHeight; j++) {
                                blockStates[i][j] = new BlockType();
                                blockStates[i][j].Left = i;
                                blockStates[i][j].Top = j;
                                blockStates[i][j].HasMine = this.mines[i][j] > 0 ? true : false;
                                blockStates[i][j].Mine = this.mines[i][j] > 0 ? this.mines[i][j] : null;
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
                let blocksStates = this.state.blocks;
                if (blocksStates[left][top].HasMine) {
                        alert("You clicked on a mine");
                } else {
                        this.setBlockValues(left, top, blocksStates);
                        this.setState({ blocks: blocksStates });
                }
        }

        pushBlock(blocks: BlockPointer[], left: number, top: number) {
                if (!this.state.blocks[left][top].IsClicked) {
                        blocks.push({ Position: { X: left, Y: top }, Value: this.mines[left][top] });
                }
        }

        setBlockValues(left: number, top: number, blocksStates: BlockType[][]) {
                let surroundingBlocks: BlockPointer[] = new Array();
                if (left > 0) {
                        this.pushBlock(surroundingBlocks, left - 1, top);
                        if (top > 0) {
                                this.pushBlock(surroundingBlocks, left - 1, top - 1);
                        }
                        if (top < this.props.levelHeight - 1) {
                                this.pushBlock(surroundingBlocks, left - 1, top + 1);
                        }
                }

                if (left < this.props.levelWidth - 1) {
                        this.pushBlock(surroundingBlocks, left + 1, top);
                        if (top > 0) {
                                this.pushBlock(surroundingBlocks, left + 1, top - 1);
                        }
                        if (top < this.props.levelHeight - 1) {
                                this.pushBlock(surroundingBlocks, left + 1, top + 1);
                        }
                }

                if (top > 0) {
                        this.pushBlock(surroundingBlocks, left, top - 1);
                }

                if (top < this.props.levelHeight - 1) {
                        this.pushBlock(surroundingBlocks, left, top + 1);
                }

                let value: number = 0;
                for (let block of surroundingBlocks) {
                        value += block.Value;
                }

                blocksStates[left][top].IsClicked = true;
                blocksStates[left][top].Value = value;

                if (value == 0) {
                        for (let block of surroundingBlocks) {
                                this.setBlockValues(block.Position.X, block.Position.Y, blocksStates);
                        }
                }
        }

        handleRightClick(left, top) {
                let blocksStates = this.state.blocks;
                blocksStates[left][top].MarkedState++;
                this.setState({ blocks: blocksStates });
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
                for (let row of this.state.blocks) {
                        for (let block of row) {
                                puzzle.push(<Block
                                        Left={block.Left}
                                        Top={block.Top}
                                        BlockSize={80}
                                        onClick={() => this.handleBlockClick(block.Left, block.Top)}
                                        onContextMenu={() => this.handleRightClick(block.Left, block.Top)}
                                        Value={block.Value}
                                        HasMine={block.HasMine}
                                        Mine={block.Mine}
                                        IsClicked={block.IsClicked}
                                        MarkedState={block.MarkedState} />);
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