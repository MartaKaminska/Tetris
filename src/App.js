import React, { Component } from "react";
import TetrisGame from './components/TetrisGame';

export const stageWidth = 12;
export const stageHeight = 20;

class App extends Component {
	render() {
		return <TetrisGame w={stageWidth} h={stageHeight}/>
	}
}

export default App;