
// array of all tetrims
export const Tetrims = {
	0: {shape: [[0]]}, 
	I: {shape: [
				[0, 0,  'I',  0, 0],
				[0, 0, 'I', 0, 0],
				[0, 0, 'I', 0, 0],
				[0, 0, 'I', 0, 0],
				[0, 0, 0, 0, 0]]},
	J: {shape: [[0, 'J', 0],
				[0, 'J', 0],
				['J', 'J', 0]]},
	L: {shape: [[0, 'L', 0],
				[0, 'L', 0],
				[0, 'L', 'L']]},
	O: {shape: [['O', 'O'],
				['O', 'O']]},
	S: {shape: [[0, 'S', 'S'],
				['S', 'S', 0],
				[0, 0, 0]
				]},
	T: {shape: [['T', 'T', 'T'],
				[0, 'T', 0],
				[0, 0, 0],
				]},
	Z: {shape: [['Z', 'Z', 0],
				[0, 'Z', 'Z'],
				[0, 0, 0]
				]},
};

// random and return one tetrim
export const randomTetrims = (width) => {
	const tetrimsList = 'IJLOSTZ';
	const randomTetrimEle = tetrimsList[Math.floor(Math.random() * tetrimsList.length)];

	// setting start position
	let tetrim = Tetrims[randomTetrimEle];
	tetrim.x = width/2 - 2;
	tetrim.y = 0;

	 return tetrim;
	//return Tetrims['O']
}