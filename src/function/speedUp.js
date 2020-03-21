export const speedUp = (score) => {
	if(score < 60) {
		return 800 - (score/10) * 100;
	} else {
		return 300;
	}
};
