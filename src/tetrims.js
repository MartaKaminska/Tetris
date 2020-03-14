export const Tetrims = {
	0: {shape: [[0]], 
		color: '12, 14, 11'},
	I: {shape: [[0, 'I', 0, 0],
				[0, 'I', 0, 0],
				[0, 'I', 0, 0],
				[0, 'I', 0, 0]],
		color: '63, 153, 51'},
	J: {shape: [[0, 0, 'J'],
				[0, 0, 'J'],
				[0, 'J', 'J']],
		color: '189, 188, 148'},
	L: {shape: [[0, 'L', 0],
				[0, 'L', 0],
				[0, 'L', 'L']],
		color: '0, 76, 97'},
	O: {shape: [['O', 'O'],
				['O', 'O']],
		color: '48, 8, 104'},
	S: {shape: [[0, 'S', 'S'],
				['S', 'S', 0],
				[0, 0, 0]
				],
		color: '48, 8, 104'},
	T: {shape: [['T', 'T', 'T'],
				[0, 'T', 0],
				[0, 0, 0]
				],
		color: '206, 128, 255'},
	Z: {shape: [['Z', 'Z', 0],
				[0, 'Z', 'Z'],
				[0, 0, 0]
				],
		color: '184, 67, 12'},
};

export const randomTetrims = () => {
	const tetrimsList = 'IJLOSTZ';
	const randomTetrimEle = tetrimsList[Math.floor(Math.random() * tetrimsList.length)];

	return Tetrims[randomTetrimEle]
}