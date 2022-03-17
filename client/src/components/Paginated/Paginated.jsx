import s from './Paginated.module.css';
import React from 'react';

export default function Paginated ({allGames, gamesByPage, paginated}){
    const pageNum = [];
    console.log("Hola desde el paginadooo!", pageNum)

    for(var i=1; i<=Math.ceil(allGames / gamesByPage); i++){
        pageNum.push(i);
    }

    return (
        <div>
            <div className={s.container}>
                {pageNum && pageNum.map(e=>(                    
                        <button key={e} className={s.button}   onClick={()=> paginated(e)}>{e}</button>                    
                ))}
            </div>
        </div>
    )


}