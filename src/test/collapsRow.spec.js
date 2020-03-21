import { collapseRow } from '../function/collapsRow';

describe('collapse row', () => {
	it('when there is not a complete line', () => {
		const w = 4;
		const h = 6;
		const board = [ ['','','',''],
						['','T','T','T'],
						['','','T',''],
						['','','',''],
						['','','',''],
						['','A','A','A']];
		const newBoard = collapseRow(board, w, h);
		const expectedBoard = [ [ ['','','',''],
								['','T','T','T'],
								['','','T',''],
								['','','',''],
								['','','',''],
								['','A','A','A']], false];
		expect(newBoard).to.deep.equal(expectedBoard);
	});
	it('when there is not a complete line', () => {
		const w = 4;
		const h = 6;
		const board = [ ['','','',''],
						['','','',''],
						['','','',''],
						['A','','',''],
						['A','A','',''],
						['A','A','A','A']];
		const newBoard = collapseRow(board, w, h);
		const expectedBoard = 	[ [ ['','','',''],
								['','','',''],
								['','','',''],
								['','','',''],
								['A','','',''],
								['A','A','','']], true];
		expect(newBoard).to.deep.equal(expectedBoard);
	});
});