import React, { Component } from 'react';

// style
import { StyledTetrisWrapper, StyledTetrisGame } from './style/StyleTetrisGame';

// components
import Stage from './Stage';

// function
import { boardWithBrick } from '../function/boardWithBrick';
import { canAddBrick, canMoveBrick } from '../function/moveDownBrick';
import { moveBrick } from '../function/updateBrickPos';

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
				shape: Tetrims.Z.shape
			}
		}
	}

	// drawing an empty board
	startArray = () => {
		let stageArray = [];
		let h = this.props.h;
		while (h--) {
		stageArray.push(new Array(this.props.w).fill(''))
		}
		return stageArray;
	}

	// check if move (left-right/ interval) is possible
	checkPos = (dir) => {
		let canAdd = canAddBrick(this.state.board, this.state.brick, this.props.w, this.props.h, dir);

		if(canAdd === 'true'){
			this.setState ({
				brick: {
					...this.state.brick,
					y: this.state.brick.y + 1,
					x: this.state.brick.x + dir
				}
			})
			this.setState ({
				board: boardWithBrick(this.state.board, this.state.brick, this.props.w, this.props.h)
			});
		} else if (canAdd === 'falseDown' || canAdd === 'falseDownLeft' || canAdd === 'falseDownRight') {
			this.setState ({ 
				board: canMoveBrick(this.state.board, this.state.brick)
			});
			this.setState({
				brick: {
					y: 1,
					x: this.props.w/ 2 - 2,
					rot: 0,
					shape: Tetrims.L.shape
					// shape: randomTetrims().shape
				}
			});
		} else if (canAdd === 'falseWallLeft') {
			this.setState({
				brick: {
					...this.state.brick,
					// y: this.state.brick.y + 1,
					x: (this.state.brick.shape === Tetrims.L.shape || this.state.brick.shape === Tetrims.J.shape || this.state.brick.shape === Tetrims.I.shape) ? -1 : 0
				}
			})
			// this.setState ({
			// 	board: boardWithBrick(this.state.board, this.state.brick, this.props.w, this.props.h)
			// });
			console.log('canAddBrick - falseWall-left')
		} else if (canAdd === 'falseWallRight') {
			this.setState({
				brick: {
					...this.state.brick,
					// y: this.state.brick.y + 1,
					x: (this.state.brick.shape === Tetrims.I.shape) ? (this.props.w-4) : (this.props.w-3)
				}
			})
			this.setState ({
					board: boardWithBrick(this.state.board, this.state.brick, this.props.w, this.props.h)
				});
				console.log('canAddBrick - falseWall-right', this.state.brick)
		} ;
	} 

	// move (left-right)
	checkMoveBrick = dir => {
		this.checkPos(dir);
		console.log('checkMoveBrick', this.state.brick)		
	};

	// fall acceleration
	dropBrick = () => {
		if(canAddBrick(this.state.board, this.state.brick, this.props.w, this.props.h, 0) === 'true'){
			this.setState ({
				brick: {
					...this.state.brick,
					y: this.state.brick.y + 1
				}
			})
			this.setState ({
				board: boardWithBrick(this.state.board, this.state.brick, this.props.w, this.props.h)
			});
		}
	}

	// pass keyCode to move
	moveBrick = e => {
		console.log(e.keyCode)
		if(e.keyCode === 37) {
			this.checkMoveBrick(-1);
		} else if(e.keyCode === 39) {
			this.checkMoveBrick(+1);
		} else if(e.keyCode === 40) {
			this.dropBrick();
		} else if(e.keyCode === 38) {
			playerRotate(this.state.board, this.state.brick);
		}
	};
	
	// starting game, set interval and checking collision
	startGame = () => {
		this.setIntervalId = setInterval(() => {
			this.checkPos(0);
		}, 500);
	}

	render() {
		return (
			<StyledTetrisWrapper onKeyDown={(e) => this.moveBrick(e)}>
				<StyledTetrisGame >
					<Stage  board={this.state.board} />
				</StyledTetrisGame>
				<button onClick={this.startGame}>Start Game</button>
			</StyledTetrisWrapper>
		)
	}
};

	// rotate brick
const playerRotate = (board, brick) => {
		console.log(board, brick)
}



export default TetrisGame;