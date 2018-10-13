import * as React from "react";
import * as ReactDOM from "react-dom";
import Board from './src/scripts/components/board';
import Menu from "./src/scripts/components/menu";
ReactDOM.render(
<div>
  {<Board bigMinesCount={3} mediumMinesCount={5} smallMinesCount={7} levelHeight={10} levelWidth={10} /> }
      {/* <Menu></Menu> */}
      {/* <Board bigMinesCount={6} mediumMinesCount={10} smallMinesCount={14} levelHeight={15} levelWidth={15} />  */}
    }
</div>,
  document.getElementById("root") 
);