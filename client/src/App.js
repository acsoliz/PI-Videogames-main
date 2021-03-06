import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { getAllGames, getGenres } from './redux/actions';
import { useDispatch } from 'react-redux';
import './App.css';
import Home from './components/Home/Home';
import Landing from './components/Landing/Landing';
import Detail from './components/Details/Detail';
import Form from './components/Form/Form';


function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getAllGames());
		dispatch(getGenres())
	}, []);

	useEffect(()=>{

	})

	return (
		<div className="App">
			<Routes>
				<Route exact path="/" element={<Landing />} />
				<Route exact path="/home" element={<Home />} />
				<Route exact path="/videogame/:id" element={<Detail />} />
				<Route exact path="/create" element={<Form />} />
			</Routes>
		</div>
	);
}

export default App;
