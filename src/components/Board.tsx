import Square from './Square';
import React from 'react';

function Board(prop:any) {

    function renderSquare(i:number) {
      return <Square value={prop.squares[i]} onClick={()=>prop.onClick(i)}/>;
    }
  
    return (
        <div>
            <div className="status">{prop.status}</div>
            <div className="board-row">
            {renderSquare(0)}
            {renderSquare(1)}
            {renderSquare(2)}
            </div>
            <div className="board-row">
            {renderSquare(3)}
            {renderSquare(4)}
            {renderSquare(5)}
            </div>
            <div className="board-row">
            {renderSquare(6)}
            {renderSquare(7)}
            {renderSquare(8)}
            </div>
        </div>
    );
}

export default Board;