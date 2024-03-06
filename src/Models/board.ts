import {Cell} from "./cell";
import {Colors} from "./colors";
import {Pawn} from "./figures/Pawn";
import {King} from "./figures/King";
import {Queen} from "./figures/Queen";
import {Bishop} from "./figures/Bishop";
import {Knight} from "./figures/Knight";
import {Rook} from "./figures/Rook";
import {Figure} from "./figures/Figure";

export class Board{
    cells : Cell[][] = [];
    lostWhiteFigures : Figure[] = [];
    lostBlackFigures : Figure[] = [];

    public initBoard(){
        for (let i = 0; i < 8; i++){
            const row : Cell[] = [];
            for (let j = 0; j < 8; j++){
                if ((i + j) % 2 !== 0){

                    //В кач-ве фигуры передаем null, фигуры будут выставляться в другом месте
                   row.push(new Cell(this, j, i, Colors.black, null));
                }else{
                   row.push(new Cell(this, j, i, Colors.white, null));
                }
            }
            this.cells.push(row);
        }
    }

    //Метод получения ячейки по ее координате
    public getCell (x: number, y: number){
        return this.cells[y][x];
    }

    //Метод подсветки ячеек, доступных для хода
    public highlightCells(selectedCell : Cell | null){
        for (let i = 0; i < this.cells.length; i++){
            let row = this.cells[i];
            for (let j = 0; j < row.length; j++){
               // let target = row[j];
                row[j].available = !!selectedCell?.figure?.canMove(row[j]);
            }
        }
    }
    //Создание копии доски (необх для ререндеринга)
    public getCopyBoard() : Board {
        const newBoard = new Board();
        newBoard.cells = this.cells;
        newBoard.lostWhiteFigures = this.lostWhiteFigures;
        newBoard.lostBlackFigures = this.lostBlackFigures;
        return newBoard;
    }

    //Сохранение съедаемых фигур
    addLostFigure(figure : Figure){
        figure.color === Colors.white
            ? this.lostWhiteFigures.push(figure)
            : this.lostBlackFigures.push(figure);
    }

    public addFigures (){
       this.addBishops();
       this.addKings();
       this.addQueens();
       this.addPawns();
       this.addKnights();
       this.addRooks();
    }

    private addPawns(){
        for (let i = 0; i < 8; i++){
            new Pawn(Colors.black, this.getCell(i, 1));
            new Pawn(Colors.white, this.getCell(i, 6))
        }
    }

    private addBishops(){
        new Bishop(Colors.black, this.getCell(2,0))
        new Bishop(Colors.black, this.getCell(5,0))
        new Bishop(Colors.white, this.getCell(2,7))
        new Bishop(Colors.white, this.getCell(5,7))
    }

    private addKings() {
        new King(Colors.black, this.getCell(4,0));
        new King(Colors.white, this.getCell(4,7));
    }

    private addQueens(){
        new Queen(Colors.black, this.getCell(3,0));
        new Queen(Colors.white, this.getCell(3,7));
    }

    private addRooks(){
        new Rook(Colors.black, this.getCell(0,0))
        new Rook(Colors.black, this.getCell(7,0))
        new Rook(Colors.white, this.getCell(0,7))
        new Rook(Colors.white, this.getCell(7,7))

    }

    private addKnights(){
        new Knight(Colors.black, this.getCell(1,0))
        new Knight(Colors.black, this.getCell(6,0))
        new Knight(Colors.white, this.getCell(1,7))
        new Knight(Colors.white, this.getCell(6,7))

    }


}
