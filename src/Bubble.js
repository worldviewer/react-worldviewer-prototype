import React from 'react';

let Bubble = function statelessFunctionComponentClass(props) {
	let source = require('../graphics/' + props.source);

	let style = {
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
			className={"Bubble " + props.source.split('.')[0]}
		/>
	);
};

export default Bubble;
