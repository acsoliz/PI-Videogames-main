import s from './Paginated.module.css';
import React from 'react';

export default function Paginated ({videogames, gamesByPage, paginated}){
    const pageNum = [];
    // console.log("Hola desde el paginadooo!", paginated)

    for(var i=1; i<=Math.ceil(videogames / gamesByPage); i++){
        pageNum.push(i);
    }

    return (
        <div>
            <div className={s.container}>
                {pageNum && pageNum.map(e=>(                    
                        <label key={e} className={s.button}   onClick={()=> paginated(e)}>  °  </label>                    
                ))}                
            </div>
        </div>
    )


}