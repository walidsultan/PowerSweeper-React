import * as React from "react";
import BlockInterface from "../interfaces/BlockInterface"
import { CSSProperties } from "react";
import BlockState from "../states/BlockState";
export default class Block extends React.Component<BlockInterface, BlockState> {

  constructor(props) {
    super(props)

    this.state = new BlockState();
  }
  render() {
    let styles: CSSProperties = {
      top: this.props.Top * this.props.BlockSize,
      left: this.props.Left * this.props.BlockSize
    };
    const mineStyle = { color: 'blue' };
    return (
      <button
        className={this.props.IsClicked ? "clicked block" : "block"}
        style={styles}
        onClick={() => this.onLeftClick()}
        onContextMenu={(e) => { e.preventDefault(); this.props.onContextMenu(); }}
        disabled={this.props.IsClicked}
      >{(this.props.IsClicked && this.props.Value > 0 && <div>{this.props.Value}</div>) }</button>
      // || <div style={mineStyle} >{this.props.Mine}</div>
    );
  }

  onLeftClick() {
    //this.setState({IsClicked: true});
    this.props.onClick();
  }
}