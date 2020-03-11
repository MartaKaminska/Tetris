import React, { Component } from 'react';

// style
import { StyledTetrisGame } from './style/StyleTetrisGame';

// components
import Stage from './Stage';

// function
import { boardWithBrick } from '../function/boardWithBrick';
import { canAddBrick, canMoveBrick } from '../function/moveBrick';
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
				shape: randomTetrims().shape,
				collided: false
			}
		}
	}

	startArray = () => {
		let stageArray = [];
		let h = this.props.h;
		while (h--) {
		stageArray.push(new Array(this.props.w).fill('').map((x, i) => i <= h ? '' : 'A'))
		}
		return stageArray;
	}
		
	startGame = () => {
		this.setIntervalId = setInterval(() => {
			
			if(canAddBrick(this.state.board, this.state.brick, this.props.x, this.props.y)){
				this.setState ({
					brick: {
						...this.state.brick,
						y: this.state.brick.y + 1
					}
				})

				this.setState ({
					board: boardWithBrick(this.state.board, 	this.state.brick)
				});

				this.setState ({ 
					board: canMoveBrick(this.state.board, 	this.state.brick)
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

	// checkMoveBrick = dir => {
	// 	const [board, brick] = this.state;
	// 	if(canAddBrick(board, brick)) {
	// 		this.setState ({
	// 			brick: {
	// 				...this.state.brick,
	// 				x: dir
	// 			}
	// 		});
	// 	};			
	// };

	// dropBrick = () => {
	// 	const [board, brick] = this.state;
	// 	if(canAddBrick(board, brick)) {
	// 		this.setState ({
	// 			brick: {
	// 				...this.state.brick,
	// 				y: this.state.y ++
	// 			}
	// 		});
	// 	};			
	// }

	// moveBrick = ({ keyCode}) => {
		// if(!gameOver) {
			// console.log('moveBrick')
			// if(keyCode === 37) {
			// 	this.checkMoveBrick(-1);
			// } else if(keyCode === 39) {
			// 	this.checkMoveBrick(1);
			// } else if(keyCode === 40) {
			// 	this.dropBrick();
			// } else if(keyCode === 38) {
			// 	playerRotate(stage, 1);
			// }
		// }
	// };

	render() {
		return (
			<StyledTetrisGame >
				<Stage board={this.state.board} allowed={true}/>
				<button onClick={this.startGame}>Start Game</button>
			</StyledTetrisGame>
		)
	}
};



export default TetrisGame;