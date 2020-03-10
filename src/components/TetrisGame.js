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
			brick: {
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
		console.log('game start')

		this.moveBrick()
	}
		
	moveBrick = () => {
		console.log('update')
		this.setIntervalId = setInterval(() => {
			
			if(canAddBrick(this.state.board, this.state.brick, this.props.x, this.props.y)){
				this.setState ({
					brick: {
						...this.state.brick
					}
				})

				this.setState ({
					board: boardWithBrick(this.state.board, 	this.state.brick)
				});
			} else {
				this.setState({
					brick: {
						y: 1,
						x: this.props.w/ 2 - 2,
						rot: 0,
						shape: randomTetrims().shape
					}
				})
			};

		}, 500);
	}

	render() {
		return (
			<StyledTetrisGame>
				<Stage board={this.state.board} allowed={true}/>
				<button onClick={this.startGame}>Start Game</button>
			</StyledTetrisGame>
		)
	}
};



export default TetrisGame;