import React, { Component } from 'react';

// style
import { StyledTetrisWrapper, StyledTetrisGame } from './style/StyleTetrisGame';

// components
import Stage from './Stage';

// function
import { boardWithBrick } from '../function/boardWithBrick';
import { canAddBrick, canMoveBrick } from '../function/moveDownBrick';
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
				shape: Tetrims.I.shape
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
	
	// starting game, set interval and checking collision
	startGame = () => {
		this.setIntervalId = setInterval(() => {
			
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
			} else if (canAddBrick(this.state.board, this.state.brick, this.props.w, this.props.h, 0) === 'falseDown') {
				this.setState ({ 
					board: canMoveBrick(this.state.board, this.state.brick)
				});
				this.setState({
					brick: {
						y: 1,
						x: this.props.w/ 2 - 2,
						rot: 0,
						shape: Tetrims.I.shape
						// shape: randomTetrims().shape
					}
				})
			} else if (canAddBrick(this.state.board, this.state.brick, this.props.w, this.props.h, 0) === 'falseWall-left') {
				this.setState({
					brick: {
						...this.state.brick,
						// y: this.state.brick.y + 1,
						x: (this.state.brick.shape === Tetrims.L.shape || this.state.brick.shape === Tetrims.J.shape || this.state.brick.shape === Tetrims.I.shape) ? -1 : 0
					}
				})
				console.log('canAddBrick - falseWall-left', this.state.brick)
				this.setState ({
					board: boardWithBrick(this.state.board, this.state.brick, this.props.w, this.props.h)
				});
			} else if (canAddBrick(this.state.board, this.state.brick, this.props.w, this.props.h, 0) === 'falseWall-right') {
				this.setState({
					brick: {
						...this.state.brick,
						// y: this.state.brick.y + 1,
						x: (this.state.brick.shape === Tetrims.I.shape) ? (this.props.w-2) : (this.props.w-1)
					}
				})
				console.log('canAddBrick - falseWall-left', this.state.brick)
				this.setState ({
					board: boardWithBrick(this.state.board, this.state.brick, this.props.w, this.props.h)
				});
			} ;
		}, 500);
	}

	checkMoveBrick = dir => {
		if(canAddBrick(this.state.board, this.state.brick, this.props.w, this.props.h, dir) === 'true') {
			this.setState ({
				brick: {
					...this.state.brick,
					y: this.state.brick.y + 1,
					x: this.state.brick.x + dir
				}
			});
			this.setState ({
				board: boardWithBrick(this.state.board, this.state.brick, this.props.w, this.props.h)
			});
		};
		console.log('checkMoveBrick', this.state.brick)		
	};

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

	moveBrick = e => {
		console.log(e.keyCode)
		if(e.keyCode === 37) {
			this.checkMoveBrick(-1);
		} else if(e.keyCode === 39) {
			this.checkMoveBrick(+1);
		} else if(e.keyCode === 40) {
			this.dropBrick();
		} else if(e.keyCode === 38) {
			playerRotate(stage, 1);
		}
	};

	render() {
		return (
			<StyledTetrisWrapper onKeyDown={(e) => this.moveBrick(e)}>
				<StyledTetrisGame >
					<Stage  board={this.state.board} allowed={true}/>
				</StyledTetrisGame>
				<button onClick={this.startGame}>Start Game</button>
			</StyledTetrisWrapper>
		)
	}
};



export default TetrisGame;