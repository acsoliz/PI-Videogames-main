import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getByName } from '../../redux/actions/index';

export default function SearchBar() {
	const dispatch = useDispatch();
	const [ name, setName ] = useState(''); //name estado Local,

	function handleInputChange(e) {
		e.preventDefault();
		setName(e.target.value); //tomo el valor del imput del elemento que disparo el evento
	
	}

    function handleSubmit(e){
        e.preventDefault()
        dispatch(getByName(name))
      
    }
    

	return (
		<div>
			<input type="text" placeholder="Buscar..." onChange={(e) => handleInputChange(e)} />
			<button type="submit" onClick={(e)=>handleSubmit(e)} >Buscar</button>
		</div>
	);
}
