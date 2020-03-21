// removes the full line and adds new ones at the beginning
export const collapseRow = (board, w, h) => {
	const copyBoard = board.map(row => [...row]);
	let counter = 0;
	for(let i=0; i < h; i++) {
		counter = 0;
		for(let j=0; j < w; j++) {
			if (copyBoard[i][j] === 'A') {
				counter++;	
			}			
		}
		if(counter === w) {
			copyBoard.splice(i,1);
			copyBoard.unshift(new Array(w).fill(''));
			return [copyBoard, true];
		}
	}
	return [copyBoard, false];
};