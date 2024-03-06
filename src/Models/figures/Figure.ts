import {Colors} from "../colors";
import logo from "../../assets/black-king.png"
import {Cell} from "../cell";

export enum FigureNames{
    FIGURE = "Фигура",
    KING = "Король",
    KNIGHT = "Конь",
    PAWN = "Пешка",
    QUEEN = "Королева",
    ROOK = "Ладья",
    BISHOP = "Слон"
}
//Figure - базовый класс от которого наследуются классы остальных фигур
export class Figure{
    //Белые или черные фигуры
    color: Colors;
    //Логотип фигуры из ассетов
    logo: typeof logo | null;
    //Цикличная ссылка - ячейка ссылается на фигуру, а фигура на ячейку
    cell: Cell;

    name: FigureNames;
    id: number;


    constructor(color: Colors, cell: Cell) {
        this.color = color;
        this.cell = cell;
        //Используем цикличную ссылку ячейка - фигура. Размещаем фигуру на ячейке
        this.cell.figure = this;
        this.logo = null;
        this.name = FigureNames.FIGURE;
        this.id = Math.random();
    }
    //Может ли фигура перемещаться в определенную ячейку?
    //В базовом классе определяются только общие моменты, конкретная логика реализуется в дочерних классах каждой фигуры
    //Тк для каждой фигуры она индивидуальна
    canMove(target: Cell) : boolean{
        //В базовом классе определяем базовые правила для всех фигур
        //Не можем ходить на свои фигуры
        if (target.figure?.color === this.color){
            return false;
        }
        //Не можем рубить короля
        if (target.figure?.name === FigureNames.KING){
            return false;
        }
        return true;
    }

    moveFigure(target: Cell) {}
}