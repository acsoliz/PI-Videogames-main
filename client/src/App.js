import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { getAllGames } from './redux/actions';
import { useDispatch } from 'react-redux';
import './App.css';
import Home from './components/Home/Home';
import Landing from './components/Landing/Landing';
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
			</Routes>
		</div>
	);
}

export default App;
