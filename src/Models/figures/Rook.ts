import {Figure, FigureNames} from "./Figure";
import {Colors} from "../colors";
import {Cell} from "../cell";
import blackLogo from "../../Assets/black-rook.png";
import whiteLogo from "../../Assets/white-rook.png";

export class Rook extends Figure{
    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color === Colors.black ? blackLogo : whiteLogo;
        this.name = FigureNames.ROOK;
    }

    canMove(target: Cell): boolean {
        if (!super.canMove(target)){
            return false;
        }

        //Ладья ходит по вертикали и по горизонтали
        if (this.cell.isEmptyHorizontal(target)){
            return true;
        }
        if (this.cell.isEmptyVertical(target)){
            return true;
        }

        return false;
    }

}