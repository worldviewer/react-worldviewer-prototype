import React from 'react';

let Bubble = function statelessFunctionComponentClass(props) {
	let source = require('../graphics/' + props.source);

	let divStyle = {
		left: props.left,
		position: 'absolute',
		top: props.top,
		width: props.width
	};

	console.log('left: ' + props.numleft);
	console.log('top: ' + props.numtop);

	let bubbleNumberStyle = {
		backgroundColor: '#edf5f1',
		borderRadius: '50%',
		height: '3vw',
		left: props.numleft,
		top: props.numtop,
		position: 'absolute',
		width: '3vw'
	};

	let imgStyle = {
		width: '100%'
	};

	let bubbleNumber = props.num;

	return (
		<div style={divStyle}>
			<img
				alt="Figure"
				className={"Bubble" + bubbleNumber}
				src={source}
				style={imgStyle}
			/>

			<div
				alt="Slide Number"
				className="Bubble-Number"
				style={bubbleNumberStyle}
			>
				<p>{bubbleNumber + 1}</p>
			</div>
		</div>
	);
};

export default Bubble;
