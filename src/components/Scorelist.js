import React from "react";

function Scorelist(props) {
	// getting scorelist from local storage
	let scorelist = JSON.parse(props.score);
	
	return (
		<div className='scoreResult'>
			<ol>Top 20 results
				{/* display top 20 results with dates  */}
				{scorelist.map((element, index) => {
					return <li key={index}>{`Score: ${element.scoreValue} / date: ${element.day}/${element.month}/${element.year}`}</li>
				})}
			</ol>
		</div>
	)
};

export default Scorelist;