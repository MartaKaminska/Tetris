import React from "react";

function Stage(props) {
	console.log('Stage', props.board)
	return (
		<div className='stage'>
			{props.board.map((row, y) => 
			<div className='row' key={y} >
				{row.map((cell, x) => 
					<div key={x} className={'cell ' + cell}></div>
					)}
				</div>)}
		</div>
	)
};

export default Stage;