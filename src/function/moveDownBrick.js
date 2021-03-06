// collision check down and side 
export const canAddBrick = (board, brick, w, h, dir) => {
	if(brick) {
		const copyBoard = board.map(row => [...row]);
		const brickLength = brick.shape[0].length;

		// checking down collision with bottom board and side collision for current dir
		for(let i=0; i < brickLength; i++ ) {
			for(let j=0; j < brickLength; j++) { 
				if(brick.shape[i][j] !== 0) {
					
					// down collision with bottom board
					if (brick.y+1+i === h) {
						return ['false', 0];
					}
					
					// check side collision for current dir
					if ((brick.x + j + dir) < 0 || (brick.x + j + dir) > w-1 || copyBoard[brick.y+i+1][brick.x + j 	+ dir] === "A") {
						// if collision clear dir
						dir = 0;
					}
				}
			}
		}

		// check collision with bottom brick and walls
		for(let i=0; i < brickLength; i++ ){
			for(let j=0; j < brickLength; j++) {
				if(brick.shape[i][j] !== 0) {
					if(copyBoard[brick.y+1+i][brick.x+j+dir] === 'A' || (brick.x + j + dir) < 0 || (brick.x + j + dir) > w-1) {
							return ['false', dir];
					}
				}
			}
		}
		return ['true', dir];
	};
};

// add tetrim to board
export const canMoveBrick = (board, brick) => {
	const copyBoard = board.map(row => [...row]);
	const brickY = brick.shape[0].length;

	for(let i=0; i < brickY; i++){
		for(let j=0; j < brickY; j++) {
			if(brick.shape[i][j] !== 0) {
				copyBoard[brick.y+i][brick.x+j] ='A'
			};
		};
	};

	// return new board with tetrim
	return copyBoard;
};