import styled from 'styled-components';

export const StyledCell = styled.div`
	width: auto;
	border: 1px solid #777;
	background-color: rgba(${props => props.color})
`

export const StyledStage = styled.div`
	display: grid;
	grid-template-rows: repeat(${props => props.height}, calc(25vw/ ${props => props.width}));
	grid-template-columns: repeat(${props => props.width}, 1fr);
	// grid-gap: 1px;
	border: 1px solid #000;
	width: 100%;
	max-width: 25vw;
`