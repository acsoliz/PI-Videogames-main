import React from 'react';
import { Link } from 'react-router-dom';

export default function Form() {
	return (
		<div>
			<Link to="/home">volver</Link>
			<div>
				<h1>CREATE A NEW VIDEOGAME</h1>
				<form action="">
					<div>
						<label>Name:</label>
						<input />
					</div>
					<div>
						<label>Edad:</label>
						<input />
					</div>
					<div>
						<label>rating:</label>
						<select>
							<option>1</option>
						</select>
					</div>
					<div>
						<label>Description:</label>
						<textarea name="" id="" cols="30" rows="10" />
					</div>
					<div>
						<label>Release:</label>
						<input />
					</div>
					<div>
						<label>Genres:</label>
						<select>
							<option>--Select genres--</option>
						</select>
					</div>
					<div>
						<label>Platforms:</label>
						<select>
							<option>--Select platforms--</option>
						</select>
					</div>
					<button>Create Game</button>
				</form>
			</div>
		</div>
	);
}
