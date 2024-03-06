import {Figure, FigureNames} from "./Figure";
import {Colors} from "../colors";
import {Cell} from "../cell";
import blackLogo from "../../Assets/black-bishop.png"
import whiteLogo from "../../Assets/white-bishop.png"

export class Bishop extends Figure{

    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color === Colors.black ? blackLogo : whiteLogo;
        this.name = FigureNames.BISHOP;
    }

    canMove(target: Cell): boolean {
        if (!super.canMove(target)){
            return false;
        }

        //Слон ходит по диагонали
        if (this.cell.isEmptyDiagonal(target)){
            return true;
        }
        return false;
    }
}