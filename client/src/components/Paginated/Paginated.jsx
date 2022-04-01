import s from './Paginated.module.css';
import React from 'react';


export default function Paginated({ videogames, gamesByPage, paginated, currentPage, setCurrentPage }) {
	const pageNum = [];
    

	for (let i = 1; i <= Math.ceil(videogames / gamesByPage); i++) {
		pageNum.push(i);
	}
    
	return (
		<div>
     		{currentPage >1 ? <button onClick={()=>setCurrentPage(currentPage-1)}>Prev</button>: " "}
			<div className={s.container}>
				{pageNum &&
					pageNum.map((e, i) => (
						<label key={e} className={s.button} onClick={() => paginated(e)}>
							{' '}
							{currentPage+i}{' '}
						</label>
					))}
			</div>
            {currentPage < pageNum.length? <button onClick={()=>setCurrentPage(currentPage+1)}>Next</button>: " "}
		</div>
	);
}
