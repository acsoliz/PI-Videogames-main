import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { getAllGames } from './redux/actions';
import { useDispatch } from 'react-redux';
import './App.css';
import Home from './components/Home/Home';
import Landing from './components/Landing/Landing';
import Detail from './components/Details/Detail';
function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getAllGames());
	}, []);

	return (
		<div className="App">
			<Routes>
				<Route exact path="/" element={<Landing />} />
				<Route exact path="/home" element={<Home />} />
				<Route exact path="/videogame/:id" element={<Detail />} />
			</Routes>
		</div>
	);
}

export default App;
