import * as React from "react";
import BlockInterface from "../interfaces/BlockInterface"
import { CSSProperties } from "react";
import BlockState from "../states/BlockState";
import { MineType } from "../enums/mineType";
import "../../css/block.less";

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

    let classNames: [string] = this.getClassNames();
    return (
      <div
        className={classNames.join(' ')}
        style={styles}
        onClick={() => this.onLeftClick()}
        onContextMenu={(e) => this.onRightClick(e)}
      >{(this.props.IsClicked && this.props.Value > 0 && <div>{this.props.Value}</div>)}</div>
    );
  }

  onRightClick(e) {
    e.preventDefault();
    if (!this.props.IsClicked) {
      this.props.onContextMenu();
    }
  }

  onLeftClick() {
    if(!this.props.IsClicked){
      this.props.onClick();
    }
  }

  getClassNames(): [string] {
    let classNames: [string] = ["block"];
    if (this.props.IsClicked) {
      classNames.push("clicked");
    }

    if (this.props.IsClicked && this.props.HasMine) {
      classNames.push("clickedMine");
    }
    switch (this.props.MarkedState) {
      case MineType.Large:
        classNames.push("bigMine");
        break;
      case MineType.Medium:
        classNames.push("mediumMine");
        break;
      case MineType.Small:
        classNames.push("smallMine");
        break;
    }

    if (this.props.MarkedState > 0) {
      classNames.push("marked");
    }
    return classNames;
  }


}