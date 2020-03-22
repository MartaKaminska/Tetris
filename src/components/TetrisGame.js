import React, { Component } from 'react';

// style framework
import { Icon } from 'semantic-ui-react';

// components
import Stage from './Stage';
import Scorelist from './Scorelist';
import Manual from './Manual';

// function
import { boardWithBrick } from '../function/boardWithBrick';
import { canAddBrick, canMoveBrick } from '../function/moveDownBrick';
import { rotateMatrix } from '../function/brickRotate';
import { collapseRow } from '../function/collapsRow';
import { setLocalStorage } from '../function/localStorage';
import { speedUp } from '../function/speedUp';

// elements (bricks/ tetrims)
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
			score: 0,
			gameOver: false
		}
	}

	//focus on key action
	componentDidMount = () => {
		document.body.addEventListener('keydown', e => this.moveBrick(e));
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
	changePos = dir => {
		if(this.state.gameOver === false) {
			// checking if there are line to remove
			if (this.state.mode === 'shouldRemove') {
				let [newBoard, shouldRemove] = collapseRow(this.state.board, this.props.w, this.props.h);

				//remove line
				if (shouldRemove) {
					this.setState({
						board: newBoard,
						brick: {}, 
						rot: 0,
						mode: 'shouldRemove',
						score: this.state.score + 1 
					});
					//check if set new interval and set new interval
					if(this.state.score % 10 === 0) { 
						clearInterval(this.setIntervalId);
						this.setIntervalId = setInterval(() => {
							this.changePos(0);
						}, speedUp(this.state.score)) 
					};
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
			
			// deep copy of brick 
			let brickClone = JSON.parse(JSON.stringify(this.state.brick));

			// rotate brick when requested
			if (this.state.rot === 1) {
				rotateMatrix(brickClone);
			}

			// checking if rotation is possible
			let [canAdd, newDir] = canAddBrick(this.state.board, brickClone, this.props.w, this.props.h, dir);
		
			// if rotation is not available
			if (this.state.rot === 1 && canAdd === 'false') {
				[canAdd, newDir] = canAddBrick(this.state.board, this.state.brick, this.props.w, this.props.h, dir);
				brickClone = this.state.brick;
			}

			// uppre collision with top board = game over 
			if(canAdd === 'false' && brickClone.y < 1) {
				this.gameOver();
				return;
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

				// checking if there are line to remove
				[newBoard, shouldRemove] = collapseRow(newBoard, this.props.w, this.props.h);

				// remove line
				if (shouldRemove) {
					this.setState({
						board: newBoard,
						brick: {},
						rot: 0,
						mode: 'shouldRemove',
						score: this.state.score + 1
					});
					//check if set new interval and set new interval
					if(this.state.score % 10 === 0) { 
						clearInterval(this.setIntervalId);
						this.setIntervalId = setInterval(() => {
							this.changePos(0);
						}, speedUp(this.state.score)) 
					};
					return;
				}

				// random new brick
				let newTetrim = randomTetrims(this.props.w);

				// next board state with new brick
				this.setState ({
					board: boardWithBrick(newBoard, newTetrim, this.props.w, this.props.h),
					brick : newTetrim,
					rot: 0,
					mode : 'normal'
				});
			} 
		}
	} 

	// move (left-right)
	checkMoveBrick = dir => {
		// pass direction to changePos
		this.changePos(dir);
	};

	// acceleration
	dropBrick = () => {
		this.changePos(0);
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

	// right move for mobile
	rightButton = () => {
		this.checkMoveBrick(1)
	}

	// left move for mobile
	leftButton = () => {
		this.checkMoveBrick(-1)
	}
	
	// starting game, set interval and checking collision
	startGame = () => {
		this.setState ({
			board: this.startArray(),
			brick: {
				x: this.props.w/2 - 2,
				y: -1,
				shape: randomTetrims(this.props.w).shape
			},
			rot: 0,
			mode: 'normal',
			score: 0,
			gameOver: false
		});

		this.setIntervalId = setInterval(() => {
			this.changePos(0);
		}, 800)
	};

	// end game
	gameOver = () => {
		clearInterval(this.setIntervalId);

		// saving new result list to localStorage
		localStorage.setItem('score', setLocalStorage(localStorage.getItem('score'), this.state.score));
		
		this.setState ({
			brick: {},
			gameOver: true
		})
	};

	// startin game after gameOver
	startGameAgain = () => {
		this.setState ({
			board: this.startArray(),
			brick: {
				x: this.props.w/2 - 2,
				y: -1,
				shape: randomTetrims(this.props.w).shape
			},
			rot: 0,
			mode: 'normal',
			score: 0,
			gameOver: false
		});

		this.startGame()
	}

	render() {
		return (
			<div>{!this.state.gameOver ? 
				<div className='tetrisWrapper' style={{backgroundImage:'url("../public/img/game.png")'}}>
					<div className='header'><span>Teris</span>Game</div>
					<div className='tetrisGame'>
						<div className='operationSide'>
							<Manual />
							<button className='startButton' onClick={this.startGame}>Start Game</button>
							<div className='scoreDiv'>Score: {this.state.score}</div>
						</div>
						<Stage className='gameBoard' board={this.state.board} />
					</div>
					<div className='gameButtons'>
						<div className='buttonGroup'>
							<button onClick={this.leftButton}><Icon size='big' name='arrow left'/></button>
							<button onClick={this.rightButton}><Icon size='big' name='arrow right'/></button>
						</div>
						<div className='buttonGroup'>
							<button onClick={this.rotateBrick}><Icon size='big' name='undo'/></button>
							<button onClick={this.dropBrick}><Icon size='big' name='arrow down'/></button>
						</div>
					</div>
				</div> : 
				<div style={{backgroundImage:'url("../public/img/game.png")'}} className='gameOver'>
					<h1>GAME OVER</h1>
					<p>Play again ...</p>
					<div className='endButton'>
						<button onClick={this.startGameAgain} >YES</button>
					</div>
					<Scorelist score={localStorage.getItem('score')}/>
				</div>}
			</div>
		);
	};
};