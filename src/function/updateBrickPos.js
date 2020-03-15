
export const moveBrick = e => {
	console.log(e.keyCode)
	if(e.keyCode === 37) {
		return -1;
	} else if(e.keyCode === 39) {
		return +1;
	} 
	// else if(e.keyCode === 40) {
	// 	this.dropBrick();
	// } else if(e.keyCode === 38) {
	// 	playerRotate(stage, 1);
	// }
};