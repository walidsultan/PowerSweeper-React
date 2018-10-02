import * as React from "react";
import BlockInterface from "../interfaces/BlockInterface"
import { CSSProperties } from "react";
export default class Block extends React.Component <BlockInterface,{}> {
 
  
        render() {
          let styles:CSSProperties = {
            top: this.props.Top * this.props.BlockSize,
            left: this.props.Left * this.props.BlockSize
          };
                return (
                        <button className="block" style={styles}>
                                
                          </button>
                );
        }
}