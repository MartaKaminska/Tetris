import React from 'react';

export const canAddBrick = (board, brick, w, h) => {
	if(brick) {
		
		const copy = board.map(row => [...row]);
		const brickY = brick.shape[0].length;
		
		brick.y += 1;
		console.log('canAddBrick', brick);

		for(let i=0; i < brickY; i++){
			for(let j=0; j < brickY; j++) {
				if(brick.shape[i][j] !== 0) {
					if((copy[brick.y+i][brick.x+j] === 'J')) {
						console.log(copy[brick.y+i][brick.x+j])
						copy[brick.y+i][brick.x+j] = 'J';
						console.log(copy[brick.y+i][brick.x+j])
						console.log('false 1')
						return false;
					} else if ((brick.y+i) > h-1 || (brick.x+j) < 0 || (brick.x+j) > w-1) {
						copy[brick.y+i][brick.x+j] = 'J';
						console.log('false 2')
						return false;
					} 
				}
			}
		}
		console.log('true')
		return true;
	}	
}
