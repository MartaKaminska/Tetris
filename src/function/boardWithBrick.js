
export const boardWithBrick = (board, brick, w, h) => {
	const copyBoard = board.map(row => [...row]);
	const brickY = brick.shape[0].length;

	// clear board
	for(let l = 0; l < h; l++) {
		for(let k = 0; k < w; k++) {
			if(copyBoard[l][k] !== 'A') {
				copyBoard[l][k] = '';
			}
		}
	}
	
	// draw new brick on board
	for(let i = 0; i < brickY; i++){
		for(let j = 0 ; j < brickY; j++) {
			if(brick.shape[i][j] !== 0) {
				copyBoard[brick.y+i][brick.x+j] = brick.shape[i][j]
			}
		}
	}
	return copyBoard;
};

