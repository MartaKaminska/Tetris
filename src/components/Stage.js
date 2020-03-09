import React, {Component} from "react";

function Stage(props) {

		return (
			<div className={'stage ' + (props.allowed ? 'allowed' : '')}>
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