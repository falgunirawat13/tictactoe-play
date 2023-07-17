import { useState } from 'react';
import './styles.scss';
import Board from './Components/Board';
import {calculateWinner} from './winner';
import History from './Components/History';
import StatusMessage from './Components/StatusMessage';

const NEW_GAME = [{squares:Array(9).fill(null),isXNext:false}]

function App() {
  const [history,setHistory]= useState(NEW_GAME);
  const [currentMove,setCurrentMove] = useState(0);

  const gamingBoard =history[currentMove];

  const winner=calculateWinner(gamingBoard.squares);
  const handleSquareClick =(clickedPosition) => {
    if(gamingBoard.squares[clickedPosition] || winner) {
      return;
    }
  setHistory((currentHistory) => {
   const isTraversing = currentMove + 1 !== currentHistory.length;

   const lastGamingState = isTraversing ?
   currentHistory[currentMove] :
   history[history.length -1];

   const nextSquaresState=lastGamingState.squares.map((squareValue,Position)=>

    {
  if(clickedPosition===Position){
    return lastGamingState.isXNext ? 'X': 'O';
  }
    return squareValue;
  }
  );

  const base = isTraversing ?  currentHistory.slice(0 , currentHistory.indexOf(lastGamingState) + 1) :  currentHistory;
  return base.concat({
    squares:nextSquaresState,
    isXNext: !lastGamingState.isXNext,
  });

}
);
setCurrentMove(move=>move+1);
  };

  const moveTo = move=>{
    setCurrentMove(move);
  };

  const onNewGameStart =() =>{
    setHistory(NEW_GAME);
    setCurrentMove(move);
  };
  return( 
   <div className="app">
    <h2><StatusMessage winner={winner} gamingBoard={gamingBoard} /></h2>
    <Board squares={gamingBoard.squares} handleSquareClick={handleSquareClick}/>
    <button type="button" onClick={onNewGameStart} className={`btn-reset ${winner ? 'active' : ''}`}>Start new game</button>
    <h2>Current Game history</h2>
    <History history={history} moveTo={moveTo} currentMove={currentMove}/>
    </div>
  );
  }

  export default App;