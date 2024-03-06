import {Figure, FigureNames} from "./Figure";
import {Colors} from "../colors";
import {Cell} from "../cell";
import blackLogo from "../../Assets/black-knight.png";
import whiteLogo from "../../Assets/white-knight.png";

export class Knight extends Figure{
    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color === Colors.black ? blackLogo : whiteLogo;
        this.name = FigureNames.KNIGHT;
    }

    canMove(target: Cell): boolean {
        if (!super.canMove(target)){
            return false;
        }
        //Конь ходит буквой Г. Закономерность - координаты изм либо на 2, либо на 1
        //Если х изм на 1, то у меняется на 2. Если х изм на 2, то у на 1. Направление не важно
        const dx = Math.abs(this.cell.x - target.x);
        const dy = Math.abs(this.cell.y - target.y);

        return (dx === 1 && dy === 2) || (dx === 2 && dy === 1);

    }

}