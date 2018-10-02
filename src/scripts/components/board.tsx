import * as React from "react";
import Block from './block';
import BoardInterface from '../interfaces/BoardInterface';
export default class Board extends React.Component <BoardInterface,{}> {

        handleClick(i) {
                alert(i);
              }

        handleRightClick(left,top){
                alert(left +" : "+ top);
        }

        render() {
                let levelWidth:number = 10;
                let levelHeight:number = 10;

                let puzzle = [];
                for (let i = 0; i < levelWidth; i++) {
                        for (let j = 0; j < levelHeight; j++) {
                                let value:number =  Math.floor(Math.random() * 3);
                                puzzle.push(<Block Left={i} Top={j} Value={value} BlockSize={80} onClick={() => this.handleClick(value)} onContextMenu={() => this.handleRightClick(i,j)} />);
                        }
                }


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