import * as React from "react";
import BlockInterface from "../interfaces/BlockInterface"
import { CSSProperties } from "react";
import BlockState from "../states/BlockState";
import { MineType } from "../enums/mineType";
export default class Block extends React.Component<BlockInterface, BlockState> {

  constructor(props) {
    super(props)

    this.state = new BlockState();
  }
  render() {
    let styles: CSSProperties = {
      top: this.props.Top * this.props.BlockSize,
      left: this.props.Left * this.props.BlockSize,
    };

    let className: string = this.getClassName();
    return (
      <button
        className={className}
        style={styles}
        onClick={() => this.onLeftClick()}
        onContextMenu={(e) => { e.preventDefault(); this.props.onContextMenu(); }}
        disabled={this.props.IsClicked}
      >{(this.props.IsClicked && this.props.Value > 0 && <div>{this.props.Value}</div>)}</button>
    );
  }

  onLeftClick() {
    this.props.onClick();
  }

  getClassName(): string {
    let className = "block";
    if (this.props.IsClicked) {
      className += " clicked";
    }
    switch (this.props.MarkedState) {
      case MineType.Large:
        className += " bigMine";
        break;
      case MineType.Medium:
        className += " mediumMine";
        break;
      case MineType.Small:
        className += " smallMine";
        break;
    }
    return className;
  }
}