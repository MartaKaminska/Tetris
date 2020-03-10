import React from 'react';

export const updateBrickPos = (board, brick) => {
	const copy = board.map(row => [...row]);
	const brickY = brick.shape[0].length
	
	this.setIntervalId = setIntervalId(() => {
		for(let i=0; i < brickY; i++){
			for(let j=0; j < brickY; j++) {
				if(brick.shape[i][j] !== 0) {
					if(copy[brick.y+i][brick.x+j]) {
						return false;
					} else if(
						(brick.y+i) > 20 || (brick.x+j) < 0 || (brick.x+j) > 11) {
						return false;
					} 
				}
			}
		}
	}, 1000)

	
}