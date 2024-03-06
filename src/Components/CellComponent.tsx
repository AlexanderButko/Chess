import React, {FC} from 'react';
import {Cell} from "../Models/cell";

interface CellProps{
    cell: Cell;

    selected: boolean;
    clickCell: (cell: Cell)=>void
}

const CellComponent: FC<CellProps> = ({cell, selected, clickCell}) => {
    return (
        <div
            className={[
                "cell",
                cell.color,
                selected ? "selected" : "",
                cell.available && cell.figure ? 'available-attack' : ''
            ].join(' ')}
            onClick={()=>clickCell(cell)}
        >
            {/*Eсли ячейка доступна для перемещения фигуры и фигура не стоит на этой ячейке нарисовать зеленый круг*/}
            {cell.available && !cell.figure && <div className="available"></div>}

            {/*Если лого фигуры существует добавляем лого на соотв ячейку*/}
            {cell.figure?.logo && <img src={cell.figure.logo} alt=""/>}
        </div>
    );
};

export default CellComponent;