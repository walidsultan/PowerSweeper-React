import * as React from "react";
import * as ReactDOM from "react-dom";
import Board from './src/scripts/components/board';

ReactDOM.render(
<div>
  <Board bigMinesCount={3} mediumMinesCount={5} smallMinesCount={7} levelHeight={10} levelWidth={10}/>
</div>,
  document.getElementById("root") 
);