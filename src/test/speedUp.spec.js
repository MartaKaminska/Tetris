import { speedUp } from '../function/speedUp';

describe('spead up', () => {
	it('first level', () => {
		const score = 0;
		const time = speedUp(score);
		const expected = 800;

		expect(time).to.deep.equal(expected);
	});
	it('second level', () => {
		const score = 10;
		const time = speedUp(score);
		const expected = 700;

		expect(time).to.deep.equal(expected);
	});
	it('third level', () => {
		const score = 20;
		const time = speedUp(score);
		const expected = 600;

		expect(time).to.deep.equal(expected);
	});
	it('fourth level', () => {
		const score = 30;
		const time = speedUp(score);
		const expected = 500;

		expect(time).to.deep.equal(expected);
	});
	it('fifth level', () => {
		const score = 40;
		const time = speedUp(score);
		const expected = 400;

		expect(time).to.deep.equal(expected);
	});
	it('sixth level', () => {
		const score = 50;
		const time = speedUp(score);
		const expected = 300;

		expect(time).to.deep.equal(expected);
	});
	it('sixth level (score = 60)', () => {
		const score = 60;
		const time = speedUp(score);
		const expected = 300;

		expect(time).to.deep.equal(expected);
	});
	it('sixth level (score = 60)', () => {
		const score = 70;
		const time = speedUp(score);
		const expected = 300;

		expect(time).to.deep.equal(expected);
	});
});