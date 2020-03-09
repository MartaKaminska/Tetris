import React from 'react';


export function boardWithBrick(board, brick) {
	const copy = board.map(row => [...row]);
	const brickY = brick.shape[0].length
	console.log(brickY, brick.shape)

	for(let i=0; i < brickY; i++){
		for(let j=0; j < brickY; j++) {
			if(brick.shape[i][j] !== 0) {
				copy[brick.y+i][brick.x+j] = brick.shape[i][j]
			}
		}
	}
	
	return copy;
};

