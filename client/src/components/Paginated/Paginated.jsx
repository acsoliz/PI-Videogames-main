import s from './Paginated.module.css';
import React from 'react';

export default function Paginated({ videogames, gamesByPage, paginated, currentPage, setCurrentPage }) {
	const pageNum = [];

	for (let i = 1; i <= Math.ceil(videogames / gamesByPage); i++) {
		pageNum.push(i);
	}

	return (
		<div>
			<div className={s.container}>
				{
					currentPage > 1 ? <button onClick={() => setCurrentPage(currentPage - 1)}>Prev</button> :
					' '}
				{pageNum &&
					pageNum.map((e, i) => (
						<label key={e} className={s.button} onClick={() => paginated(e)}>
							{' '}
							{currentPage + i}{' '}
						</label>
					))}
				{
					currentPage < pageNum.length ? <button
						className={s.nextPage}
						onClick={() => setCurrentPage(currentPage + 1)}
					>
						Next
					</button> :
					' '}
			</div>
		</div>
	);
}


