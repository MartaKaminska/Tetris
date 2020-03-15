
// collision check down and side 
export const canAddBrick = (board, brick, w, h, dir) => {
	if(brick) {
		const copy = board.map(row => [...row]);
		const brickY = brick.shape[0].length;

		for(let i=0; i < brickY; i++){
			for(let j=0; j < brickY; j++) {
				if(brick.shape[i][j] !== 0) {
					if((copy[brick.y+1+i][brick.x+dir+j] === 'A' || copy[brick.y+brickY-1] === copy[h-1]) && ((brick.x+j) < 0)) {
						console.log('falseDown-left')
						return 'falseDownLeft';
					} else if((copy[brick.y+1+i][brick.x+dir+j] === 'A' || copy[brick.y+brickY-1] === copy[h-1]) && ((brick.x+j) > w-1)) {
						console.log('falseDown-right')
						return 'falseDownRight';
					} else 
					if(copy[brick.y+1+i][brick.x+j] === 'A' || copy[brick.y+brickY-1] === copy[h-1]) {
							console.log('falseDown')
							return 'falseDown';
					} else if (((brick.x+j) < 0) || (copy[brick.y+i][brick.x+j] === 'A')) {
						console.log('falseWall-left', brick.x+j)
						console.log('falseWall-left', brick)
						return 'falseWallLeft';
					} else if (((brick.x+j) > w-1) || (copy[brick.y+i][brick.x+j] === 'A')) {
						console.log('falseWall-right')
						return 'falseWallRight';
					}
				}
			}
		}
		console.log('canAddBrick', brick);
		return 'true';
	};
};

// changes tetris the position on a permanent
export const canMoveBrick = (board, brick) => {
	const copy = board.map(row => [...row]);
	const brickY = brick.shape[0].length;

	
	for(let i=0; i < brickY; i++){
		for(let j=0; j < brickY; j++) {
			if(brick.shape[i][j] !== 0) {
				copy[brick.y+i][brick.x+j] ='A'
			};
		};
	};
	console.log('canMoveBrick', brick)
	return copy;
};

export const wallCollision = (board, brick) => {
	const copy = board.map(row => [...row]);
	const brickY = brick.shape[0].length;

	// console.log()

	// for(let i=0; i < brickY; i++){
	// 	for(let j=0; j < brickY; j++) {
	// 		if(brick.shape[i][j] !== 0) {
	// 			copy[brick.y+i][brick.x+j] ='A'
	// 		};
	// 	};
	// };
	return false;
}
