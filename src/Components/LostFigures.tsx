import React, {FC} from 'react';
import {Figure} from "../Models/figures/Figure";
import "../App.css"

interface LostFigureProps{
    title: string;
    lostFigures: Figure[];
}
const LostFigures : FC<LostFigureProps> = ({title, lostFigures}) => {
    return (
        <div className="lost">
            <h3>{title}</h3>
            {lostFigures.map( figure =>
                <div key={figure.id}>
                    {figure.name}
                    {figure.logo && <img className="figure" src={figure.logo} alt=""/>}
                </div>)}
        </div>
    );
};

export default LostFigures;