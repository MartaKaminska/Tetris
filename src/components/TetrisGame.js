import React, { Component } from 'react';

// style
import { StyledTetrisWrapper, StyledTetrisGame } from './style/StyleTetrisGame';

// components
import Stage from './Stage';

// function
import { boardWithBrick } from '../function/boardWithBrick';
import { canAddBrick, canMoveBrick } from '../function/moveDownBrick';
import { rotateMatrix } from '../function/brickRotate';
import { collapseRow } from '../function/collapsRow';

import { Tetrims, randomTetrims } from '../tetrims';

export default class TetrisGame extends Component {
	constructor(props) {
		super(props);
		this.state = {
			board: this.startArray(),
			brick: {
				x: this.props.w/2 - 2,
				y: -1,
				shape: randomTetrims(this.props.w).shape
			},
			rot: 0,
			mode: 'normal',
			score: 0
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

	// move tetrim and change state board and tetrim
	changePos = (dir) => {
		if (this.state.mode === 'shouldRemove') {
			let [newBoard, shouldRemove] = collapseRow(this.state.board, this.props.w, this.props.h);
			if (shouldRemove) {
				this.setState({
					board: newBoard,
					brick: {}, 
					rot: 0,
					mode: 'shouldRemove',
					score: this.state.score+1
				});
			} else {
				let newTetrim = randomTetrims(this.props.w);
				this.setState({
					board: newBoard,
					brick : newTetrim,
					rot: 0,
					mode: 'normal'
				});
			}
			return;		
		}

		let brickClone = JSON.parse(JSON.stringify(this.state.brick));

		// rotate brick when requested
		if (this.state.rot === 1) {
			rotateMatrix(brickClone);
		}

		let [canAdd, newDir] = canAddBrick(this.state.board, brickClone, this.props.w, this.props.h, dir);
	
		// if rotation is not available
		if (this.state.rot === 1 && canAdd === 'false') {
			[canAdd, newDir]  = canAddBrick(this.state.board, this.state.brick, this.props.w, this.props.h, dir);
			brickClone = this.state.brick;
		}

		// move brick
		if(canAdd === 'true') {
			brickClone.y +=1;
			brickClone.x += newDir;

			// set new state with board and brick
			this.setState ({
				board: boardWithBrick(this.state.board, brickClone, this.props.w, this.props.h),
				brick : brickClone,
				rot: 0,
				mode: 'normal'
			});

		} else {

			let brickToPaint = this.state.brick;
			let newBoard = canMoveBrick(this.state.board, brickToPaint);
			let shouldRemove = false;

			// clear line
			[newBoard, shouldRemove] = collapseRow(newBoard, this.props.w, this.props.h);

			if (shouldRemove) {
				this.setState({
					board: newBoard,
					brick: {},
					rot: 0,
					mode: 'shouldRemove',
					score: this.state.score + 1
				});
				return;
			}
			

			// random new brick
			let newTetrim = randomTetrims(this.props.w);
			// let newTetrim = this.state.brick;

			// nex board state with new brick
			this.setState ({
				board: boardWithBrick(newBoard, newTetrim, this.props.w, this.props.h),
				brick : newTetrim,
				rot: 0,
				mode : 'normal'
			});
		} 
	} 

	// move (left-right)
	checkMoveBrick = dir => {
		// pass direction to changePos
		this.changePos(dir, 0);
	};

	// acceleration
	dropBrick = () => {
		this.changePos(0, 0);
	};

	// brick rotation
	rotateBrick = () => {
		// pass rotation to changePos
		this.setState ({
			rot: 1
		});
	};

	// pass keyCode to move
	moveBrick = e => {
		// console.log(e.keyCode)
		if(e.keyCode === 37) {
			this.checkMoveBrick(-1);
		} else if(e.keyCode === 39) {
			this.checkMoveBrick(+1);
		} else if(e.keyCode === 40) {
			this.dropBrick();
		} else if(e.keyCode === 38) {
			this.rotateBrick()		
		}
	};
	
	// starting game, set interval and checking collision
	startGame = () => {
		this.setIntervalId = setInterval(() => {
			this.changePos(0, 0);
		}, 400);
	};

	render() {
		return (
			<StyledTetrisWrapper onKeyDown={(e) => this.moveBrick(e)}>
				<StyledTetrisGame >
					<Stage board={this.state.board} />
					<div className='opperationSide'>
						<button className='startButton' onClick={this.startGame}>Start Game</button>
						<div className='score'>{`Score: ${this.state.score}`}</div>
					</div>
					
				</StyledTetrisGame>
				
			</StyledTetrisWrapper>
		);
	};
};