import React from "react";
import { Icon } from 'semantic-ui-react';

function Manual() {
	return <div className='manualBox'>
		<div className='undo'>
			<Icon size='small' name='undo'/>
		</div>
		<div className='arrows'>
			<div><Icon size='small' name='arrow left'/></div>
			<div><Icon size='small' name='arrow down'/></div>
			<div><Icon size='small' name='arrow right'/></div>
		</div>
	</div>
};

export default Manual;