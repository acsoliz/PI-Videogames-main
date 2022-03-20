const ovejas = [
	{ name: 'Noa', color: 'azul' },
	{ name: 'Euge', color: 'rojo' },
	{ name: 'Navidad', color: 'rojo' },
	{ name: 'Ki Na Ma', color: 'rojo' },
	{ name: 'AAAAAaaaaa', color: 'rojo' },
	{ name: 'Nnnnnnnn', color: 'rojo' }
];

//1)
// function contarOvejas(ovejas) {
// 	// aquí tu magia
// 	ovejas = ovejas.filter((e) => {
// 		return (
// 			e.color === 'rojo' &&
// 			(e.name.includes('a') || e.name.includes('A')) &&
// 			(e.name.includes('N') || e.name.includes('n'))
// 		);
// 	});
// 	console.table(ovejas);
// }
// contarOvejas(ovejas);

//2)
const carta = 'bici coche balón _playstation bici coche peluche';

function listGifts(letter) {
	// ¡Tú puedes!
	var obj = {};
	letter = letter.split(' ');
    letter = letter.filter(e=>!e.includes('_'))
    // letter = letter.map(e=>e.trim())
	for (let i = 0; i < letter.length; i++) {
		if (!obj[letter[i]]) {
			obj[letter[i]] = 1;
		} else {
			obj[letter[i]] ++;
		}
	}

    for (const key in obj) {
        key.trim()
    }
	return(obj);
}

const regalos = listGifts(carta);

console.table(regalos);

// {
//   bici: 2,
//   coche: 2,
//   balón: 1,
//   peluche: 1
// }
