import React from 'react';

export const canAddBrick = (board, brick, w, h) => {
	if(brick) {
		const copy = board.map(row => [...row]);
		const brickY = brick.shape[0].length;
		
		for(let i=0; i < brickY; i++){
			for(let j=0; j < brickY; j++) {
				if(brick.shape[i][j] !== 0) {
					if((copy[brick.y+1+i][brick.x+j] === 'A')) {
						console.log('false 1')
						return false;

					} else if ((brick.y+i) > h-1 || (brick.x+j) < 0 || (brick.x+j) > w-1) {
						console.log('false 2')
						return false;
					} 
				}
			}
		}
		return true;
	};
};

export const canMoveBrick = (board, brick) => {
	const copy = board.map(row => [...row]);
	const brickY = brick.shape[0].length;

	for(let i=0; i < brickY; i++){
		for(let j=0; j < brickY; j++) {
			if(brick.shape[i][j] !== 0) {
				if(copy[brick.y+1+i][brick.x+j] === 'A') {
					for(let a=0; a < brickY; a++){
						for(let b=0; b < brickY; b++) {
							if(brick.shape[a][b] !== 0) {
								copy[brick.y+a][brick.x+b] = 'A'
							};
						};
					};
				};
			};
		};
	};
	return copy;
};
