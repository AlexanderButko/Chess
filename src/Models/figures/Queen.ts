import {Figure, FigureNames} from "./Figure";
import {Colors} from "../colors";
import {Cell} from "../cell";
import blackLogo from "../../Assets/black-queen.png";
import whiteLogo from "../../Assets/white-queen.png";

export class Queen extends Figure{
    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color === Colors.black ? blackLogo : whiteLogo;
        this.name = FigureNames.QUEEN;
    }

    canMove(target: Cell): boolean {
        if (!super.canMove(target)){
            return false;
        }
        //Королева ходит по свободной вертикали, горизонтали, диагонали. Если они пусты, то можно ходить
        if (this.cell.isEmptyVertical(target)){
            return true;
        }

        if (this.cell.isEmptyHorizontal(target)){
            return true;
        }

        if (this.cell.isEmptyDiagonal(target)){
            return true;
        }
        return false;
    }

}