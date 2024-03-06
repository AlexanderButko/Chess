import {Colors} from './colors'
import {Figure} from "./figures/Figure";
import {Board} from "./board";

export class Cell{
    readonly x: number;
    readonly y: number;
    readonly color: Colors;

    figure: Figure | null;
    board: Board;
    //true если выбранная фигура может походить в клетку
    available: boolean;
    id: number;

    constructor(board: Board, x: number, y: number, color: Colors, figure: Figure | null) {
        this.x = x;
        this.y = y;
        this.board = board;
        this.color = color;
        this.figure = figure;
        this.available = false;

        this.id = Math.random();
    }
    //Есть ли фигура на ячейке?
    isEmpty() : boolean{
      return this.figure === null;
    }

    //Есть ли на целевой ячейке вражеская?(исп. в классе пешки)
    isEnemy(target : Cell) : boolean{
        if (target.figure && this.figure?.color !== target.figure?.color){
            return true;
        }
        return false;
    }

    isEmptyVertical(target: Cell) : boolean{

        //Если ячейки находятся не на одной линии по вертикали, то и проверять ее чистоту не нужно
        if (this.x !== target.x){
            return false;
        }

        const min = Math.min(this.y, target.y);
        const max = Math.max(this.y, target.y);

        for (let y = min + 1; y < max; y++){
            //Если на столбце находим фигуру, то вернем ложь
            if (!this.board.getCell(this.x, y).isEmpty()){
                return false;
            }
        }
        //А если перебрав все ячейки вертикали не нашли фигуры вернем истину
        return true;
    }

    isEmptyHorizontal(target: Cell) : boolean{
        //Если ячейки находятся не на одной линии по горизонтали, то и проверять ее чистоту не нужно
        if (this.y !== target.y){
            return false;
        }

        const min = Math.min(this.x, target.x);
        const max = Math.max(this.x, target.x);

        for (let x = min + 1; x < max; x++){
            //Если на строке находим фигуру, то вернем ложь
            if (!this.board.getCell(x, this.y).isEmpty()){
                return false;
            }
        }
        //А если перебрав все ячейки горизонтали не нашли фигуры вернем истину
        return true;
    }


    isEmptyDiagonal(target: Cell) : boolean{

        //Разница координат диагональных клеток по х и по у всегда одинакова по модулю
        //Если разница не равна, значит это не диагональные клетки
       const absX = Math.abs(target.x - this.x);
       const absY = Math.abs(target.y - this.y);

       if (absX !== absY){
           return false;
       }

       //Определяем направление движения по диагонали  1;1-вверх вправо, -1;-1 вниз влево, 1;-1 вниз вправо, -1;1 вверх влево
       const dx = this.x < target.x ? 1 : -1;
       const dy = this.y < target.y ? 1 : -1;

        //Перебираем все ячейки по диагонали до цели, и если они пусты, то разрешаем движение на них
        //i=1 тк не проверяем текущую ячейку
        //absX==absY поэтому не важно, по какой оси перебирать
       for (let i = 1; i < absY; i++){
           if(!this.board.getCell(this.x + dx*i,this.y + dy*i).isEmpty()){
               return false;
           }
       }
        return true;
    }

    //Необходимо для работы кольцевой зависимости
    setFigure(figure : Figure){
        this.figure = figure;
        this.figure.cell = this;
    }

    moveFigure(target: Cell){
        if(this.figure && this.figure.canMove(target)){
            //Этот метод пуст у всех фигур, кроме пешки. Для пешки в этом методе флаг первого хода выставляется в false
            //после первого хода. Строка нужна только для этого
            this.figure.moveFigure(target);

            //Сохраняеи съедаемую фигуру
            if (target.figure){
                this.board.addLostFigure(target.figure);
            }

            target.setFigure(this.figure);
            this.figure = null;
        }

    }
}