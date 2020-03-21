export const setLocalStorage = (storage, newScore) => {
	let scorelist = [];
	let date = new Date;
	
	// pattern element for local storage
	let scoreAndDate = {
		'scoreValue': newScore,
		'day': date.getDate(),
		'month': date.getMonth(),
		'year': date.getFullYear()
	}

	if(storage != null) {
		// adding new element if local storage isn't empty
		scorelist = JSON.parse(storage);
		scorelist.push(scoreAndDate);

		// sorting elements in array by score value
		scorelist.sort((a, b) => {
			let x = a.scoreValue;
			let	y = b.scoreValue;
			
			return ((x < y) ? -1 : ((x > y ) ? 1 : 0))
		});

		// reversing sorted array and getting 20 best results
		let sortedList = scorelist.reverse().slice(0,20)
		return JSON.stringify(sortedList);

	} else {
		// adding new element if local storage is empty
		scorelist.push(scoreAndDate);

		scorelist.sort((a, b) => {
			let x = a.scoreValue;
			let	y = b.scoreValue;
			
			return ((x < y) ? -1 : ((x > y ) ? 1 : 0))
		});

		// reversing sorted array and getting 20 best results
		let sortedList = scorelist.reverse().slice(0,20)
		return JSON.stringify(sortedList);
	};
};
	
