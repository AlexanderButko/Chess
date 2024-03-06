import {Figure, FigureNames} from "./Figure";
import {Colors} from "../colors";
import {Cell} from "../cell";
import blackLogo from "../../Assets/black-pawn.png";
import whiteLogo from "../../Assets/white-pawn.png";

export class Pawn extends Figure{
    //На первом ходу пешка может сходить на 2 или на 1 клетку вперед. Поэтому необх отслеживать первый шаг
    isFirstStep : boolean = true;

    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color === Colors.black ? blackLogo : whiteLogo;
        this.name = FigureNames.PAWN;
    }

    canMove(target: Cell): boolean {
        if (!super.canMove(target)){
            return false;
        }
        // Черные ходят вниз, белые ходят вверх. Определяем направление движения для фигуры
        const direction = this.cell.figure?.color === Colors.black ? 1 : -1;
        // Индивидуально для первого шага с возм движения на 2 клетки
        const firstStepDirection = this.cell.figure?.color === Colors.black ? 2 : -2;

        //Если клетка отстоит на одну (2 для первого шага) от той, где пешка
        if (((target.y === this.cell.y + direction) ||
            (this.isFirstStep && target.y === this.cell.y + firstStepDirection))
        //Пешка ходит только по у, значит на клетку с др х сходить не можем
        && target.x === this.cell.x
        //Пешка рубит по диагонали, соответственно на фигуру по прямой сходить не можем
        //&& target.isEmpty()
        && this.cell.board.getCell(target.x, target.y).isEmpty()
        ){
            return true;
        }

        //Также пешка может рубить вражескую по диагонали
        if (target.y === this.cell.y + direction
            && (target.x === this.cell.x + 1 || target.x === this.cell.x - 1)
            && this.cell.isEnemy(target)){

            return true;
        }

        return false;
    }

    //При движении пешки обнуляем флаг первого хода
    moveFigure(target: Cell) {
        super.moveFigure(target);
        this.isFirstStep = false;
    }

}