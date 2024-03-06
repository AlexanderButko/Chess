import React, {FC, useEffect, useState} from 'react';
import {Board} from "../Models/board";
import CellComponent from "./CellComponent";
import {Cell} from "../Models/cell";
import {Player} from "../Models/player";

interface BoardProps{
    board: Board;
    currentPlayer: Player | null;
    setBoard: (board: Board) => void;
    swapPlayer: () => void;
}

const BoardComponent: FC<BoardProps> = ({board, currentPlayer, setBoard, swapPlayer}) => {

    const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

    //Функция выбора ячейки с фигурой по клику
    function clickCell(cell: Cell){
        //Если мы уже кликнули и выбрали клетку с фигурой и кликаем еще раз по другой клетке
        //то перемещаем фигуру на эту клетку
        if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)){
            selectedCell.moveFigure(cell);
            swapPlayer();
            //Обнуляем состояние выбранной клетки для того, чтобы было возможно выбрать иную клетку
            setSelectedCell(null);

        }else{
            //Выбираем клетку (первый клик по клетке)
            //Условие, чтобы нельзя было выбрать вражескую фигуру
            if (cell.figure?.color === currentPlayer?.color) {
                setSelectedCell(cell);
            }
        }
    }

    useEffect(() => highlightCells(),
        [selectedCell]);
    //Чтобы отрисовать доступные ячейки необходимо явным образом изменить состояние доски,
    // иначе реакт не увидит изменения в той же доске
    //Для этого сначала подсвечиваем доступные для хода ячейки в текущей доске,
    // а затем создаем копию текущей доски, и устанавливаем копию в состояние - так реакт увидит внесенные изменения

    function highlightCells(){
        board.highlightCells(selectedCell);
        updateBoard();
    }

    function updateBoard(){
        const newBoard = board.getCopyBoard();
        setBoard(newBoard);
    }

    return (
        <div>
            <h3>Текущий игрок: {currentPlayer?.color}</h3>
            <div className="board">
                {board.cells.map((row, index) =>
                    <React.Fragment key={index}>
                        {row.map((cell) =>
                            <CellComponent
                                key={cell.id}
                                cell={cell}
                                selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
                                clickCell={clickCell}
                            />
                        )}
                    </React.Fragment>
                )}
            </div>
        </div>
    );
};

export default BoardComponent;