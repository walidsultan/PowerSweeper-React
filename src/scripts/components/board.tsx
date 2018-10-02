import * as React from "react";
import Block from './block';
import BoardInterface from '../interfaces/BoardInterface';
export default class Board extends React.Component <BoardInterface,{}> {
        constructor(props) {
                super(props);
                this.state = {
                 
                };
              }

        render() {
        let  levelWidth:number = 10;
        let levelHeight:number = 10;

        //        let c= levelWidth.map((item, index) => (
        //                 <span  key={index}>
        //                     {index}
        //                 </span>
        //             ));

                return (
                        <div className="board">
                             <div className="frame">
                             
                  

                                <Block Left={1} Top={2} Value="12" BlockSize={100}/>
                             </div>    
                          </div>
                );
        }
}