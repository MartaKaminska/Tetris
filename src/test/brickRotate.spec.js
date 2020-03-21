import { rotateMatrix } from '../function/brickRotate';

describe('brick rotate', () => {
	it('matrix rotate', () => {
		const brick = { 
						x: 0,
						y: 0,
						shape: [ ['T','T','T'],
								['','T',''],
								['','','']]
					}
		rotateMatrix(brick);
		const expectedBrick = { 
								x: 0,
								y: 0,
								shape: [ ['','','T'],
										['','T','T'],
										['','','T']]
		}
		expect(brick).to.deep.equal(expectedBrick);
	});
});