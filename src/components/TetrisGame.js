import React, { Component } from 'react';

// style
import { StyledTetrisGame } from './style/StyleTetrisGame';

// components
import Stage from './Stage';

// function
import { boardWithBrick } from '../function/boardWithBrick';
import { canAddBrick } from '../function/canAddBrick';
import { updateBrickPos } from '../function/updateBrickPos';

import { Tetrims, randomTetrims } from '../tetrims';

class TetrisGame extends Component {
	constructor(props) {
		super(props);
		this.state = {
			board: this.startArray(),
			tetrim: {
				y: 1,
				x: this.props.w/ 2 - 2,
				rot: 0,
				shape: randomTetrims().shape
			}
		}
	}

	startArray = () => {
		let stageArray = [];
		let h = this.props.h;
		while (h--) {
		stageArray.push(new Array(this.props.w).fill('').map((x, i) => i <= h ? '' : 'J'))
		}
		return stageArray;
	}

	startGame = () => {
		
		updateBrickPos(this.state.board, this.state.tetrim)
	}

	render() {
		return (
			<StyledTetrisGame>
				<Stage allowed={ canAddBrick(this.state.board, this.state.tetrim) }
				 board={boardWithBrick(this.state.board, this.state.tetrim)}/>
				<button onClick={this.startGame}>Start Game</button>
			</StyledTetrisGame>
		)
	}
};



export default TetrisGame;