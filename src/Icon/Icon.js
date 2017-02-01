import React from 'react';

let Icon = function statelessFunctionComponentClass(props) {
	let source = require('../../graphics/icon.png');

	let style = {
		display: props.show ? 'block' : 'none',
		position: 'absolute',
		left: props.left,
		top: props.top,
		width: props.width
	}

	return (
		<img
			src={source}
			style={style}
			alt="Figure"
			className="Icon"
		/>
	);
};

export default Icon;