export const boardWithBrick = (board, brick, w, h) => {
	const copyBoard = board.map(row => [...row]);

	// clear board
	clearBoard(copyBoard, w, h);
	
	// draw new brick on board
	newBoardWithBrick(copyBoard, brick)

	return copyBoard;
};

// export for test
export const clearBoard = (board, w, h) => {
	for(let l = 0; l < h; l++) {
		for(let k = 0; k < w; k++) {
			if(board[l][k] !== 'A') {
				board[l][k] = '';
			};
		};
	};
};

// export for test
export const newBoardWithBrick = (board, brick) => {
	const brickLength = brick.shape[0].length;
	
	for(let i = 0; i < brickLength; i++){
		for(let j = 0 ; j < brickLength; j++) {
			if(brick.shape[i][j] !== 0) {
				board[brick.y+i][brick.x+j] = brick.shape[i][j]
			}
		}
	}
}

