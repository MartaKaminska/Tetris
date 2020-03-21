import { clearBoard, newBoardWithBrick } from '../function/boardWithBrick';

describe('board with brick', () => {
	it('clear board', () => {
		const w = 4;
		const h = 6;
		const board = [ ['','','',''],
						['','T','T','T'],
						['','','T',''],
						['','','',''],
						['','','',''],
						['','','','']];
		clearBoard(board, w, h);
		const expectedBoard = [ ['','','',''],
								['','','',''],
								['','','',''],
								['','','',''],
								['','','',''],
								['','','','']];
		expect(board).to.deep.equal(expectedBoard);
	});
	it('print board with brick', () => {
		const board = [ ['','','',''],
						['','','',''],
						['','','',''],
						['','','',''],
						['','','',''],
						['','','','']];
		const brick = { 
						x: 0,
						y: 0,
						shape: [ ['T','T','T'],
								['','T',''],
								['','','']]
						};
		newBoardWithBrick(board, brick);
		const expectedBoard = [ ['T','T','T',''],
								['','T','',''],
								['','','',''],
								['','','',''],
								['','','',''],
								['','','','']];
		expect(board).to.deep.equal(expectedBoard);
	});
});