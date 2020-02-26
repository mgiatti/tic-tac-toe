import Board from './Board';
import React, { useState, useEffect } from 'react';
import calculateTicTocToeWinner from '../utils/utils';

function Game() {

    const [ squares, setSquares ] = useState<Array<string | null>>(defaultValueForSquares())
    const [ turn, setTurn ] = useState<number>(0);
    const [ winnerUser, setWinnerUser] = useState<string | null>(null);
    const [ status,setStatus] = useState(`Next player: ${getUserTurnValue()}`);
    const [ history, setHistory ] = useState<Array<Array<string | null>>>([defaultValueForSquares()]);

    function defaultValueForSquares(){
        return [null,null,null,
                null,null,null,
                null,null,null]
    }

    function handleClick(i:number){
        tryToSetSquareValue(i);
    }

    function hasNoWinner(){
        return winnerUser == null;
    }

    function tryToSetSquareValue(i:number){
        if(hasEmptyValueInSquare(i) && hasNoWinner()){
            setSquareValue(i);
        }
    }

    function setSquareValue(i:number){
        const newSquares:Array<string | null> = squares.slice();
        const newHistory:Array<Array<string | null>> = history.slice(0,turn+1);
        newSquares[i] = getUserTurnValue();
        setSquares(newSquares);
        setHistory([...newHistory, [...newSquares]]);
        setTurn(turn+1);
    }

    function hasEmptyValueInSquare(i:number){
        return squares[i] == null;
    }

    function getUserTurnValue(): string {
        return turn % 2 == 0 ? "X" : "O";
    }
    
    useEffect(() => {
        const whoIsWinner = calculateTicTocToeWinner(squares);
      
        if(whoIsWinner == null){
            setStatus(`Next player: ${getUserTurnValue()}`);
        }else{
            setStatus('Winner: ' + whoIsWinner);
        }

        setWinnerUser(whoIsWinner);
       
    }, [squares]);

    function jumpTo(step:number) {
        setSquares([...history[step]]);
        setTurn(step);
    }

    const moves = history.map((squares, move) => {
        const desc = move ?
          'Go to move #' + move :
          'Go to game start';
        return (
          <li key={move}>
            <button onClick={() => jumpTo(move)}>{desc}</button>
          </li>
        );
      });

    return (
    <div className="game">
        <div className="game-board">
        <Board status={status} squares={squares} onClick={(i:number)=>handleClick(i)} />
        </div>
        <div className="game-info">
        <div>Turn: {turn}</div>
        <ol>{moves}</ol>
        </div>
    </div>
    );
}

export default Game;