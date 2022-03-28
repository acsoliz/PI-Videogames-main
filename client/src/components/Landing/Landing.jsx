import React from 'react';
import { Link } from 'react-router-dom';
import s from './Landing.module.css';
import slider2 from '../../img/4ba9b4b68ffcc7019b112174883ba4d6.jpg';
import slider3 from '../../img/214b29aeff13a0ae6a70fc4426e85991.jpg';
import slider6 from '../../img/imagen4.jpg';
import slider10 from '../../img/d1a2e99ade53494c6330a0ed945fe823.jpg';
import backLanding from '../../img/imagen5.jpg';

const Landing = () => {
	return (
		<div className={s.slider}>
			<figure>
				<img src={backLanding} alt="dog slide 1" />
				<img src={slider3} alt="dog slide 2" />
				<img src={slider6} alt="dog slide 3" />
				<img src={slider10} alt="dog slide 4" />
				<img src={backLanding} alt="dog slide 5" />
			</figure>
			<div className={s.landingContainer}>
				<h1>Videogames</h1>
				<h3>Start checking and pick your favourites</h3>
				<Link to="/home">
					<button className={s.homeBtn}>HOME</button>
				</Link>
			</div>
		</div>
	);
};

export default Landing;
