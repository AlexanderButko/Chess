import React, {useEffect, useState} from 'react';
import "./App.css"
import {Board} from "./Models/board";
import BoardComponent from "./Components/BoardComponent";
import {Colors} from "./Models/colors";
import {Player} from "./Models/player";
import LostFigures from "./Components/LostFigures";
import Timer from "./Components/Timer";


function App() {

  //Состояние для доски
  const [board, setBoard] = useState(new Board());

  //Состояния для игроков
  const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.white));
  const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.black));
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>( null);

  useEffect(() => {
      restart()
      //Белые начинают игру
      setCurrentPlayer(whitePlayer);
  }, [])

  //Создание новой игры
  function restart(){
      const newBoard = new Board();
      newBoard.initBoard();
      newBoard.addFigures();
      setBoard(newBoard);
  }

  //Передача хода другому игроку
  function swapPlayer(){
      setCurrentPlayer(currentPlayer?.color === Colors.white ? blackPlayer : whitePlayer);
  }

  return (
    <div className="app">
      <Timer
          currentPlayer={currentPlayer}
          restart={restart}
      />

      <BoardComponent
        board={board}
        setBoard={setBoard}
        currentPlayer = {currentPlayer}
        swapPlayer = {swapPlayer}
      />
      <div>
          <LostFigures title={"Белые"} lostFigures={board.lostWhiteFigures} />
          <LostFigures title={"Черные"} lostFigures={board.lostBlackFigures} />
      </div>
    </div>
  );
}

export default App;
