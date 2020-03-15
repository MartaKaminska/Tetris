
	// removes the full line and adds new ones at the beginning
	export const collapseRow = (board, width, height) => {
		const copyBoard = board.map(row => [...row]);
		let counter = 0;
		console.log('collapseRow')

		for(let i=0; i < height; i++) {
			counter = 0;
			for(let j=0; j < width; j++) {
				if (copyBoard[i][j] === 'A') {
					counter++;	
				}			
			}
			if(counter === width) {
				copyBoard.splice(i,1);
				copyBoard.unshift(new Array(width).fill(''));
			}
		}

		return copyBoard;
	};