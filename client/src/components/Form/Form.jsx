import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';


export default function Form() {
    const dispatch = useDispatch();
    const history = useNavigate()

    // const AllGenres = useSelector((state) => state.AllGenres);
    // const allPlatforms = use

	return (
		<div>
			<Link to="/home">volver⮨</Link>
			<div>
				<h1>CREATE A NEW VIDEOGAME</h1>
				<form>
					<div>
						<label>Name:</label>
						<input />
					</div>
                    <br />
					<div>
						<label>rating:</label>
						<select>
							<option>1</option>
						</select>
					</div>
                    <br />
					<div>
						<label>Description:</label>
						<textarea name="" id="" cols="30" rows="10" />
					</div>
                    <br />
					<div>
						<label>Release:</label>
						<input />
					</div>
                    <br />
					<div>
						<label>Genres:</label>
						<select>
							<option>--Select genres--</option>
						</select>
					</div>
                    <br />
					<div>
						<label>Platforms:</label>
						<select>
							<option>--Select platforms--</option>
						</select>
					</div>
                    <br />
					<button>Create Game</button>
				</form>
			</div>
		</div>
	);
}
